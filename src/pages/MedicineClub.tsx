import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { scrollToElement } from "@/lib/utils";

import { FaWhatsapp } from "react-icons/fa";



import { 
  Pill, 
  Percent, 
  Truck, 
  Shield, 
  Smartphone, 
  Heart,
  Star,
  CheckCircle,
  Package,
  CreditCard
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsappBtn";

const MedicineClub = () => {
  const benefits = [
    {
      icon: Percent,
      title: "Preços Acessíveis",
      description: "Os maiores descontos em medicamentos do mercado"
    },
    {
      icon: Truck,
      title: "Receba seu medicamento em casa",
      description: "Receba seus medicamentos em casa sem taxa de entrega"
    },
    {
      icon: Shield,
      title: "Medicamentos Originais",
      description: "Garantia de qualidade e procedência dos produtos"
    },
    {
      icon: Smartphone,
      title: "Compre Pelo Whatsapp",
      description: "Faça seus pedidos a qualquer hora do dia pelo Whatsapp"
    }
  ];

  const categories = [
    {
      name: "Medicamentos Genéricos",
      discount: "Até 80% OFF",
      description: "Versões genéricas com a mesma eficácia",
      icon: Pill,
      color: "bg-gradient-primary"
    },
    {
      name: "Medicamentos de Marca",
      discount: "Até 60% OFF",
      description: "Medicamentos de laboratórios renomados",
      icon: Star,
      color: "bg-gradient-secondary"
    },
    {
      name: "Vitaminas e Suplementos",
      discount: "Até 50% OFF",
      description: "Suplementação para sua saúde e bem-estar",
      icon: Heart,
      color: "bg-gradient-primary"
    },
    {
      name: "Medicamentos Controlados",
      discount: "Até 40% OFF",
      description: "Com receita médica e entrega segura",
      icon: Shield,
      color: "bg-gradient-secondary"
    }
  ];

  const featuredMedicines = [
    {
      name: "Dipirona 500mg",
      originalPrice: "R$ 15,90",
      clubPrice: "R$ 3,20",
      discount: "80% OFF",
      category: "Analgésico"
    },
    {
      name: "Omeprazol 20mg",
      originalPrice: "R$ 45,00",
      clubPrice: "R$ 9,00",
      discount: "80% OFF",
      category: "Gastroprotetor"
    },
    {
      name: "Losartana 50mg",
      originalPrice: "R$ 35,00",
      clubPrice: "R$ 7,00",
      discount: "80% OFF",
      category: "Anti-hipertensivo"
    },
    {
      name: "Sinvastatina 20mg",
      originalPrice: "R$ 28,00",
      clubPrice: "R$ 5,60",
      discount: "80% OFF",
      category: "Colesterol"
    },
    {
      name: "Metformina 850mg",
      originalPrice: "R$ 22,00",
      clubPrice: "R$ 4,40",
      discount: "80% OFF",
      category: "Diabetes"
    },
    {
      name: "Atenolol 25mg",
      originalPrice: "R$ 18,00",
      clubPrice: "R$ 3,60",
      discount: "80% OFF",
      category: "Cardíaco"
    }
  ];

  const howItWorks = [
    {
      icon: CreditCard,
      title: "Assine o Clube",
      description: "Escolha o plano mensal ou anual que melhor se adequa a você"
    },
    {
      icon: Package,
      title: "Escolha seus Medicamentos",
      description: "Navegue pelo catálogo e encontre os medicamentos que precisa"
    },
    {
      icon: Truck,
      title: "Receba em Casa",
      description: "Entrega rápida e gratuita direto na sua porta"
    },
    {
      icon: CheckCircle,
      title: "Economize Sempre",
      description: "Descontos automáticos em todos os seus pedidos"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        
        <WhatsAppButton/>

        <section className="relative py-32">
          <div className="absolute inset-0">
            <img 
              src="/imgMedicamentos.jpg"
              alt="Família feliz recebendo cuidados de saúde"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left text-white max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Clube de  <span className="block">Medicamentos</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
              O seu medicamento de forma ágil e prática em um só lugar.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              onClick={()=> scrollToElement("vantagensDoClube")}
            >
              Quero Conhecer
            </Button>
          </div>
        </section>

        <section className="py-20 bg-background" id="vantagensDoClube">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Vantagens do Clube
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 text-center shadow-soft hover:shadow-card transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Como Funciona
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center relative">
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border transform translate-x-4 -translate-y-1/2"></div>
                    )}
                    
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-secondary rounded-full flex items-center justify-center relative z-10">
                      <Icon className="text-secondary-foreground" size={24} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Planos do Clube
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 shadow-soft hover:shadow-card transition-all duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Plano Mensal
                </h3>
                <div className="text-4xl font-bold text-primary mb-6">
                  R$ 19,90<span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Descontos de até 80%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Entrega grátis ilimitada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Acesso a 10.000+ medicamentos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Suporte 24/7</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Assinar Mensal
                </Button>
              </Card>

              <Card className="p-8 shadow-card border-2 border-primary relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-secondary text-secondary-foreground">
                    Mais Popular
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Plano Anual
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  R$ 15,90<span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <div className="text-muted-foreground mb-6">
                  Pago anualmente R$ 190,80 (20% desconto)
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Descontos de até 80%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Entrega grátis ilimitada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Acesso a 10.000+ medicamentos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-primary" size={16} />
                    <span>Suporte prioritário 24/7</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-secondary" size={16} />
                    <span>Economize R$ 48,00 por ano</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-secondary hover:opacity-90">
                  Assinar Anual
                </Button>
              </Card>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default MedicineClub;