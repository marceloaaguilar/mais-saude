import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/desconto", label: "Descontos" },
    { href: "/#planos", label: "Planos" },
    { href: "/telemedicina", label: "Telemedicina" },
    { href: "/clube-medicamentos", label: "Clube de Medicamentos" },
    { href: "/consultas-presenciais", label: "Consultas Presenciais" },
    { href: "/funeral", label: "Funeral" }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-24 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img src="/logo_navbar.png" alt="Logo" className="w-full h-auto"/>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative font-medium text-sm transition-colors duration-300 hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary transition-all duration-300 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
                ></span>
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-full hover:bg-muted-foreground/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
            <nav className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium py-2 px-3 rounded transition-colors duration-300 hover:bg-primary/10 hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;