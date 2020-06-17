import React from 'react'

const Card = (props) => {
  return (
    <div className={`result-item grid-item ${props.colorClass} ${props.classes}`} id={props.id}>
      <div className="card">
        {props.children}
      </div>
    </div>
  );
}

export default Card
