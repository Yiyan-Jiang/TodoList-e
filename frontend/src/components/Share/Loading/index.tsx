import './index.css'

export default function Loading() {
  const text = 'Loading'

  return (
    <div className='loading-fill' aria-label={text}>
      <span className='loading-fill__text' data-text={text}>
        {text}
      </span>
    </div>
  )
}
