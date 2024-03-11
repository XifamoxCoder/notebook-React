import styles from './Body.module.scss'
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import calendarIcon from '../../assets/calendarIcon.svg'
import {useEffect, useState} from "react";
import {unformatDateString} from "../../utils/dateFormatter.js";

function Body({onSubmit, onSelectCard, onClick, setSelect, select, isNewItem, setFormValid }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isTextValid, setIsTextValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);


  const titleSave = (e) => {
    setTitle(e.target.value)
    setIsTitleValid(!!e.target.value);
    setFormValid(!!e.target.value && isTextValid && isDateValid);
  }
  const textSave = (e) => {
    setText(e.target.value)
    setIsTextValid(!!e.target.value);
    setFormValid(!!e.target.value && isTitleValid && isDateValid);
  }
  const dateSave = (e) => {
    setDate(e.target.value)
    setIsDateValid(!!e.target.value);
    setFormValid(!!e.target.value && isTextValid && isTitleValid);
  }

  useEffect(() => {
    if (onSelectCard && !isNewItem) {
      setTitle(onSelectCard.title);
      setText(onSelectCard.text);
      setDate(unformatDateString(onSelectCard.date));
      setIsTitleValid(true);
      setIsTextValid(true);
      setIsDateValid(true);
    }

  }, [onSelectCard, isNewItem, onSubmit]);

  useEffect(() => {
    const formValid = isTitleValid && isTextValid && isDateValid;
    setFormValid(formValid);
  }, [setTitle, setText, setDate]);

  return (
    <form className={styles.body} onSubmit={(e) => onSubmit(e, title, text, date, setSelect, select, onSelectCard.key, setIsTitleValid, setIsTextValid, setIsDateValid)}>
      <div className={`${styles.title} ${isTitleValid ? '' : styles.invalid}`}>
        <Input value={title} onChange={titleSave} placeholder='Заголовок...' className={`${styles.title__input}`} type={'text'}/>
        <button type='button' onClick={() => onClick(onSelectCard.key)} className={styles.title__button}>X</button>
      </div>
      <div className={`${styles.date} ${!isDateValid && styles.invalid}`}>
        <img src={calendarIcon} alt="Иконка календаря"/>
        <p className={styles.date__text}>Дата</p>
      <Input value={date} className={styles.date__input} onChange={dateSave} type={'date'}/>
      </div>
      <textarea value={text} placeholder='Текст...' onChange={textSave} className={`${styles.text__input} ${!isTextValid && styles.invalid}`} name="" id="" cols="30" rows="10"></textarea>
      <Button disabled={!isTitleValid || !isTextValid || !isDateValid} className={styles.form__btn} basic='true'>{select ? 'Сохранить' : 'Добавить'}</Button>
    </form>
  )
}

export default Body
