import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('.hero, .hero--legal');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                if (window.scrollY < heroBottom - 100) {
                    setIsScrolled(false);
                } else {
                    setIsScrolled(true);
                }
            } else {
                setIsScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // run on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0); // Opcional: para que al cambiar de página vuelva arriba
    }, [location.pathname]);

    return (
        <header id="navbar" className={isScrolled ? 'scrolled' : 'over-hero'}>
            <div className="container nav-container">
                <Link to="/" className="logo nav-logo-link">
                    <img src="/assets/Logo-Listosoft.png" alt="Listosoft" className="logo-img logo-dark nav-logo-dark" />
                    <img src="/assets/Logo-ListosoftBlanco.png" alt="Listosoft" className="logo-img logo-white nav-logo-white" />
                </Link>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
                    <ul>
                        <li><Link to="/modulos" className="nav-link nav-modulos-link">Módulos</Link></li>
                        <li><a href="/#Clientes" className="nav-link nav-clientes-link" onClick={() => setIsMenuOpen(false)}>Clientes</a></li>
                        <li><Link to="/recursos" className="nav-link nav-recursos-link">Recursos</Link></li>
                        <li><Link to="/soporte" className="nav-link nav-soporte-link">Soporte</Link></li>
                        <li><a href="https://listosoft.com/landing-page-asistencias/" target="_blank" rel="noopener noreferrer" className="nav-link nav-asistencias-link">Control de Asistencias</a></li>
                        <li><a href="/#contacto" className="btn btn-accent nav-cta nav-contacto-link" onClick={() => setIsMenuOpen(false)}>Solicitar información</a></li>
                    </ul>
                </nav>

                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    );
}
