interface Props {
  onAprovado: () => void
  onErro: () => void
}

const PRAZO_ANALISE = 'até 2 dias úteis'

export function TmbAguardandoPrazo({ onAprovado, onErro }: Props) {
  return (
    <div className="estado-panel">
      <div className="alert alert-info">
        <strong>Análise em andamento na TMB.</strong>{' '}
        A aprovação do seu cadastro pode levar {PRAZO_ANALISE}. Assim que a TMB
        concluir, o boleto parcelado é habilitado automaticamente nos seus produtos.
      </div>

      <p className="estado-hint">
        Você não precisa ficar nesta tela. Volte mais tarde para consultar o status
        da análise por aqui.
      </p>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onErro}>Simular erro</button>
        <button className="btn btn-primary" onClick={onAprovado}>Simular aprovação</button>
      </div>
    </div>
  )
}
