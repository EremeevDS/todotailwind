import React from 'react'

function HelloPage() {
   return (
      <div className='max-w-screen-md w-full h-72 rounded-lg bg-blue-400 mx-auto mt-16 pt-5 px-10 relative '>
         <h1 className='text-center text-2xl text-white'>Приложение список-задач</h1>
         <div className='flex text-white h-full'>
            <div className='flex flex-1 flex-col justify-center'>
               <ul className='list-disc'>
                  <h3 className='font-medium mb-1'>В обновлении от 29.10.2021:</h3>
                  <li>Создание папок задач</li>
                  <li>Выбор цвета для папки</li>
                  <li>Редактирование названия папки</li>
                  <li>Удаление папки и ее задач</li>
                  <li>Просмотр всех папок одновременно</li>
               </ul>
            </div>
            <img className='h-52 absolute -right-7 -bottom-7' src='./img.png' alt='todo'/>
         </div>

      </div>
   )
}

export default HelloPage
