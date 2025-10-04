import React, { useState } from "react";

// Tipos de planos individuais
interface PlanoIndividual {
  nome: string;
  beneficios: string;
  valor: number;
}

// Tipos de planos família
interface PlanoFamiliaBase {
  tipo: "Prata" | "Ouro";
  comCota: boolean;
}

interface ValorFamilia {
  dependentes: number;
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

export default function Simulation(): JSX.Element {
  const [tipoPlano, setTipoPlano] = useState<TipoPlano>("individual");
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);
  const [valorSimulacao, setValorSimulacao] = useState<number>(0);
  const [qntDependentes, setQntDependentes] = useState<number>(0);

  const planos: Planos = {
    individual: [
      {
        nome: "Bronze",
        beneficios: "Consulta com cota + Telemedicina + Farmácia",
        valor: 49.9,
      },
      {
        nome: "Prata",
        beneficios: "Consulta com cota + Funeral + Farmácia + Telemedicina",
        valor: 79.9,
      },
      {
        nome: "Ouro",
        beneficios:
          "Consulta sem cota + Telemedicina + Farmácia + Funeral + Clube de desconto",
        valor: 99.9,
      },
    ],
    familia: {
      planosBase: [
        { tipo: "Prata", comCota: true },
        { tipo: "Ouro", comCota: false },
      ],
      valores: [
        { dependentes: 4, prata: 99.9, ouro: 119.9 },
        { dependentes: 8, prata: 139.9, ouro: 159.9 },
        { dependentes: 12, prata: 179.9, ouro: 199.9 },
        { dependentes: 16, prata: 219.9, ouro: 239.9 },
        { dependentes: 20, prata: 269.9, ouro: 289.9 },
      ],
      beneficiosGerais:
        "Somente o titular terá todos os benefícios. Os dependentes terão direito apenas à Assistência Funeral.",
    },
  };

  const processaValorSimulacao = (tipo: TipoPlano, nome: string): void => {
    setTipoPlano(tipo);
    setPlanoSelecionado(nome);

    if (tipo === "individual") {
      const plano = planos.individual.find((p) => p.nome === nome);
      setValorSimulacao(plano?.valor ?? 0);
    } else {
      const faixa = planos.familia.valores.find(
        (v) => v.dependentes === qntDependentes
      );
      if (!faixa) return setValorSimulacao(0);

      const valor = nome === "Prata" ? faixa.prata : faixa.ouro;
      setValorSimulacao(valor);
    }
  };

  const processaAssinatura = (): void => {
    if (!planoSelecionado) {
      alert("Selecione um plano primeiro!");
      return;
    }

    alert(
      `Plano selecionado: ${planoSelecionado.toUpperCase()}\n` +
        `Tipo: ${tipoPlano === "individual" ? "Individual" : "Família"}\n` +
        `Dependentes: ${qntDependentes}\n` +
        `Valor mensal: R$ ${valorSimulacao.toFixed(2)}`
    );
  };

  const planoAtual =
    tipoPlano === "individual"
      ? planos.individual.find((p) => p.nome === planoSelecionado)
      : planoSelecionado
      ? planos.familia.planosBase.find((p) => p.tipo === planoSelecionado)
      : null;

  return (
    <div className="pb-10 flex justify-center" id="secaoPlanos">
      <div className="w-full max-w-6xl mx-4 bg-white border rounded-lg px-6 py-6 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Título */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-2xl font-bold">
            <h3 className="text-custom-blue">Nossos</h3>
            <h3 className="text-primary">Planos</h3>
          </div>

          <p className="text-gray-700 max-w-xl">
            Simule o plano ideal para você e sua família!
          </p>

          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-custom-blue">
              R$ {valorSimulacao.toFixed(2)}
            </h3>
            <p className="text-primary text-sm sm:text-base">por mês</p>
          </div>

          {/* Tipo de plano */}
          <div className="flex gap-2 mt-4">
            {(["individual", "familia"] as TipoPlano[]).map((tipo) => (
              <button
                key={tipo}
                className={`px-4 py-2 rounded font-semibold transition 
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  ${
                    tipoPlano === tipo
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-200 focus:bg-[#6b21a8]"
                  }`}
                onClick={() => {
                  setTipoPlano(tipo);
                  setPlanoSelecionado(null);
                  setValorSimulacao(0);
                }}
              >
                {tipo === "individual" ? "Individual" : "Família"}
              </button>
            ))}
          </div>

          {/* Planos individuais */}
          {tipoPlano === "individual" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
              {planos.individual.map((p) => (
                <button
                  key={p.nome}
                  type="button"
                  onClick={() => processaValorSimulacao("individual", p.nome)}
                  className={`w-full py-3 px-4 rounded font-medium transition focus:outline-none focus:ring-4 focus:ring-purple-400
                    ${
                      planoSelecionado === p.nome
                        ? "bg-[#6b21a8] text-white"
                        : "bg-primary text-white hover:bg-[#6b21a8] focus:bg-[#6b21a8]"
                    }`}
                >
                  {p.nome}
                </button>
              ))}
            </div>
          )}

