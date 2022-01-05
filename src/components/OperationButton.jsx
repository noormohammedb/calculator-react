import React from "react";

function OperationButton({ dispatch, operation }) {
  return (
    <>
      <button
        onClick={() => dispatch({ type: "oper", payload: { operation } })}
      >
        {operation}
      </button>
    </>
  );
}

export default OperationButton;
