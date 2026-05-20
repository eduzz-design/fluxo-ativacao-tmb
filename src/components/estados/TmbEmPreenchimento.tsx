import { useState } from 'react'
import type { Cadastro360Status, Cadastro360Data } from '../../App'

interface Props {
  onCancelar: () => void
  onConfirmar: () => void
  onDemorou: () => void
  cadastro360Status: Cadastro360Status
  cadastro360Data: Cadastro360Data
}

type Vinculo = '' | 'socio' | 'procurador'

export function TmbEmPreenchimento({ onCancelar, onConfirmar, onDemorou, cadastro360Status, cadastro360Data }: Props) {
  const hasCadastro360 = cadastro360Status === 'preenchido'

  const [vinculo, setVinculo] = useState<Vinculo>('')
  const [nome, setNome] = useState(hasCadastro360 ? cadastro360Data.nome : '')
  const [cpf, setCpf] = useState(hasCadastro360 ? cadastro360Data.cpf : '')
  const [aceiteContrato, setAceiteContrato] = useState(false)
  const [aceiteVeracidade, setAceiteVeracidade] = useState(false)
  const [loading, setLoading] = useState(false)

  const dadosVemDoCadastro360 =
    hasCadastro360 &&
    nome === cadastro360Data.nome &&
    cpf === cadastro360Data.cpf

  const nomeCompleto = nome.trim().split(/\s+/).filter(Boolean).length >= 2
  const dadosPreenchidos = nome.trim() !== '' && cpf.trim() !== ''
  const vinculoOk = vinculo !== ''
  const canSubmit = vinculoOk && dadosPreenchidos && aceiteContrato && aceiteVeracidade

  const handleEditarNoCadastro360 = () => {
    alert('Direciona o produtor para o Cadastro 360 para editar os dados do representante legal.')
  }

  const handleConfirmar = () => {
    setLoading(true)
    const rapido = Math.random() > 0.5
    setTimeout(() => {
      setLoading(false)
      if (rapido) {
        onConfirmar()
      } else {
        onDemorou()
      }
    }, rapido ? 3000 : 6000)
  }

  if (loading) {
    return (
      <div className="estado-panel">
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <p className="loading-text">Enviando dados e aguardando aprovação da TMB...</p>
          <p className="loading-hint">Isso pode levar alguns segundos</p>
        </div>
      </div>
    )
  }


  return (
    <div className="estado-panel">
      <div className="alert alert-info">
        <strong>Análise de crédito pela TMB.</strong> Os dados preenchidos abaixo são enviados para a TMB, parceira responsável pela análise e aprovação do seu cadastro de boleto parcelado. A Eduzz não participa dessa decisão.
      </div>

      <p className="form-step-label">Vínculo com a empresa</p>

      <div className="form-group">
        <label className="radio-row">
          <input
            type="radio"
            name="vinculo"
            value="socio"
            checked={vinculo === 'socio'}
            onChange={() => setVinculo('socio')}
          />
          <span>
            <span className="radio-title">Sou sócio da empresa</span>
            <span className="radio-desc">Estou no contrato social da empresa.</span>
          </span>
        </label>

        <label className="radio-row">
          <input
            type="radio"
            name="vinculo"
            value="procurador"
            checked={vinculo === 'procurador'}
            onChange={() => setVinculo('procurador')}
          />
          <span>
            <span className="radio-title">Sou procurador da empresa</span>
            <span className="radio-desc">Não estou no contrato social. A procuração foi validada no Cadastro 360.</span>
          </span>
        </label>
      </div>

      {vinculo !== '' && (
        <>
          <div className="divider" />

          <div className="form-step-row">
            <p className="form-step-label">
              {vinculo === 'procurador' ? 'Dados do procurador da empresa' : 'Dados do representante legal da conta'}
            </p>
            {hasCadastro360 && (
              <span className="cadastro360-tag">Cadastro 360</span>
            )}
          </div>

          {hasCadastro360 ? (
            <>
              <div className="cadastro360-callout cadastro360-callout--info">
                <div className="cadastro360-callout-icon" aria-hidden>✓</div>
                <div className="cadastro360-callout-body">
                  <div className="cadastro360-callout-title">Dados pré-preenchidos pelo Cadastro 360</div>
                  <p className="cadastro360-callout-text">
                    Reaproveitamos as informações do representante legal já validadas no Cadastro 360.
                    Para alterar, edite no próprio Cadastro 360 e os dados serão atualizados aqui.
                  </p>
                </div>
                <div className="cadastro360-callout-action">
                  <button type="button" className="link link-button" onClick={handleEditarNoCadastro360}>
                    Editar no Cadastro 360 →
                  </button>
                </div>
              </div>

              <div className="cadastro360-summary">
                <div className="cadastro360-summary-row">
                  <span className="cadastro360-summary-label">
                    {vinculo === 'procurador' ? 'Nome completo do procurador' : 'Nome completo do representante legal'}
                  </span>
                  <span className="cadastro360-summary-value">{cadastro360Data.nome}</span>
                </div>
                <div className="cadastro360-summary-row">
                  <span className="cadastro360-summary-label">
                    {vinculo === 'procurador' ? 'CPF do procurador' : 'CPF do representante legal'}
                  </span>
                  <span className="cadastro360-summary-value">{cadastro360Data.cpf}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">
                  {vinculo === 'procurador' ? 'Nome completo do procurador' : 'Nome completo do representante legal'}
                </label>
                <input
                  className="form-input"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Ex.: Maria Silva Santos"
                />
                <p className={`form-hint ${nome.trim() !== '' && !nomeCompleto ? 'form-hint-warn' : ''}`}>
                  {nome.trim() !== '' && !nomeCompleto
                    ? 'Recomendamos preencher o nome completo, como aparece no documento.'
                    : 'Informe o nome completo, exatamente como aparece no documento.'}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {vinculo === 'procurador' ? 'CPF do procurador' : 'CPF do representante legal'}
                </label>
                <input
                  className="form-input"
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
            </>
          )}
        </>
      )}

      {dadosPreenchidos && vinculoOk && (
        <>
          <div className="contrato-preview">
            <h4 className="contrato-titulo">Contrato de Parceria TMB e Eduzz</h4>
            <div className="contrato-dados">
              <div className="contrato-campo">
                <span className="contrato-label">
                  {vinculo === 'procurador' ? 'Procurador:' : 'Representante legal:'}
                </span>
                <span className="contrato-valor">{nome}</span>
              </div>
              <div className="contrato-campo">
                <span className="contrato-label">CPF:</span>
                <span className="contrato-valor">{cpf}</span>
              </div>
              <div className="contrato-campo">
                <span className="contrato-label">Vínculo:</span>
                <span className="contrato-valor">{vinculo === 'socio' ? 'Sócio' : 'Procurador'}</span>
              </div>
              {dadosVemDoCadastro360 && (
                <div className="contrato-campo">
                  <span className="contrato-label">Origem dos dados:</span>
                  <span className="contrato-valor">Cadastro 360 do produtor</span>
                </div>
              )}
            </div>
            <div className="contrato-corpo">
              {vinculo === 'procurador' ? (
                <>
                  <p>Pelo presente instrumento, o procurador acima identificado, agindo em nome do produtor e amparado pela procuração anexada, firma contrato com a TMB Educação e a Eduzz para disponibilização do boleto parcelado como meio de pagamento nos produtos comercializados na plataforma Eduzz.</p>
                  <p>O procurador autoriza, em nome do produtor, o compartilhamento dos dados cadastrais com a TMB para fins de análise de crédito e habilitação da funcionalidade de parcelamento via boleto.</p>
                </>
              ) : (
                <>
                  <p>Pelo presente instrumento, o produtor acima identificado firma contrato com a TMB Educação e a Eduzz para disponibilização do boleto parcelado como meio de pagamento em seus produtos comercializados na plataforma Eduzz.</p>
                  <p>O produtor autoriza o compartilhamento dos dados cadastrais com a TMB para fins de análise de crédito e habilitação da funcionalidade de parcelamento via boleto.</p>
                </>
              )}
            </div>
            <a href="#" className="link contrato-download" onClick={e => e.preventDefault()}>Baixar contrato completo (PDF)</a>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="aceiteContrato"
              checked={aceiteContrato}
              onChange={e => setAceiteContrato(e.target.checked)}
            />
            <label htmlFor="aceiteContrato">
              {vinculo === 'procurador' ? (
                <>Li e aceito o contrato de parceria com a <strong>TMB e Eduzz</strong> e autorizo, em nome do produtor, o compartilhamento dos dados.</>
              ) : (
                <>Li e aceito o contrato de parceria com a <strong>TMB e Eduzz</strong> e autorizo o compartilhamento dos dados.</>
              )}
            </label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="aceiteVeracidade"
              checked={aceiteVeracidade}
              onChange={e => setAceiteVeracidade(e.target.checked)}
            />
            <label htmlFor="aceiteVeracidade">
              {vinculo === 'procurador'
                ? 'Declaro veracidade nas informações descritas (Nome e CPF) e ser procurador legalmente habilitado a representar a empresa, conforme procuração anexada.'
                : 'Declaro veracidade nas informações descritas (Nome e CPF) e ser o responsável legal pela empresa.'}
            </label>
          </div>
        </>
      )}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
        <button
          className="btn btn-primary"
          disabled={!canSubmit}
          onClick={handleConfirmar}
        >
          Confirmar e enviar para análise da TMB
        </button>
      </div>
    </div>
  )
}
