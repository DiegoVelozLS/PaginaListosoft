# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

The product itself (**LSoft**, an ERP) is a Windows desktop application; this project is its public marketing and support website, so design work here targets the web.

## Users

- **Dueño / gerente de PyME ecuatoriana** — decides the purchase. Wants control of the business and tax compliance without complications.
- **Contador / jefe financiero** — evaluates the accounting and tax side (SRI, anexos, declaraciones) and recommends or vetoes.
- **Clientes de FSoft en migración** — users of the company's previous ERP (FSoft, 2001–2026, now retired) who need to move to LSoft and want continuity and reassurance.

## Product Purpose

LSoft lets Ecuadorian small and medium businesses run accounting, finance, payroll, inventory, sales, purchasing, treasury, production, tax obligations and SRI electronic invoicing in one system. The website's job is to earn a demo request or contact (form, WhatsApp, phone) from those decision-makers, and to support existing customers (soporte, recursos, versiones).

## Positioning

- **Trayectoria y soporte:** Listosoft has built accounting software for Ecuadorian companies for 25 years (since FSoft in 2001), backed by human support from developers and accounting/tax specialists. Urgent cases get a response in under 4 business hours.
- **Modular y escalable:** companies start with the LSoft modules they need and add more as they grow, without changing systems.

## Operating Context

- Buyers compare ERPs against Ecuadorian tax reality: SRI electronic documents (comprobantes electrónicos), declarations and annexes.
- Purchase path: contact (24–48 h) → implementation (1–3 weeks, database on the client's server or Listosoft's, team training) → data migration (validated, by volume) → ongoing support.
- Contact channels: web form (EmailJS), WhatsApp, phone +593 99 326 7418, soporte@listosoft.com.
- Based in Guayaquil, Ecuador; serves Ecuador.

## Capabilities and Constraints

- Modules: Inventario, Ventas, Compras, Nómina, Caja y bancos, Contabilidad, Tributario, Producción, Comprobantes electrónicos.
- Site stack is static HTML/CSS/JS on Apache (`.htaccess`), shared navbar/footer injected by `components.js`, icons via Lucide, Microsoft Clarity analytics. No build step.
- Pages: Inicio (`index.html`), Módulos, Recursos, Soporte, Sobre nosotros, Política de privacidad, FSoft farewell (`fsoft.html`), Versiones (release notes), 404.
- Language: Spanish (Ecuador).

## Brand Commitments

- **Naming:** **LSoft** is the product (the ERP). **Listosoft** (Listosoft S.A.) is the company that owns and builds it. Never call the product "Listosoft ERP"; say "LSoft" or "LSoft ERP", and use "Listosoft" only for the company (team, support, contact, history). **LSoft Next** is the announced successor for 2027.
- Logos in `assets/` (`Logo-Listosoft.png`, `Logo-ListosoftBlanco.png`, `IsotipoListosoft.ico`) are the company's.
- **Color palette is binding:** the owner considers the current palette right for the product and wants it kept with minimal change — deep navy ink `#111c3a`, mid blue `#3b5b99`, gold accent `#c69a2d` (hover `#a77d1b`), light background `#f6f8fb`, border `#dfe5ee` (the final `:root` in `styles.css`). Adjust only for contrast fixes, staying within these hues.
- Voice: **tú** — cercano y directo. Marketing and support copy uses tú. Exception: the legal text of `Politica-privacidad.html` stays formal.
- Values stated on Sobre nosotros: compromiso, confianza, responsabilidad, innovación, servicio al cliente.

## Evidence on Hand

- **Experience:** 25 years (FSoft launched 2001). Copy saying "24 años" / "+24" is outdated.
- **Support response (business hours, Mon–Fri 9:00–17:30):** urgente < 4 h, normal < 24 h, baja prioridad < 48 h (`soporte.html`). Only claim "menos de 4 horas" for urgent cases.
- **Customers:** "cientos de empresas" usan LSoft; there is **no verified exact number**. The "500+" counter is not real and must not be used or replaced with another invented figure.
- **FSoft history** (`fsoft.html`, already published): created by Julio Veloz; 1.5.0 (15 mar 2001) to 5.4.00 (7 nov 2026); more than 1,400 versions; more than a thousand companies in 40 cities; LSoft has run alongside it for 10+ years; 160 companies with FSoft licenses also use LSoft. These figures describe FSoft, not LSoft.
- Client logos: `LogosClientes/` (real customers, ~19 files).
- Not on hand: testimonials, case studies, named customer quotes, pricing, certifications, uptime figures. Do not fabricate them. Claims like "encriptación de nivel bancario" need confirmation before being amplified.

## Product Principles

1. **Truth over polish.** Every number and claim on the site must be verifiable; when in doubt, say less.
2. **Local expertise is the product.** Lead with what 25 years in Ecuadorian accounting and SRI compliance means in practice, not generic ERP benefits.
3. **People behind the software.** Fast, human, specialist support is a core reason to buy; make reaching a person easy everywhere.
4. **Start small, grow without switching.** Present modules as a path the business grows into, not a bundle to swallow at once.
5. **Continuity for FSoft customers.** Migration to LSoft should feel like the next chapter of a relationship, not a sales pitch.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Audience includes older business owners and accountants on varied office hardware: legible type sizes, sufficient contrast, and clear contact paths on mobile.
