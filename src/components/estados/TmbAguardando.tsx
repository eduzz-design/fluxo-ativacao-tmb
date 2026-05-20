interface Props {
  onAprovado: () => void
  onErro: () => void
}

export function TmbAguardando({ onAprovado, onErro }: Props) {
  return (
    <div className="estado-panel">
      <div className="alert alert-warning">
        A aprovação está demorando mais que o esperado. Assim que sua conta for aprovada, o boleto parcelado é habilitado automaticamente nos seus produtos.
      </div>

      <p className="estado-hint">
        Você pode sair desta página. Quando a TMB concluir a aprovação, o boleto parcelado fica disponível por aqui — basta voltar e conferir o status.
      </p>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onErro}>Simular erro</button>
        <button className="btn btn-primary" onClick={onAprovado}>Simular aprovação</button>
      </div>
    </div>
  )
}
