import './main.sass'

function LoadingSpinner({mensagem}) {
  return (
    <div className='loading-container'>
        <div className='spinner'></div>
        <h1>{mensagem}</h1>
    </div>
  )
}

export default LoadingSpinner