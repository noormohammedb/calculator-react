import React from "react";

function NumButton({ dispatch, digit }) {
  return (
    <>
      <button onClick={() => dispatch({ type: "numAdd", payload: { digit } })}>
        {digit}
      </button>
    </>
  );
}

export default NumButton;
