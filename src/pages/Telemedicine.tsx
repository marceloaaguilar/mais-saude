import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Video, 
  Clock, 
  Shield, 
  Smartphone,
  Heart,
  Users
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsappBtn";
import ScrollToSectionButton from "@/components/ScrollToSectionButton";

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
    "Cardiologia",
    "Clínica Médica",
    "Dermatologista",
    "Endocrinologista e Metabologia",
    "Gastroenterologia",
    "Geriatria",
    "Ginecologia e Obstetrícia",
    "Medicina de Família e Comunidade",
    "Nutrologia",
    "Ortopedia e Traumatologia",
    "Otorrinolaringologia",
    "Pediatria",
    "Psiquiatria",
    "Urologia",
    "Psicologia (Consulta)",
    "Nutrição",
    "Nutrólogo Pediátrico"
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

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              Com a Telemedicina Mais Saúde
            </h2>
            <p className="text-lg text-center text-gray-700 mb-16">
              Acesso prático e imediato a consultas médicas online, sem burocracia e com total segurança.
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Atendimento rápido</h3>
                <p className="text-gray-600">
                  Consultas imediatas com médicos de diversas especialidades, sem filas ou espera.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Smartphone className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Consultas Online</h3>
                <p className="text-gray-600">
                  Realize consultas pelo celular ou computador, de onde você estiver.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Segurança</h3>
                <p className="text-gray-600">
                  Proteção total dos seus dados médicos com plataforma criptografada.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Especialidades disponíveis</h3>
                <p className="text-gray-600">
                  Plantão clínico geral, pediatria e especialistas de acordo com a agenda.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 transition">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Cuidado contínuo</h3>
                <p className="text-gray-600">
                  Suporte completo para garantir mais saúde no dia a dia da sua família.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-muted flex justify-center items-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12">
              Especialidades por Agendamento
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">

              <div className="w-full lg:w-1/3 flex justify-center">
                <img
                  src="/imgMedico.jpg" 
                  alt="Médico atendendo paciente"
                  className="rounded-2xl shadow-md object-cover w-full max-w-sm lg:h-full"
                />
              </div>

 
              <div className="w-full lg:w-2/3 text-center flex flex-col justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
                  {specialties.map((spec, index) => (
                    <div
                      key={index}
                      className="bg-white text-foreground rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 flex items-center justify-center text-center font-medium h-16 w-full text-sm"
                    >
                      <span className="px-2">{spec}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mt-10">
                  Saúde sempre ao alcance das suas mãos.
                </p>
              </div>
            </div>
          </div>
        </section>





      </main>

      <Footer />
    </div>
  );
};

export default Telemedicine;
