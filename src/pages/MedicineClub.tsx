import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { scrollToElement } from "@/lib/utils";
import WhatsAppButton from "@/components/WhatsappBtn";
import ScrollToSectionButton from "@/components/ScrollToSectionButton";

import { 
  Percent, 
  Truck, 
  Shield, 
  Smartphone, 
  CheckCircle,
  Package,
  CreditCard,
  MessageCircle,
  FileText,
  CalendarCheck,
  Handshake
} from "lucide-react";

const MedicineClub = () => {
  const benefits = [
    {
      icon: Percent,
      title: "Preços Acessíveis",
      description: "Os maiores descontos em medicamentos do mercado."
    },
    {
      icon: Truck,
      title: "Receba seu medicamento em casa",
      description: "Receba seus medicamentos sem taxa de entrega."
    },
    {
      icon: Shield,
      title: "Medicamentos Originais",
      description: "Garantia de qualidade e procedência dos produtos."
    },
    {
      icon: Smartphone,
      title: "Compre Pelo WhatsApp",
      description: "Faça seus pedidos a qualquer hora do dia."
    }
  ];

  const howItWorks = [
    {
      icon: CreditCard,
      title: "Assine o Clube",
      description: "Escolha o plano mensal ou anual que melhor se adequa a você."
    },
    {
      icon: Package,
      title: "Escolha seus Medicamentos",
      description: "Navegue pelo catálogo e encontre o que precisa."
    },
    {
      icon: Truck,
      title: "Receba em Casa",
      description: "Entrega rápida e gratuita direto na sua porta."
    },
    {
      icon: CheckCircle,
      title: "Economize Sempre",
      description: "Descontos automáticos em todos os seus pedidos."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <WhatsAppButton />

        <section className="relative py-32 overflow-hidden">
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
              Clube de <span className="block">Medicamentos</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
              O seu medicamento de forma ágil e prática em um só lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-primary text-white hover:bg-white/90 hover:text-primary shadow-soft text-lg px-8 py-6"
                onClick={() => window.open('https://seuhotsite.com', '_blank')}
              >
                Acessar Benefício
              </Button>
              
              <ScrollToSectionButton sectionId="planos">
                <Button 
                  size="lg"
                  className="text-primary bg-white hover:bg-primary hover:text-white text-lg px-8 py-6 transition-all duration-300"
                >
                  Contratar
                </Button>
              </ScrollToSectionButton>
            </div>

          </div>
        </section>

        <section id="conhecaNossoClube" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 text-center max-w-4xl animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6">Conheça Nosso Clube</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Medicamentos com os preços mais acessíveis do Brasil!
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa missão é melhorar a saúde e o bem-estar de todos, proporcionando 
              economia nos cuidados médicos e simplificando o dia a dia. 
              O Clube é a solução que facilita o acesso a tratamentos de qualidade, 
              promovendo uma comunidade mais saudável e feliz.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-8 py-6"
                onClick={() => scrollToElement("vantagensDoClube")}
              >
                Ver Vantagens
              </Button>
            </div>
          </div>
        </section>

        <section className="py-5 bg-white from-primary via-primary/90 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Como Funciona?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">

              <div className="bg-primary text-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-6">
                  <MessageCircle size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Como fazer pedido?</h3>
                <p className="text-sm leading-relaxed">
                  Faça o seu pedido pelo nosso número de WhatsApp.
                </p>
              </div>

              <div className="bg-white text-primary border border-primary rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-6">
                  <FileText size={64} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Solicitar orçamento</h3>
                <p className="text-sm leading-relaxed">
                  Solicite orçamento pelo nosso WhatsApp.
                </p>
              </div>

              <div className="bg-secondary text-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-6">
                  <CreditCard size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Faça seu pagamento</h3>
                <p className="text-sm leading-relaxed">
                  Após escolher os medicamentos, será enviado um link para pagamento.
                </p>
              </div>

              <div className="bg-white text-primary border border-primary rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-6">
                  <CalendarCheck size={64} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Entrega Agendada</h3>
                <p className="text-sm leading-relaxed">
                  Nossa equipe irá informar a data de entrega.
                </p>
              </div>

              <div className="bg-primary text-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-6">
                  <Handshake size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Entrega realizada</h3>
                <p className="text-sm leading-relaxed">
                  Pronto, você receberá no conforto da sua casa os medicamentos solicitados.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background" id="vantagensDoClube">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Vantagens do Clube
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 bg-card"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default MedicineClub;
