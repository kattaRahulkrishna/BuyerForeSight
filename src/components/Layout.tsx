import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="quantum-header">
        <div className="header-content">
          <Link to="/" className="brand-logo">
            <Hexagon size={28} className="logo-icon" />
            <span className="brand-text">BUYERFORESIGHT <span className="brand-sub">USER HUB</span></span>
          </Link>
          <div className="header-right-decorative">
            <div className="tech-line"></div>
            <div className="tech-dot"></div>
          </div>
        </div>
        <div className="header-border-glow"></div>
      </header>
      
      <main className="layout-main">
        {children}
      </main>
      
      {/* Background decorative elements */}
      <div className="bg-decor hex-1"></div>
      <div className="bg-decor hex-2"></div>
      <div className="bg-decor hex-3"></div>
    </div>
  );
};

export default Layout;
