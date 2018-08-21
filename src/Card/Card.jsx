import React from 'react'

const Card = (props) => {
  return (
    <div className={`result-item grid-item col-md-4 col-sm-12 col-xs-12 ${props.colorClass}`}>
      <div className="card">
        {props.children}
      </div>
    </div>
  );
}

export default Card
