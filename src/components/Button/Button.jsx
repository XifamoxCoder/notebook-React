import styles from './Button.module.scss'

function Button({children, basic, className, onClick }) {

  return (
    <>
      <button onClick={onClick} className={basic ? `${className} ${styles.accentButton}` : `${className} ${styles.button}`}>
        {children}
      </button>
    </>
  )
}

export default Button
