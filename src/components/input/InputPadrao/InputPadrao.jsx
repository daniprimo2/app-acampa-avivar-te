import './main.sass'

function InputPadrao({type, label, setDado, dado}) {
  return (
    <div className='campo'>
        <p id="titulo">{label}:</p>
        <input type={type} placeholder={label} value={dado} onChange={(e) => setDado(e.target.value)}/>
    </div>
  )
}

export default InputPadrao