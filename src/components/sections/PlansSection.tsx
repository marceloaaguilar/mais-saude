import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PlansSection = () => {
  const plans = [
    {
      name: "Básico",
      price: "R$ 89",
      period: "/mês",
      description: "Ideal para solteiros e casais jovens",
      features: [
        "Consultas médicas ilimitadas",
        "Telemedicina 24/7",
        "Exames básicos inclusos",
        "Suporte por WhatsApp",
        "Desconto em medicamentos"
      ],
      popular: false
    },
    {
      name: "Família",
      price: "R$ 179",
      period: "/mês",
      description: "Perfeito para famílias de até 4 pessoas",
      features: [
        "Tudo do plano Básico",
        "Cobertura para 4 pessoas",
        "Pediatria especializada",
        "Exames avançados inclusos",
        "Consultas domiciliares",
        "Programa de vacinação"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 299",
      period: "/mês",
      description: "Cobertura completa para toda família",
      features: [
        "Tudo do plano Família",
        "Cobertura ilimitada",
        "Especialistas premium",
        "Cirurgias incluídas",
        "Check-up anual gratuito",
        "Concierge médico 24/7"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background" id="secaoPlanos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos Planos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para você e sua família. Todos com atendimento 
            de qualidade e preços justos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 ${
                plan.popular ? 'border-2 border-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-primary hover:opacity-90' 
                    : 'bg-gradient-secondary hover:opacity-90'
                }`}
                size="lg"
              >
                Escolher Plano
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 7 dias de teste gratuito
          </p>
          <Button variant="outline" size="lg">
            Comparar Todos os Planos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;