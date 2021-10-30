import React from 'react'
import axios from 'axios'

import { faListUl, faTrash } from '@fortawesome/free-solid-svg-icons'
import {List, AddList, Tasks, HelloPage} from './components'

import './App.css';

function App() {
  
  const [lists, setLists] = React.useState(null)
  const [colors, setColors] = React.useState(null)
  const [selectedList, setSelectedList] = React.useState()
  const [showAll, setShowAll] = React.useState(false)

  React.useEffect(() =>{
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
      setLists(data)
    });
    axios.get('http://localhost:3001/colors').then(({data}) =>{
      setColors(data)
    });
  }, [])

  const onAddList = (obj) =>{
    const newList = [...lists, obj]
    setLists(newList)
  }
  const onRemoveList = (id) => {
    axios.delete('http://localhost:3001/lists/' + id).then(() =>{
      const newList = lists.filter(el => el.id !== id)
      setLists(newList)
      showAllLists()
    })
  }
  const selectItem = (item) =>{
    setSelectedList(item)
    setShowAll(false)
  }
  const onTitleEdit = (id,title) =>{
    const newList = lists.map(el => {
      if(el.id === id){
        el.name = title
      }
      return el
    })
    setLists(newList)
  }
  const showAllLists = () =>{
    setSelectedList(null)
    setShowAll(true)
  }
  const onAddTask = (listId, obj) =>{
    const newList = lists.map(item =>{
      if(item.id === listId){
        item.tasks = [...item.tasks, obj]
      }
      return item
    })
    setLists(newList)
  }

  return(
    <div className='flex h-screen'>
      <nav className='pt-20 px-10 bg-gray-50 border-r-2 border-gray-100 overflow-y-scroll'>
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
      <main className='flex-1 overflow-y-scroll'>
        {lists && selectedList && <Tasks
          list={selectedList}
          onTitleEdit={onTitleEdit}
          onAddTask={onAddTask}
        />}
        {showAll && lists.map((list) => (
          <Tasks
          list={list}
          onTitleEdit={onTitleEdit}
          onAddTask={onAddTask}
        />
        ))}
        {!selectedList && !showAll && < HelloPage />}
      </main>
    </div>
  )
}

export default App;
