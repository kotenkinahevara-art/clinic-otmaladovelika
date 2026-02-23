import pawIcon from '../../assets/icons/paw.svg'

function PawPattern({ count = 6, className = '' }) {
  const items = Array.from({ length: Math.max(1, count) })

  return (
    <div className={`paw-pattern ${className}`.trim()} aria-hidden="true">
      {items.map((_, index) => (
        <img key={index} src={pawIcon} alt="" className="paw-pattern__item" />
      ))}
    </div>
  )
}

export default PawPattern
