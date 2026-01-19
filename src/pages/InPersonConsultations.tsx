import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsappBtn";
import Footer from "@/components/Footer";

import { 
  Stethoscope, 
  Wallet, 
  ShieldCheck, 
  HeartPulse, 
  UserCheck, 
  Activity, 
  Baby, 
  Eye, 
  Bone,
  Apple
} from "lucide-react";

export default function InPersonConsultations() {
  return (
    <>
      <Header />
      <WhatsAppButton />

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/imgConsultaPresencial.jpg" 
            alt="Atendimento médico presencial"
            className="w-full h-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left text-white max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Consultas <span className="block">Presenciais</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed space-y-4">
            Os beneficiários têm acesso a consultas presenciais nas 8 especialidades médicas mais relevantes para o cuidado contínuo da saúde: Cardiologia, Oftalmologia, Clínico Geral, Ortopedia, Dermatologia, Pediatria, Gastroenterologia e Ginecologia.
            <br /><br />
            Esse benefício foi desenvolvido para oferecer atendimento médico de qualidade, com fácil agendamento e condições acessíveis, garantindo que cada usuário receba o suporte necessário de forma rápida e segura.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-white/90 hover:text-primary shadow-soft text-lg px-8 py-6"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=554497113488&text=Ol%C3%A1%20gostaria%20de%20agendar%20uma%20consulta%20presencial",
                  "_blank"
                )
              }
            >
              Contratar Plano
            </Button>
          </div>
        </div>
      </section>

      <section id="detalhesConsultas" className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Modelos de Atendimento
          </h2>

          <div className="max-w-3xl mx-auto text-center text-muted-foreground text-lg leading-relaxed mb-16">
            O serviço está disponível em dois formatos, conforme o plano contratado. Independentemente do formato escolhido, o beneficiário conta com uma rede de profissionais qualificados, atendimento humanizado e condições que tornam o cuidado médico mais acessível, previsível e contínuo.
            <br /><br />
            O objetivo é proporcionar saúde com praticidade, transparência e economia para todos os usuários.
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              {
                title: "Sem Coparticipação",
                icon: ShieldCheck,
                description: "No modelo sem coparticipação, o beneficiário realiza a consulta sem qualquer custo adicional, sendo atendido gratuitamente nas especialidades incluídas.",
              },
              {
                title: "Com Coparticipação",
                icon: Wallet,
                description: "No modelo com coparticipação, o usuário paga apenas um valor reduzido por consulta, mantendo a mesma qualidade de atendimento e acesso às mesmas especialidades, porém com um custo simbólico no ato do agendamento.",
              },
            ].map((model, index) => {
              const Icon = model.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center shadow-soft hover:shadow-card transition-all duration-300 bg-card rounded-2xl border-t-4 border-primary"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="text-primary-foreground" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {model.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col lg:flex-row items-center gap-12 bg-card/30 rounded-2xl p-6 lg:p-10 shadow-inner">
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/imgConsultaPresencial2.jpg"
                alt="Médico conversando com paciente"
                className="rounded-2xl shadow-md object-cover w-full max-w-md lg:h-full min-h-[400px]"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h3 className="text-3xl font-bold mb-4 text-center lg:text-left">
                Especialidades Atendidas
              </h3>
              <p className="text-muted-foreground mb-8 text-center lg:text-left">
                Contamos com as 8 especialidades mais relevantes para o cuidado da sua família.
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Clínico Geral", icon: Stethoscope },
                  { name: "Cardiologia", icon: HeartPulse },
                  { name: "Pediatria", icon: Baby },
                  { name: "Ginecologia", icon: UserCheck },
                  { name: "Ortopedia", icon: Bone },
                  { name: "Dermatologia", icon: Activity },
                  { name: "Oftalmologia", icon: Eye },
                  { name: "Gastroenterologia", icon: Apple },
                ].map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-muted rounded-xl p-4 shadow-sm hover:shadow-md transition text-foreground"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <Icon size={20} />
                      </div>
                      <span className="font-semibold">{spec.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center mb-10">
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-white/90 hover:text-primary shadow-soft text-lg px-8 py-6"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=554497113488&text=Ol%C3%A1%20gostaria%20de%20agendar%20uma%20consulta%20presencial",
              "_blank"
            )
          }
        >
          Contratar Plano
        </Button>
      </div>
      
      <Footer/>
    </>
  );
}