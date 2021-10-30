import React from 'react'

function Badge(props) {
   return (
      <i
         className={`badge badge--${props.color} ${props.class}`}
         onClick={props.onClick}
      />
   )
}

export default Badge
