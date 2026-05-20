import { useState } from 'react'
import type { TmbStatus, Cadastro360Status, Cadastro360Data, ValorProdutoStatus } from '../App'
import { TmbDropdownCard } from './TmbDropdownCard'

interface Props {
  tmbStatus: TmbStatus
  setTmbStatus: (s: TmbStatus) => void
  showCheckout: boolean
  onToggleCheckout: () => void
  cadastro360Status: Cadastro360Status
  cadastro360Data: Cadastro360Data
  valorProdutoStatus: ValorProdutoStatus
}

export function PaymentMethods({ tmbStatus, setTmbStatus, showCheckout, onToggleCheckout, cadastro360Status, cadastro360Data, valorProdutoStatus }: Props) {
  const [boleto, setBoleto] = useState(true)
  const [cartao, setCartao] = useState(true)
  const [multiplos, setMultiplos] = useState(true)
  const [pix, setPix] = useState(true)
  const [parcelamento, setParcelamento] = useState(false)
  const [faturaName, setFaturaName] = useState('sswwe')

  return (
    <>
      <div className="payment-row">
        <div className="payment-row-left">
          <button className={`toggle ${boleto ? 'on' : ''}`} onClick={() => setBoleto(v => !v)} />
          <div className="payment-info">
            <h4>Permitir boleto</h4>
            <p>Permitir pagamento por boleto no checkout?</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="payment-row">
        <div className="payment-row-left">
          <button className={`toggle ${cartao ? 'on' : ''}`} onClick={() => setCartao(v => !v)} />
          <div className="payment-info">
            <h4>Permitir cartao de credito</h4>
            <p>Permitir pagamento com cartao no checkout?</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="payment-row">
        <div className="payment-row-left">
          <button className={`toggle ${multiplos ? 'on' : ''}`} onClick={() => setMultiplos(v => !v)} />
          <div className="payment-info">
            <h4>Permitir multiplos cartoes</h4>
            <p>Permitir pagamento com dois ou mais cartoes no checkout?</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="fatura-section">
        <div className="fatura-header">
          <span className="fatura-label">Nome exibido na fatura de cartao</span>
          <span className="fatura-counter">{faturaName.length}/10</span>
        </div>
        <div className="fatura-input-row">
          <span className="fatura-prefix">EDZ</span>
          <input
            className="fatura-input"
            value={faturaName}
            onChange={e => setFaturaName(e.target.value.slice(0, 10))}
            maxLength={10}
          />
        </div>
        <p className="fatura-hint">
          A identificacao na fatura do cartao e importante para prevenir chargebacks. Utilize um nome intuitivo que seu cliente ira reconhecer ao ver a fatura
        </p>
      </div>

      <div className="divider" />

      <div className="payment-row">
        <div className="payment-row-left">
          <button className={`toggle ${pix ? 'on' : ''}`} onClick={() => setPix(v => !v)} />
          <div className="payment-info">
            <h4>Permitir Pix</h4>
            <p>Permitir pagamento com pix no checkout?</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="payment-row">
        <div className="payment-row-left">
          <button className={`toggle ${parcelamento ? 'on' : ''}`} onClick={() => setParcelamento(v => !v)} />
          <div className="payment-info">
            <h4>Parcelamento sem juros</h4>
            <p>As parcelas no checkout irao aparecer sem os juros. Nesse caso o produtor assume os juros no lugar do comprador. <a href="#" className="link">Saiba Mais</a></p>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Boleto parcelado TMB — secao independente */}
      <div className="tmb-section">
        <h4 className="subsection-title">Boleto parcelado</h4>
        <TmbDropdownCard
          status={tmbStatus}
          setStatus={setTmbStatus}
          showCheckout={showCheckout}
          onToggleCheckout={onToggleCheckout}
          cadastro360Status={cadastro360Status}
          cadastro360Data={cadastro360Data}
          valorProdutoStatus={valorProdutoStatus}
        />
      </div>
    </>
  )
}
