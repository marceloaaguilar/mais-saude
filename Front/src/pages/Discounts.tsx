import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Percent, ShoppingCart, Gift } from "lucide-react"
import WhatsAppButton from "@/components/WhatsappBtn";

const discounts = [
  {
    icon: Tag,
    title: "Ofertas Exclusivas",
    description: "Descontos que você só encontra aqui, em diversos produtos."
  },
  {
    icon: Percent,
    title: "Até 70% OFF",
    description: "Aproveite promoções imperdíveis e economize de verdade."
  },
  {
    icon: ShoppingCart,
    title: "Produtos Selecionados",
    description: "Itens de qualidade escolhidos especialmente para você."
  },
  {
    icon: Gift,
    title: "Brindes Especiais",
    description: "Ganhe recompensas e vantagens ao aproveitar nossas promoções."
  }
]

export default function DiscountsPage() {
  return (
    <main className="pt-16">

      <Header/>

      <WhatsAppButton/>

      <section className="relative py-32">
        <div className="absolute inset-0">
          <img 
            src="/imgDescontos.jpg"
            alt="Promoções e descontos em produtos"
            className="w-full h-full object-cover object-[55%_5%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-start text-left text-white max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Super <span className="block">Descontos</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
            Aproveite promoções exclusivas em uma seleção especial de produtos.
            Descontos de até 70% para você economizar mais.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
          >
           Ver Descontos
          </Button>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Vantagens dos Nossos Descontos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {discounts.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-6 text-center shadow-soft hover:shadow-card transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Icon className="text-secondary-foreground" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer/>

    </main>
  )
}
