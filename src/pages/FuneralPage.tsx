import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WhatsAppButton from "@/components/WhatsappBtn";
import { CalendarCheck, CreditCard, FileText, Heart } from "lucide-react";


export default function FuneralPage() {
  return (
    <>
      <Header/>
      <WhatsAppButton/>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/imgFuneral.jpg"
            alt="Família recebendo cuidados"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left text-white max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Assistência <span className="block">Funeral</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
            Nos momentos mais difíceis da vida, foque no que realmente importa: conforto e apoio aos seus entes queridos. Planejar antecipadamente é um gesto de cuidado.
          </p>
          <div className="flex flex-wrap gap-4">

            <Button
              size="lg"
              className="bg-primary text-white hover:bg-white/90 hover:text-primary shadow-soft text-lg px-8 py-6"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=554497113488&text=Ol%C3%A1%20gostaria%20de%20contratar%20um%20plano%20funer%C3%A1rio",
                  "_blank"
                )
              }
            >
              Contratar
            </Button>
          </div>
        </div>
      </section>
      
      <section
        id="vantagensDoFuneral"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Benefícios dos Planos Funerários
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Proteção Financeira", icon: CreditCard, description: "Evite despesas inesperadas para sua família." },
              { title: "Tranquilidade", icon: Heart, description: "Foco no conforto e apoio emocional." },
              { title: "Serviços Completos", icon: FileText, description: "Desde remoção até cremação, tudo incluso." },
              { title: "Planejamento Personalizado", icon: CalendarCheck, description: "Escolha o plano que se adapta à sua necessidade." },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 bg-card rounded-2xl"
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

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-6">
              Serviços Inclusos
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Remoção do corpo",
                "Traslados",
                "Tanatopraxia",
                "Reparação Facial (Necromaquiagem)",
                "Reconstituição Facial",
                "Urnas",
                "Ornamentação de Urnas",
                "Lembranças de luto",
                "Coroa de flores",
                "Pagamento de taxas do cemitério",
                "Velório (opcional)",
                "Roupas para o velório (opcional)",
                "Cremação (opcional)",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg text-center 
                    "bg-white shadow hover:bg-white/20 transition"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
  </>

  );
}
