import React from 'react'

const CardTitle = (props) => {
  return (
    <div className="card-title mb-0">
      <h4 className="title">{ props.children }</h4>
    </div>
  );
}

export default CardTitle
