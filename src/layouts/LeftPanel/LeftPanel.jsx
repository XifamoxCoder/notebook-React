import styles from './LeftPanel.module.scss'
import Logo from "../../components/Logo/Logo.jsx";
import Button from "../../components/Button/Button.jsx";
import CardItem from "../../components/CardItem/CardItem.jsx";
import Section, {UserIdContext} from "../../components/Section/Section.jsx";
import {useContext} from "react";


function LeftPanel({items, onSelectCardFromBody, onClick, setSelect, setIsNewItem, setOnSelectCardFromBody}) {
  const userId = useContext(UserIdContext)

  const selectCard = (title, text, date, key) => {
    onSelectCardFromBody({ title, text, date, key });
    setSelect(true)
    setIsNewItem(false)
  }

  const cardItems = items
    .filter((item) => item.author !== undefined && item.author === userId[0])
    .map((item) => (
    <CardItem
      onClick={() => selectCard(item.title, item.text, item.date, item.id)}
      title={item.title}
      text={item.text}
      date={item.date}
      author={item.author}
      key={item.id}
    />
  ))
    .sort((a, b) => a - b).reverse()

  return (
    <div className={styles.leftPanel}>
        <Logo />
        <Section setOnSelectCardFromBody={setOnSelectCardFromBody}/>
        <Button onClick={onClick}>Новое воспоминание</Button>
        {cardItems}
    </div>
  )
}

export default LeftPanel
