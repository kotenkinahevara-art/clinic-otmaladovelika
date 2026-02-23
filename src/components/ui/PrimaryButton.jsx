import { motion as Motion } from 'framer-motion'

function PrimaryButton({
  children,
  variant = 'primary',
  size = 'sm',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  return (
    <Motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16 }}
      {...props}
    >
      {children}
    </Motion.button>
  )
}

export default PrimaryButton

