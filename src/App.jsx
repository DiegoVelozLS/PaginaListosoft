import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function PlaceholderPage({ title }) {
  return (
    <div style={{ paddingTop: '150px', minHeight: '60vh', textAlign: 'center', paddingBottom: '50px' }}>
      <h1>{title}</h1>
      <p style={{ marginTop: '20px' }}>Página en construcción (Migración en proceso...)</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modulos" element={<PlaceholderPage title="Módulos" />} />
        <Route path="/recursos" element={<PlaceholderPage title="Recursos" />} />
        <Route path="/soporte" element={<PlaceholderPage title="Soporte" />} />
        <Route path="/sobre-nosotros" element={<PlaceholderPage title="Sobre Nosotros" />} />
        <Route path="/politica-privacidad" element={<PlaceholderPage title="Política de Privacidad" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
