import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img src="/logo_branca.png" className="w-48 md:w-64" alt="Logo Mais Saúde" />
          </div>

          {/* Navegação */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/desconto"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Descontos
                </Link>
              </li>
              <li>
                <Link
                  to="/telemedicina"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Telemedicina
                </Link>
              </li>
              <li>
                <Link
                  to="/clube-medicamentos"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Clube de Medicamentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3 w-full max-w-sm">
              <a
                href="tel:+5521920070815"
                className="flex items-center justify-center md:justify-start space-x-2 text-primary-foreground/80 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
              >
                <Phone size={16} />
                <span className="text-sm">(21) 92007-0815</span>
              </a>

              <a
                href="mailto:contato@maissaude.com.br"
                className="flex items-center justify-center md:justify-start space-x-2 text-primary-foreground/80 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
              >
                <Mail size={16} />
                <span className="text-sm">contato@maissaude.com.br</span>
              </a>

              <a
                href="https://www.google.com/maps?q=Rua+Cerqueira+Daltro,+321,+Cascadura,+Rio+de+Janeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start space-x-2 text-primary-foreground/80 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
              >
                <MapPin size={16} />
                <span className="text-sm text-center md:text-left">
                  Rua Cerqueira Daltro, 321 – Cascadura, Rio de Janeiro - RJ
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Mais Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;