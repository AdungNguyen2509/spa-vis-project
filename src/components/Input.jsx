import React from "react";



const Input = (props) => {
  return (
    <div className="input-container">
      <label>
        {props.text}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          min= {props.min} 
          max= {props.max}
        />
    </div>
  );
};

export default Input;
