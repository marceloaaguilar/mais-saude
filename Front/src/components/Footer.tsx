import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo_branca.png" className="w-64" alt="Logo Mais Saúde" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/desconto" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Descontos
                </Link>
              </li>
              <li>
                <Link to="/telemedicina" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Telemedicina
                </Link>
              </li>
              <li>
                <Link to="/clube-medicamentos" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Clube de Medicamentos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Phone size={16} />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Mail size={16} />
                <span className="text-sm">contato@maissaude.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <MapPin size={16} />
                <span className="text-sm">Localização, Estado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Mais Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;