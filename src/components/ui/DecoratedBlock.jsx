import heroShapes from '../../assets/shapes/shape.svg'

function DecoratedBlock({ className = '', shape = heroShapes, count = 3 }) {
  const items = Array.from({ length: Math.max(1, count) })

  return (
    <div className={`decorated-block ${className}`.trim()}>
      <div className="decorated-block__layer" aria-hidden="true">
        {items.map((_, index) => (
          <img key={index} src={shape} alt="" className="decorated-block__shape" />
        ))}
      </div>
    </div>
  )
}

export default DecoratedBlock
