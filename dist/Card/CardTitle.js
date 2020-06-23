import React from 'react';

const CardTitle = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-title mb-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "title"
  }, props.children));
};

export default CardTitle;