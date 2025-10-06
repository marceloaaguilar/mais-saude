import { useState } from "react"

export default function Simulador(){
    const [valorSimulacao, setValorSimulacao] = useState(0.00);
    const [qntDependentes, setQntDependentes] = useState(0);
    const [statusModal, setStatusModal]       = useState<string>("hidden");

    const processaAssinatura = () => {
        setStatusModal("");
    }

    const handleChangeModal = () => {
        setStatusModal("hidden")
    }

    const processaValorSimulacao = (valorSimulacao:Number) => {
        
        setValorSimulacao((prevValor) => prevValor + 37.90 * ( qntDependentes !== 0 ? qntDependentes : 1 ))
    }

    return (
      <div className="pb-10 flex justify-center">
        <div className="w-full max-w-5xl mx-4 bg-white border rounded-lg px-6 py-6 shadow-sm">
          {/* container interno centralizado */}
          <div className="flex flex-col items-center text-center gap-4">

            {/* título (empilhado no mobile, em linha a partir de sm) */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-2xl font-bold">
              <h3 className="text-custom-blue">Clube</h3>
              <h3 className="text-primary">Personalizado</h3>
            </div>

            {/* descrição */}
            <p className="text-gray-700 max-w-xl">
              Que tal montar o Clube perfeito com o seu perfil? Escolha os planos abaixo e aproveite!
            </p>

            {/* preço: tipografia responsiva */}
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-custom-blue">R$ {valorSimulacao}</h3>
              <p className="text-primary text-sm sm:text-base">por mês</p>
            </div>

            {/* botões de plano: transforma em grid no mobile, linha no desktop */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center gap-3 my-4">
              <button type="button" onClick={() => processaValorSimulacao(37.9)} className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-primary/30">
                Telemedicina
              </button>
              <button type="button" className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-primary/30">
                Clube de descontos
              </button>
              <button type="button" className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-primary/30">
                Assistência Pet
              </button>
              <button type="button" className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-primary/30">
                Seguro de vida
              </button>
              <button type="button" className="w-full lg:w-auto bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-primary/30">
                Assistência Funeral
              </button>
            </div>

            {/* área dependentes + CTA: empilha no mobile, lado a lado no lg */}
            <div className="w-full flex flex-col lg:flex-row gap-3 items-stretch">
              <div className="flex-1 flex flex-col gap-3">
                <button type="button" className="w-full bg-primary/5 border border-primary text-primary font-medium py-3 rounded hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  Adicionar Dependente
                </button>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => qntDependentes > 0 ? setQntDependentes(qntDependentes - 1) : 0}
                    aria-label="Diminuir dependentes"
                    className="bg-primary hover:bg-primary-dark text-white rounded-l-lg px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >−</button>

                  <input
                    type="text"
                    id="quantity-input"
                    value={qntDependentes}
                    readOnly
                    className="flex-1 h-11 text-center text-black text-sm border-t border-b border-primary/30 bg-gray-50"
                    aria-label="Quantidade de dependentes"
                  />

                  <button
                    type="button"
                    onClick={() => setQntDependentes(qntDependentes + 1)}
                    aria-label="Aumentar dependentes"
                    className="bg-primary hover:bg-primary-dark text-white rounded-r-lg px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >+</button>
                </div>
              </div>

              <div className="lg:w-1/3">
                <button
                  onClick={() => processaAssinatura()}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded h-14 lg:h-full shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/25"
                >
                  Assinar agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

}