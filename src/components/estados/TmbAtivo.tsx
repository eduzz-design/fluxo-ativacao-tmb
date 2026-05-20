import { VALOR_MINIMO_TMB_LABEL } from '../../App'

interface Props {
  showCheckout: boolean
  onToggleCheckout: () => void
  onDesativar: () => void
  valorAbaixoDoMinimo: boolean
}

export function TmbAtivo({ showCheckout, valorAbaixoDoMinimo }: Props) {
  if (valorAbaixoDoMinimo) {
    return (
      <div className="estado-panel">
        <div className="alert alert-warning">
          <strong>TMB indisponível neste produto.</strong>{' '}
          O valor do produto está abaixo do mínimo aceito pela TMB ({VALOR_MINIMO_TMB_LABEL}).
          Para reativar o boleto parcelado, ajuste o preço do produto para um valor igual ou maior que o mínimo.
        </div>
      </div>
    )
  }

  return (
    <div className="estado-panel">
      {showCheckout ? (
        <div className="alert alert-success">
          Boleto parcelado ativo neste produto. A opção TMB já está disponível no checkout para os compradores.
        </div>
      ) : (
        <div className="alert alert-warning">
          Boleto parcelado desativado no checkout. O comprador não verá a opção TMB como forma de pagamento. Ative o switch acima para disponibilizar.
        </div>
      )}
    </div>
  )
}
