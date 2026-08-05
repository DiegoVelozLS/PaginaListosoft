import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-col brand-col">
                    <Link to="/" className="logo footer-logo footer-logo-link">
                        <img src="/assets/Logo-Listosoft.png" alt="Listosoft" className="logo-img footer-logo-img" />
                    </Link>
                    <p>Impulsando el crecimiento empresarial con tecnología ERP de vanguardia. Gestión inteligente para decisiones estratégicas. Hola Mundo</p>
                    <div className="social-links">
                        <a href="https://www.youtube.com/@Listosoft" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon"><i className="fab fa-youtube"></i></a>
                        <a href="https://www.instagram.com/listosoft" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="https://ec.linkedin.com/company/listosoft" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://www.tiktok.com/@listosoft" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon"><i className="fab fa-tiktok"></i></a>
                    </div>
                </div>

                <div className="footer-col links-col">
                    <h4>Navegación</h4>
                    <ul>
                        <li><Link to="/modulos" className="footer-modulos-link">Módulos</Link></li>
                        <li><a href="/#Clientes" className="footer-clientes-link">Clientes</a></li>
                        <li><Link to="/recursos" className="footer-recursos-link">Recursos</Link></li>
                        <li><Link to="/soporte" className="footer-soporte-link">Soporte</Link></li>
                    </ul>
                </div>

                <div className="footer-col links-col">
                    <h4>Empresa</h4>
                    <ul>
                        <li><Link to="/sobre-nosotros" className="footer-sobre-nosotros-link">Sobre Nosotros</Link></li>
                        <li><Link to="/politica-privacidad" className="footer-politica-link">Política de Privacidad</Link></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h4>Contacto</h4>
                    <div className="contact-info">
                        <p><i className="fa-solid fa-envelope"></i> soporte@listosoft.com</p>
                        <p><i className="fa-solid fa-phone"></i> +593 99 326 7418</p>
                        <p><i className="fa-solid fa-location-dot"></i> Guayaquil, Ecuador</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Listosoft S.A. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
