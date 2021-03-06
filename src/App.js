import React from 'react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router';

import {Tasks, HelloPage, Nav} from './components'

import './App.css';

function App() {
  
  const [lists, setLists] = React.useState(null)
  const [colors, setColors] = React.useState(null)
  const [selectedList, setSelectedList] = React.useState()
  const [showAll, setShowAll] = React.useState(false)
  const [width, setWidth] = React.useState(window.innerWidth)

  let history = useHistory();
  let location = useLocation()

  React.useEffect(() =>{
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
      setLists(data)
    });
    axios.get('http://localhost:3001/colors').then(({data}) =>{
      setColors(data)
    });
  }, [])

  React.useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setSelectedList(list);
    }
  }, [lists, location.pathname]);

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
    history.push(`/lists/${item.id}`)
    setShowAll(false)
    setWidth(true)
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
    history.push('/lists')
    setSelectedList(null)
    setShowAll(true)
    setWidth(true)
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
  const onRemoveTask = (listId, taskId) =>{
    axios.delete('http://localhost:3001/tasks/' + taskId).then(() =>{
      const newList = lists.map(list =>{
        if(list.id === listId){
          list.tasks = list.tasks.filter(task => task.id !== taskId)
        }
        return list
      })
      setLists(newList)
    })
  }
  const onEditTask = (listId, task) =>{
    const newTitle = window.prompt('?????????????? ?????????? ??????????????????', task.text)
    axios.patch('http://localhost:3001/tasks/' + task.id, {text: newTitle}).then(({data})=>{
      const newList = lists.map(list =>{
        if(list.id === listId){
          list.tasks = list.tasks.map(listTask =>{
            if(listTask.id === task.id){
              listTask.text = newTitle
            }
            return listTask
          })
        }
        return list
      })
      setLists(newList)
    })
  }
  const onDoneTask = (listId, taskId) =>{
    const importantState = lists.find(list => list.id === listId).tasks.find(task => task.id === taskId).completed
    axios.patch('http://localhost:3001/tasks/' + taskId, {completed: !importantState}).then(({data}) =>{
      const newList = lists.map(list =>{
        if(list.id === listId){
          list.tasks = list.tasks.map(task =>{
            if(task.id === taskId){
              task.completed = !task.completed
            }
            return task
          })
        }
        return list
      })
      setLists(newList)
    })
  }

  return(
    <div className='flex h-screen'>
      <Nav 
        showAllLists={showAllLists}
        showAll={showAll}
        lists={lists}
        selectedList={selectedList}
        onRemoveList={onRemoveList}
        selectItem={selectItem}
        colors={colors}
        onAddList={onAddList}
        width={width}
        setWidth={setWidth}
      />
      <main className='flex-1 overflow-y-scroll'>
        {lists && selectedList && <Tasks
          list={selectedList}
          onTitleEdit={onTitleEdit}
          onAddTask={onAddTask}
          onRemove={onRemoveTask}
          onEdit={onEditTask}
          onDone={onDoneTask}
        />}
        {showAll && lists.map((list) => (
          <Tasks
          key={list.id}
          list={list}
          onTitleEdit={onTitleEdit}
          onAddTask={onAddTask}
          onRemove={onRemoveTask}
          onEdit={onEditTask}
          onDone={onDoneTask}
        />
        ))}
        {!selectedList && !showAll && < HelloPage />}
      </main>
    </div>
  )
}

export default App;
