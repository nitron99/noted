import React from 'react';
import './card.css';

const Card = ({data , click}) => {

  const handle = () => {
    click(data)
  }

  return (
    <div className='dashboard-card' onClick={() => {handle()}}>
      {data}
    </div>
  )
}

export default Card;