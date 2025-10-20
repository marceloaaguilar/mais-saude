import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Clock, 
  Shield, 
  Smartphone, 
  Calendar, 
  MessageCircle,
  Stethoscope,
  FileText,
  Users
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsappBtn";

const Telemedicine = () => {
  const features = [
    {
      icon: Video,
      title: "Consulta por Vídeo",
      description: "Atendimento médico em tempo real através de videochamada segura"
    },
    {
      icon: Clock,
      title: "Disponível 24/7",
      description: "Médicos disponíveis a qualquer hora do dia ou da noite"
    },
    {
      icon: Shield,
      title: "Totalmente Seguro",
      description: "Plataforma criptografada que protege seus dados médicos"
    },
    {
      icon: Smartphone,
      title: "Fácil de Usar",
      description: "Acesse pelo celular, tablet ou computador de forma simples"
    }
  ];

  const specialties = [
    "Clínica Geral",
    "Pediatria",
    "Ginecologia",
    "Cardiologia",
    "Dermatologia",
    "Psicologia",
    "Nutrição",
    "Endocrinologia",
    "Infectologia",
    "Geriatria"
  ];

  const steps = [
    {
      icon: Calendar,
      title: "Escolha seu Plano",
      description: "Selecione o plano que inclui telemedicina"
    },
    {
      icon: MessageCircle,
      title: "Receba o Link",
      description: "Você receberá um link seguro por SMS ou email"
    },
    {
      icon: Video,
      title: "Faça sua Consulta",
      description: "Converse com o médico por vídeo no horário agendado"
    },
    {
      icon: FileText,
      title: "Receba a Receita",
      description: "Prescrições digitais válidas em todo território nacional"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <WhatsAppButton/>
      
      <main className="pt-16">
        <section className="relative py-32">
          <div className="absolute inset-0">
            <img 
              src="/imgTelemedicina.jpg"
              alt="Família feliz recebendo cuidados de saúde"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left text-white max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Telemedicina <span className="block">24 Horas</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
              Consulte médicos especialistas de qualquer lugar, a qualquer hora. Atendimento rápido, seguro e eficiente para toda sua família.
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
            >
              Ver Planos
            </Button>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12">
              Vantagens da Telemedicina
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 text-center shadow-soft hover:shadow-card transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Icon className="text-secondary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
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

export default Telemedicine;