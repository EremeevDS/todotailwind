import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import {List, AddList} from '../index'

import { faListUl, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'

function Nav(props) {

   const {showAllLists, showAll, lists, selectedList, onRemoveList, selectItem, colors, onAddList, width, setWidth} = props

   function useWindowDimensions() {
    
      const updateWidth = () => {
         if(window.innerWidth < 768){
            setWidth(true)
         }
         if(window.innerWidth > 768){
            setWidth(false)
         }
      };

      React.useEffect(() =>{
         updateWidth()
      }, [])
    
      React.useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      });
    
      return width
   }
   const displayMobileNav = useWindowDimensions()
   const changeNav = () =>{
      setWidth(!width)
   }

   return (
      <React.Fragment>
         <nav
            hidden={(displayMobileNav === true) && 'hidden'}
            className='overflow-y-scroll pt-10 bg-gray-50 border-r-2 border-gray-100 px-10 sm:pt-15 md:pt-20 md:px-5 lg:px-10'
            >
            <div
               className='w-full px-3 py-2 inline-flex rounded-md bg-gray-100 mb-6 hover:bg-white cursor-pointer'
               onClick={changeNav}
               >
               <FontAwesomeIcon icon={faTimes} className='text-2xl opacity-60 mx-auto'/>
            </div>
            <List
               icon={faListUl}
               items={[
               {
                  id: 0,
                  name: 'Все задачи',
               }
               ]}
               activeAll={showAllLists}
               showAll={showAll}
            />
            {lists && <List 
               items={lists}
               activeItem={selectedList}
               delIcon={faTrash}
               isRemovable={true}
               onRemove={onRemoveList}
               onSelectItem={selectItem}
            />}
            <AddList
               colors={colors}
               onAdd={onAddList}
            />
         </nav>
         <nav hidden={(displayMobileNav === false) && 'hidden'} className='pt-10 px-1 bg-gray-50 border-r-2 border-gray-100 sm:pt-15 md:pt-20 sm:px-3'>
            <div
               className='px-3 py-2 inline-flex rounded-md hover:bg-white cursor-pointer'
               onClick={changeNav}
               >
               <FontAwesomeIcon icon={faBars} className='text-2xl opacity-70 md:text-3xl'/>
            </div>
         </nav>
      </React.Fragment>
   )
}

export default Nav
