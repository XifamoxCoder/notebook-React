import './App.scss'
import Body from "../../layouts/Body/Body.jsx";
import {useEffect, useState} from "react";
import LeftPanel from "../../layouts/LeftPanel/LeftPanel.jsx";
import { UserIdContext } from "../Section/Section.jsx"
import {formatDateString} from "../../utils/dateFormatter.js";

function App() {
  const [INITIAL_DATA, setINITIAL_DATA] = useState([])
  const [userId, setUserId] = useState(1)
  const [onSelectCardFromBody, setOnSelectCardFromBody] = useState(null);
  const [select, setSelect] = useState(false)
  const [isNewItem, setIsNewItem] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  const currentDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    setSelect(false)
    setOnSelectCardFromBody({title: '', text: '', date: formatDateString(currentDate), key: 0})
    setIsNewItem(true);
    const storedData = JSON.parse(localStorage.getItem('data')) || []
    setINITIAL_DATA(storedData)
  }, []);

  const maxId = INITIAL_DATA.reduce((max, item) => (item.id > max ? item.id : max), 0);
  const newId = maxId + 1;
  const newItem = () => {
    setSelect(false)
    setOnSelectCardFromBody({title: '', text: '', date: formatDateString(currentDate), key: newId})
  }

  const addItem = (e, title, text, date, setSelect, select, key, setIsTitleValid, setIsTextValid, setIsDateValid) => {
    e.preventDefault()
    setSelect(false)

    if (!title ) {
      setIsTitleValid(false);
      return;
    } else if (!date || date === 'дд.мм.гггг' || date === 'NaN-NaN-NaN') {
      setIsDateValid(false);
      return;
    } else if (!text) {
      setIsTextValid(false);
      return;
    }

    if (isFormValid) {
      console.log('formIsValid', select)
        setINITIAL_DATA((prevData) => {
          if (select) {
            const updatedData = prevData.map((item) => {
              if (item.id === key) {
                return {
                  ...item,
                  title,
                  text,
                  date: formatDateString(date),
                };
              }
              return item;
            });
            setOnSelectCardFromBody({title: '', text: '', date: formatDateString('дд.мм.гггг'), key: 0})

            localStorage.setItem('data', JSON.stringify(updatedData));
            return updatedData;


          } else {
            const newPost = {
              title: title,
              text: text,
              date: formatDateString(date),
              id: newId,
              author: userId
            }
            setOnSelectCardFromBody({title: '', text: '', date: formatDateString('дд.мм.гггг'), key: 0})

            const newData = [...prevData, newPost]
            localStorage.setItem('data', JSON.stringify(newData))

            return newData
          }
        })
      } else {
        console.log('error')
      }


      console.log(INITIAL_DATA)
  }

  const deleteItem = (key) => {
    if (key === 0) {
      alert('Вы не создали карточку')
    } else {
      setSelect(false)
      setOnSelectCardFromBody({title: '', text: '', date: formatDateString(currentDate), key: 0})

      setINITIAL_DATA((prevData) => {
        const updatedData = prevData.filter((item) => item.id !== key)
        localStorage.setItem('data', JSON.stringify(updatedData))
        return updatedData
      })

    }
  };

  return (
    <div className='container'>
      <UserIdContext.Provider value={[userId, setUserId]}>
        <LeftPanel onClick={newItem} setSelect={setSelect} items={INITIAL_DATA} onSelectCardFromBody={setOnSelectCardFromBody} setOnSelectCardFromBody={setOnSelectCardFromBody} setIsNewItem={setIsNewItem}/>
        <Body onSubmit={addItem} onClick={deleteItem} setOnSelectCard={setOnSelectCardFromBody} onSelectCard={onSelectCardFromBody} setSelect={setSelect} select={select} isNewItem={isNewItem} setIsNewItem={setIsNewItem} setFormValid={setIsFormValid}/>
      </UserIdContext.Provider>
    </div>
  )
}

export default App
