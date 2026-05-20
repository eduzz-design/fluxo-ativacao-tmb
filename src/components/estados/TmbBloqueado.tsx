export function TmbBloqueado() {
  return (
    <div className="estado-panel">
      <div className="alert alert-error">
        <strong>Conta bloqueada pela TMB.</strong>{' '}
        Identificamos que o cadastro do produtor está bloqueado segundo os critérios
        da TMB. Esse caso está sendo analisado — você não precisa fazer nada agora.
      </div>

      <p className="estado-hint">
        Enquanto o bloqueio estiver ativo, o boleto parcelado com TMB não pode ser
        habilitado nos seus produtos. Quando a situação for regularizada com a TMB,
        a opção volta a ficar disponível aqui automaticamente.
      </p>

      <div className="btn-row">
        <a
          href="#"
          className="btn btn-secondary"
          onClick={e => e.preventDefault()}
        >
          Falar com o suporte Eduzz
        </a>
      </div>
    </div>
  )
}
