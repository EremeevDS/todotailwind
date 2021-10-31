import React from 'react'
import axios from 'axios'
import { List, Badge } from '../'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddList(props) {
   const { colors, onAdd } = props

   const [isVizible, setIsVizible] = React.useState(false)
   const [selectedColor, setSelectedColor] = React.useState()
   const [inputValue, setInputValue] = React.useState('')
   const [isLoading, setIsLoading] = React.useState(false)

   React.useEffect(() => {
      if (Array.isArray(colors)) {
         setSelectedColor(colors[0].id)
      }
   }, [colors])

   const onAddList = () => {
      setIsLoading(true)
      axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
         const color = colors.filter(el => el.id === selectedColor)[0];
         const listObj = { ...data, color};
         onAdd(listObj);
         setIsVizible(false)
         setSelectedColor(colors[0].id)
         setInputValue('')
      })
         .finally(() => setIsLoading(false))
   }
   return (
      <div>
         <List
            icon={faPlus}
            items={[
               {
                  id: 0,
                  name: 'Добавить папку',
               }
            ]}
            viziblePopup={() => setIsVizible(!isVizible)}
         />
         {isVizible && <div className='bg-white px-2 py-5 -mt-5 rounded-md drop-shadow-2xl'>
            <input
               type="text"
               placeholder='Введите название папки'
               className='px-2 py-2 w-full rounded-md border text-sm hover:border-gray-400'
               value={inputValue}
               onChange={e => setInputValue(e.target.value)}
            />
            <ul className='flex justify-between my-2'>
               {colors.map(el => (
                  <li key={el.id}>
                     <Badge
                        color={el.name}
                        onClick={() => setSelectedColor(el.id)}
                        class={selectedColor === el.id && 'badge--active'}
                     />
                  </li>
               ))}
            </ul>
            <button
               className='w-full bg-green-300 py-2 rounded-md text-white text-sm hover:bg-green-400'
               onClick={onAddList}
            >{isLoading ? 'Добавление...' : 'Создать'}
            </button>
         </div>}
      </div>
   )
}

export default AddList
