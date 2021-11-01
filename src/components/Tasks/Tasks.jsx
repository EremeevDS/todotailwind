import React from 'react'
import axios from 'axios'

import AddTask from '../AddTask/AddTask'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import './Tasks.scss'

function Tasks(props) {
   const { list, onTitleEdit, onAddTask, onRemove, onEdit, onDone } = props

   const editTitle = () =>{
      const newTitle = window.prompt('Введите новый заголовок', list.name)
      if (newTitle){
         axios.patch('http://localhost:3001/lists/' + list.id,{
            name: newTitle
         }).then(() =>{
            onTitleEdit(list.id, newTitle)
         })
      }
   }

   return (
      <div className='px-20 pt-20'>
         <h2 className='text-5xl font-light pb-6 border-b-2 border-gray-100 mb-12'
         style={{color: list.color.hex}}
         >{list.name}
            <FontAwesomeIcon icon={faPencilAlt} onClick={editTitle} className='fill-current text-gray-200 text-2xl ml-4 hover:text-gray-500 cursor-pointer' />
         </h2>
         {list.tasks && !list.tasks.length &&
            <h2 className='text-2xl font-bold text-gray-300 text-center whitespace-nowrap'>Задачи отсутствуют</h2>
         }
         {list.tasks && list.tasks.map((el) => (
            <div className='task flex items-center mb-6' key={el.id}>
               <div className='checkbox'>
                  <input
                     type="checkbox"
                     id={`task${el.id}`}
                     className='hidden'
                     defaultChecked={el.completed}
                  />
                  <label
                     onClick={() => onDone(el.listId, el.id)}
                     htmlFor={`task${el.id}`}
                     className='flex items-center justify-center w-6 h-6 border-2 rounded-full inline-block border-gray-300 cursor-pointer'
                     >
                     <FontAwesomeIcon icon={faCheck} className='svg w-3 h-3 opacity-0' />
                  </label>
               </div>
               <p className='flex-1 ml-2 text-xl'>{el.text}</p>
               <div className='task__actions flex opacity-0'>
                  <div onClick={() =>onEdit(list.id, el)} className='py-1 px-2 rounded-sm cursor-pointer mr-1 hover:bg-gray-300'>
                     <FontAwesomeIcon icon={faPencilAlt} />
                  </div>
                  <div onClick={() => onRemove(list.id, el.id)} className='py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                     <FontAwesomeIcon icon={faTrash} />
                  </div>
               </div>
            </div>
         ))}
         <AddTask
            key={list.id}
            onAddTask={onAddTask}
            list={list}
         />
      </div>
   )
}

export default Tasks