          {/* Planos família */}
          {tipoPlano === "familia" && (
            <div className="w-full grid grid-cols-2 gap-3 my-4">
              {planos.familia.planosBase.map((p) => (
                <button
                  key={p.tipo}
                  type="button"
                  onClick={() => processaValorSimulacao("familia", p.tipo)}
                  className={`w-full py-3 px-4 rounded font-medium transition focus:outline-none focus:ring-4 focus:ring-purple-400
                    ${
                      planoSelecionado === p.tipo
                        ? "bg-[#6b21a8] text-white"
                        : "bg-primary text-white hover:bg-[#6b21a8] focus:bg-[#6b21a8]"
                    }`}
                >
                  {p.tipo}
                </button>
              ))}
            </div>
          )}

          {/* Benefícios */}
          {planoSelecionado && (
            <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 text-left w-full max-w-3xl">
              {tipoPlano === "individual" && planoAtual && "beneficios" in planoAtual && (
                <>
                  <h4 className="font-semibold text-primary mb-2">
                    Benefícios do plano {planoAtual.nome}:
                  </h4>
                  <p className="text-gray-700">{planoAtual.beneficios}</p>
                </>
              )}

              {tipoPlano === "familia" && (
                <>
                  <h4 className="font-semibold text-primary mb-2">
                    Benefícios do plano {planoSelecionado}:
                  </h4>
                  <p className="text-gray-700">{planos.familia.beneficiosGerais}</p>
                </>
              )}
            </div>
          )}

          {/* Dependentes + CTA */}
          {tipoPlano === "familia" && (
            <div className="w-full flex flex-col lg:flex-row gap-3 items-stretch">
              <div className="flex-1 flex flex-col gap-3">
                <p className="text-gray-700 font-medium text-center">
                  Dependentes: {qntDependentes}
                </p>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      qntDependentes > 0
                        ? setQntDependentes(qntDependentes - 4)
                        : 0
                    }
                    className="bg-primary hover:bg-[#6b21a8] focus:bg-[#6b21a8] focus:ring-4 focus:ring-purple-400 text-white rounded-l-lg px-3 py-2 h-11"
                  >
                    −
                  </button>

                  <input
                    type="text"
                    value={qntDependentes}
                    readOnly
                    className="w-24 h-11 text-center text-black text-sm border-t border-b border-primary/30 bg-gray-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      qntDependentes < 20
                        ? setQntDependentes(qntDependentes + 4)
                        : 20
                    }
                    className="bg-primary hover:bg-[#6b21a8] focus:bg-[#6b21a8] focus:ring-4 focus:ring-purple-400 text-white rounded-r-lg px-3 py-2 h-11"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="lg:w-1/3">
                <button
                  onClick={processaAssinatura}
                  className="w-full bg-secondary hover:bg-secondary-hover focus:ring-4 focus:bg-secondary-hover text-white font-bold rounded h-14 lg:h-full shadow-lg"
                >
                  Assinar agora
                </button>
              </div>
            </div>
          )}

          {tipoPlano === "individual" && (
            <button
              onClick={processaAssinatura}
              className="w-full max-w-xs bg-secondary hover:bg-secondary-hover focus:ring-4 focus:ring-purple-400 text-white font-bold rounded py-4 shadow-lg"
            >
              Assinar agora
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
