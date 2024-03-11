import styles from './Logo.module.scss'
import logo from '../../assets/Logo.svg'

function Logo() {

  return (
    <>
      <img className={styles.logo} src={logo} alt='Лого'/>
    </>
  )
}

export default Logo
