import React from "react";

const button = props => {
  return (
    <button
      className={`Button ${props.shadow}`}
      onClick={props.clicked}
      value={props.label}
    >
      {props.label}
    </button>
  );
};

export default button;
