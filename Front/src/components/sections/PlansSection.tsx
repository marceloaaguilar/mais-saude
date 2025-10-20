import { Button } from "@/components/ui/button";
import { Check, Star, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, type HealthPlan } from "@/services/api";

const PlansSection = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<HealthPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPlans();
        setPlans(response.data.plans);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar planos. Tente novamente.");
        console.error("Erro ao carregar planos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleChoosePlan = (planId: string) => {
    navigate(`/checkout/${planId}`);
  };

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPlans();
      setPlans(response.data.plans);
    } catch (err) {
      setError("Erro ao carregar planos. Tente novamente.");
      console.error("Erro ao carregar planos:", err);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Estado de Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando planos...</p>
            </div>
          </div>
        )}

        {/* Estado de Erro */}
        {error && !loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center space-y-4 text-center max-w-md">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-foreground font-medium mb-2">
                  Erro ao carregar planos
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {error}
                </p>
                <Button 
                  onClick={refetch}
                  variant="outline"
                  size="sm"
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Planos */}
        {!loading && !error && plans.length > 0 && (
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
                onClick={() => handleChoosePlan(plan.id)}
              >
                Escolher Plano
              </Button>
            </div>
))}
          </div>
        )}

        {/* Estado quando não há planos */}
        {!loading && !error && plans.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <p className="text-muted-foreground">
                Nenhum plano disponível no momento.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlansSection;