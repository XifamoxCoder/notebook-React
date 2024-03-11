import styles from './CardItem.module.scss'

function CardItem({title, date, text, author, onClick}) {

  return (
    <div onClick={() => onClick(title, date, text, author)} className={styles.card}>
      <h2 className={styles.card__title}>{title}</h2>
      <div className={styles.card__body}>
        <p className={styles.card__date}>{date}</p>
        <p className={styles.card__date}>{author}</p>
        <span className={styles.card__text}>{text}</span>
      </div>
    </div>
  )
}

export default CardItem
