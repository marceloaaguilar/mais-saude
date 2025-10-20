import { Shield, Heart, Users, Clock } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Segurança e Confiança",
      description: "Equipe qualificada e tecnologia de ponta para garantir o melhor atendimento."
    },
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Cada família recebe atenção individualizada para suas necessidades específicas."
    },
    {
      icon: Users,
      title: "Para Toda Família",
      description: "Planos que atendem desde crianças até idosos com cobertura completa."
    },
    {
      icon: Clock,
      title: "Disponível 24/7",
      description: "Telemedicina e suporte disponível a qualquer hora do dia ou da noite."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sobre a Mais Saúde
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Há mais de 10 anos cuidando da saúde das famílias brasileiras com 
            excelência, dedicação e os melhores preços do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl shadow-soft hover:shadow-card transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
          <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Nossa Missão
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Democratizar o acesso a cuidados de saúde de qualidade, oferecendo 
                soluções inovadoras e acessíveis que promovam o bem-estar de toda 
                a família brasileira.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Atendimento humanizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">Preços justos e transparentes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Tecnologia de ponta</span>
                </div>
              </div>
            </div>
            <div>
              <img className="w-full h-72 object-cover object-[25%_15%] rounded" src="/imgDoctor.jpg"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;