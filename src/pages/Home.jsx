import React, { useEffect, useState } from 'react';
import { FolderOpen, Coins, BarChart3, User, Phone, Mail, MessageCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Home() {
    const [isSending, setIsSending] = useState(false);
    
    useEffect(() => {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        
        // tsParticles Initialization
        let particlesContainer = null;
        if (window.tsParticles) {
            window.tsParticles.load("tsparticles", {
                fpsLimit: 60,
                fullScreen: { enable: false },
                particles: {
                    number: { value: 60, density: { enable: true, area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                    links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, outModes: { default: "bounce" }, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detectsOn: "canvas",
                    events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: true },
                    modes: { grab: { distance: 200, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
                },
                detectRetina: true,
                background: { color: "transparent" }
            }).then(container => {
                particlesContainer = container;
            });
        }
        
        return () => {
            observer.disconnect();
            if (particlesContainer) {
                particlesContainer.destroy();
            }
        };
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const company = form.company.value;
        const email = form.email.value;
        const message = form.message.value;

        if (!name || !company || !email) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingrese un correo electrónico válido.');
            return;
        }

        setIsSending(true);

        const templateParams = {
            from_name: name,
            from_company: company,
            from_email: email,
            message: message || 'Sin mensaje adicional',
            to_email: 'contacto@listosoft.com'
        };

        emailjs.send('service_vkr4srr', 'template_xp9l3d2', templateParams, 'YXQ_yNYCf5yAU3yaj')
            .then(() => {
                alert('¡Gracias por su interés!\n\nSu mensaje ha sido enviado exitosamente. Un asesor de Listosoft se comunicará con usted en breve.');
                form.reset();
            })
            .catch(() => {
                alert('Lo sentimos, hubo un error al enviar su mensaje.\n\nPor favor intente nuevamente o contáctenos directamente por WhatsApp o teléfono.');
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <main>
            <section className="hero" id="inicio">
                <div id="tsparticles"></div>
                <div className="container hero-container">
                    <div className="hero-content fade-in">
                        <h1>Solución ERP para empresas ecuatorianas</h1>
                        <p>Gestiona contabilidad, finanzas y administración en una sola plataforma que crece con tu negocio.</p>
                        <div className="hero-buttons">
                            <a href="#contacto" className="btn btn-accent">Solicitar información</a>
                            <a href="/modulos" className="btn btn-outline">Conocer módulos</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="modulos" className="section bg-light">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2>Módulos que se adaptan a tu empresa</h2>
                        <p>Un ecosistema modular diseñado para cubrir cada aspecto crítico de su organización.</p>
                    </div>

                    <div className="cards-grid">
                        <div className="card fade-in">
                            <div className="icon-box"><FolderOpen /></div>
                            <h3>Administrativos</h3>
                            <ul>
                                <li>Inventario</li>
                                <li>Ventas</li>
                                <li>Compras</li>
                                <li>Importaciones</li>
                                <li>Producción</li>
                                <li>Nómina</li>
                                <li>Activos Fijos</li>
                            </ul>
                        </div>
                        <div className="card fade-in">
                            <div className="icon-box"><Coins /></div>
                            <h3>Financieros</h3>
                            <ul>
                                <li>Caja y Bancos</li>
                                <li>Cuentas por Cobrar</li>
                                <li>Cuentas por Pagar</li>
                                <li>Flujo de Caja</li>
                                <li>Origen y Aplicación de Fondos</li>
                                <li>Presupuesto</li>
                            </ul>
                        </div>
                        <div className="card fade-in">
                            <div className="icon-box"><BarChart3 /></div>
                            <h3>Contabilidad y Tributación</h3>
                            <ul>
                                <li>Informes Financieros</li>
                                <li>Declaraciones 103, 104, ATS</li>
                                <li>Anexo de Gastos Personales</li>
                                <li>Informes para Dinardap y Super de Compañías</li>
                                <li>Comprobantes Electrónicos</li>
                                <li>Declaración 101 y Anexo para Devolución de IVA</li>
                            </ul>
                        </div>
                        <div className="card fade-in">
                            <div className="icon-box"><User /></div>
                            <h3>Gerencial</h3>
                            <ul>
                                <li>Consultas Dinámicas</li>
                                <li>Informes Financieros</li>
                                <li>Comparativos</li>
                                <li>Índices Financieros</li>
                                <li>Reportes Personalizables</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="beneficios" className="section">
                <div className="container">
                    <div className="benefits-layout">
                        <div className="benefits-text fade-in">
                            <h2>¿Por qué elegir Listosoft?</h2>
                            <p>Más que un software, somos su socio tecnológico estratégico.</p>
                            <ul className="benefits-list">
                                <li><strong>Estabilidad Garantizada:</strong> Arquitectura robusta diseñada para manejar altos volúmenes de transacciones sin interrupciones.</li>
                                <li><strong>Seguridad de Datos:</strong> Encriptación de nivel bancario y copias de seguridad automáticas para proteger su información.</li>
                                <li><strong>Soporte Especializado:</strong> Equipo de consultores expertos disponibles para resolver dudas técnicas y contables.</li>
                                <li><strong>Escalabilidad:</strong> El sistema crece al ritmo de su empresa, permitiendo agregar módulos según lo necesite.</li>
                            </ul>
                        </div>
                        <div className="benefits-visual fade-in">
                            <div className="abstract-shape">
                                <div className="shape-inner">
                                    <span className="stat-number">+23</span>
                                    <span className="stat-label">Años de experiencia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="Clientes" className="section bg-light text-dark">
                <div className="section-header fade-in">
                    <h2>Empresas que confían en Listosoft</h2>
                    <p>Únase a una red creciente de organizaciones que han transformado su gestión empresarial con nuestro ERP.</p>
                </div>
                <div className="carouselClientes">
                    <div className="carouselClientes-track">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num, i) => {
                            const ext = [3, 6, 11, 12, 13].includes(num) ? 'jpg' : 'png';
                            return <img key={i} src={`/LogosClientes/Logo${num}.${ext}`} alt="" />;
                        })}
                    </div>
                </div>
            </section>

            <section id="contacto" className="section">
                <div className="container contact-wrapper">
                    <div className="contact-info fade-in">
                        <h2>Hablemos de su empresa</h2>
                        <p>Nuestro equipo de especialistas está listo para entender sus necesidades y proporerle la solución de gestión que mejor se adapte a su estructura.</p>

                        <div className="info-item">
                            <a href="tel:+593994794348" className="contact-icon"><Phone /></a>
                            <div>
                                <h4>Celular</h4>
                                <p>+593 99-479-4348</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <a href="mailto:soporte@listosoft.com" className="contact-icon"><Mail /></a>
                            <div>
                                <h4>Email</h4>
                                <p>soporte@listosoft.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <a href="https://wa.me/593994794348" target="_blank" rel="noreferrer" className="contact-icon whatsapp-icon"><MessageCircle /></a>
                            <div>
                                <h4>WhatsApp</h4>
                                <a href="https://wa.me/593994794348" target="_blank" rel="noreferrer" className="whatsapp-link">Chat directo con soporte técnico</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container fade-in">
                        <form id="contactForm" className="form-box" onSubmit={handleContactSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre Completo</label>
                                <input type="text" id="name" required placeholder="Ej. Juan Pérez" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Empresa</label>
                                <input type="text" id="company" required placeholder="Nombre de su empresa" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo Corporativo</label>
                                <input type="email" id="email" required placeholder="nombre@empresa.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea id="message" rows="4" placeholder="¿En qué módulos está interesado?"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={isSending} style={isSending ? { backgroundColor: '#94a3b8' } : {}}>
                                {isSending ? <><Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} /> Enviando...</> : 'Enviar Solicitud'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
