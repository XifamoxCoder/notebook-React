import styles from './Input.module.scss'

function Input({type, className, placeholder, onChange, value}) {

  return (
    <>
      <input value={value} type={type} className={`${styles.input} ${className}`} onChange={onChange} placeholder={placeholder}/>
    </>
  )
}

export default Input
