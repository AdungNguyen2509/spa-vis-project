import React from "react";

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} style={props.style}>
      {props.text}
    </button>
  );
};

export default Button;
