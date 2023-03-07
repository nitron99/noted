import React from 'react';

import { RiDeleteBin6Line } from 'react-icons/ri';

import './card.css';

const Card = ({data, onClick, onDelete}) => {

  return (
    <div className='dashboard-card' onClick={onClick}>
      <div style={{ marginLeft: "auto" }}>
        <RiDeleteBin6Line color='red' onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}/>
      </div>
      {data}
    </div>
  )
}

export default Card;