import { useState } from 'react'
import { TmbDropdownCard } from './components/TmbDropdownCard'
import './styles/global.css'

export type TmbStatus = 'nao-configurado' | 'em-preenchimento' | 'aguardando' | 'aguardando-prazo' | 'ativo' | 'erro' | 'bloqueado'
export type Cadastro360Status = 'preenchido' | 'pendente'
export type ValorProdutoStatus = 'acima-do-minimo' | 'abaixo-do-minimo'

export type Cadastro360Data = {
  nome: string
  cpf: string
}

const CADASTRO_360_MOCK: Cadastro360Data = {
  nome: 'Maria Silva Santos',
  cpf: '123.456.789-00',
}

export const VALOR_MINIMO_TMB_LABEL = 'R$ 100,00'

export default function App() {
  const [status, setStatus] = useState<TmbStatus>('nao-configurado')
  const [showCheckout, setShowCheckout] = useState(true)
  const [cadastro360, setCadastro360] = useState<Cadastro360Status>('preenchido')
  const [valorProduto, setValorProduto] = useState<ValorProdutoStatus>('acima-do-minimo')

  // Cadastro 360 só afeta os estados onde o produtor ainda interage com o cadastro
  // (não-configurado e em-preenchimento). Depois disso, os dados já foram enviados
  // para a TMB, então o status do Cadastro 360 deixa de impactar a UI.
  const cadastro360Relevante = status === 'nao-configurado' || status === 'em-preenchimento'

  // Valor do produto só importa quando o TMB já está ativo — só nesse estado o card
  // mostra o aviso de "valor abaixo do mínimo" e desabilita o toggle.
  const valorProdutoRelevante = status === 'ativo'

  return (
    <>
    <div className="layout">
      <div className="main">
        <div className="content">
          <div className="card-section">
            <div className="tmb-section">
              <h4 className="subsection-title">Boleto parcelado</h4>
              <TmbDropdownCard
                status={status}
                setStatus={setStatus}
                showCheckout={showCheckout}
                onToggleCheckout={() => setShowCheckout(v => !v)}
                cadastro360Status={cadastro360}
                cadastro360Data={CADASTRO_360_MOCK}
                valorProdutoStatus={valorProduto}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ============================================================ */}
    {/* Controles de demo — NÃO FAZEM PARTE DA INTERFACE              */}
    {/* Apenas para simular estados durante a apresentação/handoff.    */}
    {/* ============================================================ */}
    <div className="demo-controls" aria-hidden>
      <span className="demo-controls-label">
        ⚙️ Controles de demo — não fazem parte da interface
      </span>
      <div className="demo-controls-row">
        <span className="demo-controls-sublabel">Simular estado:</span>
        {(['nao-configurado', 'em-preenchimento', 'aguardando', 'aguardando-prazo', 'ativo', 'erro', 'bloqueado'] as TmbStatus[]).map(s => (
          <button
            key={s}
            className={`demo-controls-btn ${status === s ? 'demo-controls-btn-active' : ''}`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="demo-controls-row">
        <span className="demo-controls-sublabel">
          Cadastro 360:
          {!cadastro360Relevante && (
            <span className="demo-controls-hint">não se aplica a este estado</span>
          )}
        </span>
        {(['preenchido', 'pendente'] as Cadastro360Status[]).map(s => (
          <button
            key={s}
            className={`demo-controls-btn ${cadastro360 === s ? 'demo-controls-btn-active' : ''}`}
            onClick={() => setCadastro360(s)}
            disabled={!cadastro360Relevante}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="demo-controls-row">
        <span className="demo-controls-sublabel">
          Valor do produto:
          {!valorProdutoRelevante && (
            <span className="demo-controls-hint">só afeta o estado “ativo”</span>
          )}
        </span>
        {(['acima-do-minimo', 'abaixo-do-minimo'] as ValorProdutoStatus[]).map(s => (
          <button
            key={s}
            className={`demo-controls-btn ${valorProduto === s ? 'demo-controls-btn-active' : ''}`}
            onClick={() => setValorProduto(s)}
            disabled={!valorProdutoRelevante}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
    </>
  )
}
