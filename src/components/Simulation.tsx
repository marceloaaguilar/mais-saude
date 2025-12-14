import React, { useState, useEffect } from "react";

// Tipos de planos individuais
interface PlanoIndividual {
  nome: "Bronze" | "Prata" | "Ouro";
  beneficios: string;
  valor: number;
}

// Tipos de planos família
interface PlanoFamiliaBase {
  tipo: "Bronze" | "Prata" | "Ouro";
  comCota: boolean;
}

interface ValorFamilia {
  dependentes: number;
  bronze: number;
  prata: number;
  ouro: number;
}

interface PlanoFamilia {
  planosBase: PlanoFamiliaBase[];
  valores: ValorFamilia[];
  beneficiosGerais: string;
}

// Estrutura geral de todos os planos
interface Planos {
  individual: PlanoIndividual[];
  familia: PlanoFamilia;
}

type TipoPlano = "individual" | "familia";
type NomePlano = "Bronze" | "Prata" | "Ouro";

export default function Simulation(): JSX.Element {
  const [tipoPlano, setTipoPlano] = useState<TipoPlano>("individual");
  const [planoSelecionado, setPlanoSelecionado] = useState<NomePlano | null>(
    null
  );
  const [valorSimulacao, setValorSimulacao] = useState<number>(0);
  const [qntDependentes, setQntDependentes] = useState<number>(4);

  // *** DADOS DOS PLANOS (Mantidos iguais ao anterior) ***
  const planos: Planos = {
    individual: [
      {
        nome: "Bronze",
        beneficios: "Assistência Funeral + Telemedicina",
        valor: 29.9,
      },
      {
        nome: "Prata",
        beneficios:
          "Assistência Funeral + Telemedicina + Clube de Desconto + Consulta com Cota",
        valor: 49.9,
      },
      {
        nome: "Ouro",
        beneficios:
          "Assistência Funeral + Telemedicina + Farmácia + Clube de Desconto + Consulta Sem Cota",
        valor: 89.9,
      },
    ],
    familia: {
      planosBase: [
        { tipo: "Bronze", comCota: false },
        { tipo: "Prata", comCota: true },
        { tipo: "Ouro", comCota: false },
      ],
      valores: [
        { dependentes: 4, bronze: 59.9, prata: 109.9, ouro: 149.9 },
        { dependentes: 8, bronze: 119.9, prata: 159.9, ouro: 199.9 },
        { dependentes: 12, bronze: 169.9, prata: 199.9, ouro: 239.9 },
        { dependentes: 16, bronze: 209.9, prata: 249.9, ouro: 279.9 },
        { dependentes: 20, bronze: 249.9, prata: 289.9, ouro: 319.9 },
      ],
      beneficiosGerais:
        "Somente o titular terá todos os benefícios. Os dependentes terão direito apenas à Assistência Funeral.",
    },
  };

  useEffect(() => {
    if (tipoPlano === "familia" && planoSelecionado) {
      processaValorSimulacao(tipoPlano, planoSelecionado, qntDependentes);
    }
  }, [tipoPlano, planoSelecionado, qntDependentes]);

  const processaValorSimulacao = (
    tipo: TipoPlano,
    nome: NomePlano,
    dependentes?: number
  ): void => {
    setTipoPlano(tipo);
    setPlanoSelecionado(nome);

    if (tipo === "individual") {
      const plano = planos.individual.find((p) => p.nome === nome);
      setValorSimulacao(plano?.valor ?? 0);
    } else {
      const dependentesAtuais = dependentes ?? qntDependentes;
      const faixa = planos.familia.valores.find(
        (v) => v.dependentes === dependentesAtuais
      );
      if (!faixa) return setValorSimulacao(0);

      let valor = 0;
      switch (nome) {
        case "Bronze":
          valor = faixa.bronze;
          break;
        case "Prata":
          valor = faixa.prata;
          break;
        case "Ouro":
          valor = faixa.ouro;
          break;
        default:
          valor = 0;
      }
      setValorSimulacao(valor);
    }
  };

  const handleTipoPlanoChange = (tipo: TipoPlano) => {
    setTipoPlano(tipo);
    setPlanoSelecionado(null);
    setValorSimulacao(0);
    if (tipo === "familia") {
      setQntDependentes(4);
    }
  };

  const handleDependentesChange = (newDependentes: number) => {
    setQntDependentes(newDependentes);
  };

  const processaAssinatura = (): void => {
    if (!planoSelecionado) {
      alert("Selecione um plano primeiro!");
      return;
    }

    alert(
      `Plano selecionado: ${planoSelecionado.toUpperCase()}\n` +
        `Tipo: ${tipoPlano === "individual" ? "Individual" : "Família"}\n` +
        (tipoPlano === "familia" ? `Dependentes: ${qntDependentes}\n` : "") +
        `Valor mensal: R$ ${valorSimulacao.toFixed(2)}`
    );
  };

  const planoAtual: PlanoIndividual | PlanoFamiliaBase | null =
    tipoPlano === "individual"
      ? planos.individual.find((p) => p.nome === planoSelecionado) ?? null
      : planoSelecionado
      ? planos.familia.planosBase.find((p) => p.tipo === planoSelecionado) ?? null
      : null;

  // --- CLASSES TAILWIND REUTILIZÁVEIS PARA O EFEITO ---

  // Base para todos os botões de seleção de plano
  const basePlanButtonClasses =
    "relative w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ease-in-out focus:outline-none";

  // Estilo quando NÃO selecionado (estado padrão + hover)
  const unselectedPlanButtonClasses =
    "bg-primary text-white border-2 border-transparent hover:bg-[#5a1c8e] hover:shadow-md hover:-translate-y-0.5";

  // Estilo quando SELECIONADO (O efeito visual forte)
  // Mudanças: Cor de fundo mais escura, texto em negrito, sombra grande, anel de foco externo e leve aumento de escala.
  const selectedPlanButtonClasses =
    "bg-[#6b21a8] text-white font-bold shadow-xl ring-4 ring-purple-300 ring-offset-2 scale-[1.03] z-10";

  // --- FIM DAS CLASSES REUTILIZÁVEIS ---

  return (
    <div className="pb-10 flex justify-center" id="planos">
      <div className="w-full max-w-6xl mx-4 bg-white border rounded-lg px-6 py-6 shadow-sm overflow-hidden">
        <div className="flex flex-col items-center text-center gap-6 relative z-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-2xl font-bold">
            <h3 className="text-custom-blue">Nossos</h3>
            <h3 className="text-primary">Planos</h3>
          </div>

          <p className="text-gray-700 max-w-xl">
            Simule o plano ideal para você e sua família!
          </p>

          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-custom-blue h-14 flex items-center transition-all duration-300">
              {valorSimulacao > 0
                ? `R$ ${valorSimulacao.toFixed(2)}`
                : "R$ 0,00"}
            </h3>
            <p className="text-primary text-sm sm:text-base">por mês</p>
          </div>

          {/* Seletor Tipo de Plano (Individual/Família) - Efeito mais sutil aqui */}
          <div className="flex gap-2 mt-2 bg-gray-100 p-1 rounded-lg">
            {(["individual", "familia"] as TipoPlano[]).map((tipo) => (
              <button
                key={tipo}
                className={`px-6 py-2 rounded-md font-semibold transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-purple-400
                  ${
                    tipoPlano === tipo
                      ? "bg-white text-primary shadow-md"
                      : "text-gray-500 hover:text-primary hover:bg-gray-200"
                  }`}
                onClick={() => handleTipoPlanoChange(tipo)}
              >
                {tipo === "individual" ? "Individual" : "Família"}
              </button>
            ))}
          </div>

          {/* Botões de Seleção de Plano - INDIVIDUAL (COM O NOVO EFEITO) */}
          {tipoPlano === "individual" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 px-2">
              {planos.individual.map((p) => (
                <button
                  key={p.nome}
                  type="button"
                  onClick={() => processaValorSimulacao("individual", p.nome)}
                  // Aplicação das classes dinâmicas
                  className={`${basePlanButtonClasses} ${
                    planoSelecionado === p.nome
                      ? selectedPlanButtonClasses
                      : unselectedPlanButtonClasses
                  }`}
                >
                  {p.nome}
                </button>
              ))}
            </div>
          )}

          {/* Botões de Seleção de Plano - FAMÍLIA (COM O NOVO EFEITO) */}
          {tipoPlano === "familia" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 my-4 px-2">
              {planos.familia.planosBase.map((p) => (
                <button
                  key={p.tipo}
                  type="button"
                  onClick={() =>
                    processaValorSimulacao("familia", p.tipo, qntDependentes)
                  }
                  // Aplicação das classes dinâmicas
                  className={`${basePlanButtonClasses} ${
                    planoSelecionado === p.tipo
                      ? selectedPlanButtonClasses
                      : unselectedPlanButtonClasses
                  }`}
                >
                  {p.tipo}
                </button>
              ))}
            </div>
          )}

          {/* Área de Benefícios com animação suave */}
          <div
            className={`bg-primary/5 border border-primary/20 rounded-xl p-5 text-left w-full max-w-3xl transition-all duration-500 ${
              planoSelecionado
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none absolute"
            }`}
          >
            {tipoPlano === "individual" &&
              planoAtual &&
              "beneficios" in planoAtual && (
                <>
                  <h4 className="font-bold text-primary text-lg mb-2">
                    Benefícios do plano {planoAtual.nome}:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {planoAtual.beneficios}
                  </p>
                </>
              )}

            {tipoPlano === "familia" && planoSelecionado && (
              <>
                <h4 className="font-bold text-primary text-lg mb-2">
                  Benefícios do plano {planoSelecionado}:
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {planos.familia.beneficiosGerais}
                </p>
              </>
            )}
          </div>

          {tipoPlano === "familia" && (
            <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch mt-2">
              <div className="flex-1 flex flex-col gap-3">
                <p className="text-gray-700 font-medium text-center">
                  Selecione a faixa de Dependentes:
                </p>

                {/* Botões de Dependentes - Efeito de seleção intermediário */}
                <div className="flex justify-center flex-wrap gap-2">
                  {planos.familia.valores.map((faixa) => (
                    <button
                      key={faixa.dependentes}
                      type="button"
                      onClick={() => handleDependentesChange(faixa.dependentes)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 border-2
                        ${
                          qntDependentes === faixa.dependentes
                            ? "bg-white border-[#6b21a8] text-[#6b21a8] shadow-md font-bold scale-105"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200"
                        }`}
                    >
                      {faixa.dependentes} Pessoas
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3 flex flex-col justify-end">
                <button
                  onClick={processaAssinatura}
                  disabled={!planoSelecionado}
                  className={`w-full font-bold rounded-xl h-14 shadow-lg transition-all duration-300
                    ${
                      planoSelecionado
                        ? "bg-secondary hover:bg-secondary-hover hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:ring-orange-300 text-white cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                    }
                  `}
                >
                  Assinar agora
                </button>
              </div>
            </div>
          )}

          {tipoPlano === "individual" && (
            <button
              onClick={processaAssinatura}
              disabled={!planoSelecionado}
              className={`w-full max-w-xs font-bold rounded-xl py-4 shadow-lg transition-all duration-300 mt-4
                ${
                  planoSelecionado
                    ? "bg-secondary hover:bg-secondary-hover hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:ring-orange-300 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                }
              `}
            >
              Assinar agora
            </button>
          )}
        </div>
      </div>
    </div>
  );
}