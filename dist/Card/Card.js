import React from 'react';

const Card = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: `result-item grid-item ${props.colorClass} ${props.classes}`,
    id: props.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, props.children));
};

export default Card;