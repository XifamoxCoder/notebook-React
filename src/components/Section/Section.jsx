import styles from './Section.module.scss'
import {createContext, useContext} from "react";
import {formatDateString} from "../../utils/dateFormatter.js";
export const UserIdContext = createContext(1);

function Section({setOnSelectCardFromBody}) {
  const setUserId = useContext(UserIdContext)[1]
  const changeUser = (e) => {
    setUserId(+e.target.value)
    setOnSelectCardFromBody({title: '', text: '', date: formatDateString('дд.мм.гггг'), key: 0})
  }

  return (
    <>
      <select onChange={changeUser} className={styles.section}>
        <option className={styles.option} value="1">User 1</option>
        <option className={styles.option} value="2">User 2</option>
      </select>
    </>
  )
}

export default Section
