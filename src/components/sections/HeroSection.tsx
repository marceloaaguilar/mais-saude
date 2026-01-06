import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import familyBanner from "@/assets/family-banner.jpg";
import { scrollToElement } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={familyBanner} 
          alt="Família feliz recebendo cuidados de saúde"
          className="w-full h-full object-cover blur-sm brightness-110 contrast-110 saturate-120 scale-105 transition-transform duration-[3000ms] ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8 px-4 md:px-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in">
            Mais Saúde para
            <span className="block text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">
              Sua Família
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Oferecemos cuidados médicos de qualidade com descontos exclusivos 
            e atendimento telemédico 24/7 para toda sua família.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delay">
            <Button 
              size="lg"
              onClick={() => scrollToElement('planos')}
              className="bg-primary text-white hover:bg-white/90 hover:text-primary shadow-soft text-lg px-8 py-6"
            >
              Veja Nossos Planos
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToElement('secaoFaleConosco')}
              size="lg"
              className="text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 transition-all duration-300"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>


  );
};

export default HeroSection;