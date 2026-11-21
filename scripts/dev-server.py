"""
Servidor local de desarrollo compatible con las URLs limpias del .htaccess de Apache.
Uso: python scripts/dev-server.py [puerto]   (por defecto: 8000)
"""
import http.server
import os
import sys
import urllib.parse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlsplit(self.path)
        req_path = urllib.parse.unquote(parsed.path)

        # Igual que .htaccess: /versiones o /versiones/ -> última versión
        if req_path in ("/versiones", "/versiones/"):
            self.send_response(301)
            self.send_header("Location", "/versiones/2.1.61")
            self.end_headers()
            return

        # Si la ruta sin extensión corresponde a un archivo .html, servirlo como Apache
        rel = req_path.lstrip("/")
        if rel and not rel.endswith("/"):
            candidate = os.path.join(ROOT, rel)
            if not os.path.exists(candidate) and os.path.isfile(candidate + ".html"):
                self.path = parsed.path + ".html" + (f"?{parsed.query}" if parsed.query else "")
                return super().do_GET()

        # Si no existe, servir 404.html con código 404 (igual que ErrorDocument 404)
        fs_path = self.translate_path(self.path)
        if not os.path.exists(fs_path):
            err_page = os.path.join(ROOT, "404.html")
            if os.path.isfile(err_page):
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                with open(err_page, "rb") as f:
                    data = f.read()
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
                return

        return super().do_GET()


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), CleanURLHandler) as httpd:
        print(f"Servidor local listo en http://127.0.0.1:{PORT}/ (con URLs limpias como Apache)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
