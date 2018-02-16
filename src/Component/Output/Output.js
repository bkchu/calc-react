import React from "react";

const output = props => {
  return (
    <input onChange={props.changed} value={props.query} className="Output">
      {props.query}
    </input>
  );
};

export default output;
