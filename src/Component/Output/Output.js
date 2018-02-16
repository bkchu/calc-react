import React from "react";

const output = props => {
  return (
    <textarea onChange={props.changed} value={props.query} className="Output">
      {props.query}
    </textarea>
  );
};

export default output;
