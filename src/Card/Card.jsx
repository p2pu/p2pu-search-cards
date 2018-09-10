import React from 'react'

const Card = (props) => {
  return (
    <div className={`result-item grid-item ${props.colorClass}`}>
      <div className="card">
        {props.children}
      </div>
    </div>
  );
}

export default Card
