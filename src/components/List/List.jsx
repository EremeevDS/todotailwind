import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { Badge } from '../'

import './List.scss'
function List(props) {

   const { items, icon, delIcon, isRemovable, onRemove, viziblePopup, onSelectItem, activeItem, activeAll, showAll } = props

   return (
      <ul className='list mb-6' onClick={viziblePopup ? viziblePopup : activeAll}>
         {items && items.map((el) => (
            <li
               key={el.id}
               onClick={() => {onSelectItem && onSelectItem(el)}}
               className={classNames('flex items-center cursor-pointer px-5 py-2 mb-1 rounded-md hover:bg-white',
                  { 'active': activeItem && activeItem.id === el.id},
                  { 'active' : showAll}
               )}
               
            >
               {icon ?
                  <FontAwesomeIcon icon={icon} className='inline-flex mr-2 opacity-40' />
                  :
                  <Badge
                        color={el.color.name}
                        class={''}
                  />
               }
               <span className='flex-1 mr-3'>{el.name}</span>
               {el.tasks && <span className='bg-gray-100 py-0.5 px-2 rounded-full text-xs'>{el.tasks.length}</span>}
               {isRemovable && <FontAwesomeIcon
                  icon={delIcon}
                  className='list__remove-icon inline-flex opacity-40 ml-3'
                  onClick={() => onRemove(el.id)}
                  />}
            </li>
         ))}
      </ul>
   )
}

export default List
