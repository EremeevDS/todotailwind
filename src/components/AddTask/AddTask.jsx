import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function AddTask(props) {

   const { onAddTask, list } = props

   const [vizibleForm, setVizibleForm] = React.useState(false)
   const [inputValue, setInputValue] = React.useState('')

   const toggleFormVizible = () => {
      setVizibleForm(!vizibleForm)
   }

   const AddTask = () => {
      const obj = {
         "listId": list.id,
         "text": inputValue,
         "completed": false
      }
      axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
         onAddTask(list.id, data)
         toggleFormVizible()
         setInputValue('')
      })
   }

   return (
      <div className=''>
         {
            !vizibleForm ?

               <div className='ml-1 cursor-pointer py-1 opacity-30 hover:opacity-70'>
                  <FontAwesomeIcon icon={faPlus} />
                  <span className='ml-3' onClick={toggleFormVizible}>Добавить задачу</span>
               </div>
               :
               <div className=''>
                  <input
                     value={inputValue}
                     onChange={e => setInputValue(e.target.value)}
                     type="text"
                     placeholder='Введите текст'
                     className='h-12 px-2 py-2 w-full rounded-md border text-md mb-2 hover:border-gray-400'
                  />
                  <button
                     className='bg-green-300 py-2 px-6 rounded-md text-white text-md mr-2 hover:bg-green-400'
                     onClick={AddTask}
                  >Добавить</button>
                  <button
                     className='bg-gray-200 py-2 px-6 rounded-md text-white text-md hover:bg-gray-300'
                     onClick={toggleFormVizible}
                  >Отменить</button>
               </div>
         }
      </div>
   )
}

export default AddTask
