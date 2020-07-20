import React from 'react'

const Card = ({ component, colorClass, classes, id, children, ...rest }) => {
  const Component = component || 'div'
  return (
    <div className={`result-item grid-item ${colorClass} ${classes}`} id={id}>
      <Component className="card" {...rest}>
        {children}
      </Component>
    </div>
  );
}

export default Card
