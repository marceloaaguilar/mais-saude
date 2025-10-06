import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Percent, ShoppingCart, Gift } from "lucide-react"
import WhatsAppButton from "@/components/WhatsappBtn";

import ScrollToSectionButton from "@/components/ScrollToSectionButton"

export default function DiscountsPage() {
  return (
    <main className="pt-16">

      <Header/>

      <WhatsAppButton/>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Clube de Descontos Mais Saúde
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Muito além do cuidado com a sua saúde, você tem acesso a um clube de vantagens completo para economizar no dia a dia.
            São mais de <strong>30.000 parceiros</strong> em todo o Brasil, garantindo benefícios exclusivos e preços imbatíveis.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 place-items-center mb-14">
            {[
              'hoteis', 'raia', 'cocobambu', 'toca', 'vivara', 
              'dominos', 'petz', 'kinoplex', 'uci', 
              'cinesystem', 'cinemark', 'zedelivery', 'netshoes', 
              'unidas', 'estacio'
            ].map((logo, index) => (
              <div 
                key={index} 
                className="w-[140px] h-[80px] flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
              >
                <img 
                  src={`/logos/${logo}.png`} 
                  alt={`${logo} logo`} 
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left text-muted-foreground mb-12">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Economia Real</h4>
              <p>Descontos em lazer, saúde, educação, viagens e compras online.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Ingressos com até 55% OFF</h4>
              <p>Vá ao cinema pagando muito menos nas maiores redes do Brasil.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Comodidade e Suporte</h4>
              <p>Agilidade e atendimento em cada uso dos benefícios.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-white hover:bg-primary/90 px-8 py-5 text-lg"
              onClick={() => window.open("https://seu-hotsite.com", "_blank")}
            >
              Acessar Benefício
            </Button>

            <ScrollToSectionButton sectionId="planos">
              <Button
                size="lg"
                variant="outline"
                className="text-primary border-primary hover:bg-primary/10 px-8 py-5 text-lg"
              >
                Contratar
              </Button>
            </ScrollToSectionButton>

          </div>
        </div>
      </section>


      <Footer/>

    </main>
  )
}
