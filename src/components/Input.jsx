import React from "react";

const Input = (props) => {
  return (
    <div>
      <label>
        {props.text}
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
};

export default Input;
