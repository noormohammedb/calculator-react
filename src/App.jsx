import { useReducer } from "react";
import NumButton from "./components/NumButton";
import "./App.css";
import OperationButton from "./components/OperationButton";

const reducer = (reducerState, { type, payload }) => {
  switch (type) {
    case "numAdd":
      if (reducerState.overwrite) {
        return {
          ...reducerState,
          currentOper: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && reducerState.currentOper === "0")
        return reducerState;
      if (
        payload.digit === "." &&
        String(reducerState.currentOper).includes(".")
      )
        return reducerState;
      return {
        ...reducerState,
        currentOper: `${reducerState.currentOper || ""}${payload.digit}`,
      };
    case "evaluate":
      if (
        reducerState.operator == null ||
        reducerState.currentOper == null ||
        reducerState.previousOper == null
      ) {
        console.log("eval null return");
        return reducerState;
      }
      return {
        ...reducerState,
        overwrite: true,
        previousOper: null,
        currentOper: evaluate(reducerState),
        operator: null,
      };
    case "oper":
      if (reducerState.currentOper == null && reducerState.previousOper == null)
        return reducerState;

      console.info("reducerState:", reducerState);
      if (reducerState.currentOper == null) {
        console.info("insei");
        return {
          ...reducerState,
          operator: payload.operation,
        };
      }

      if (reducerState.previousOper == null) {
        return {
          operator: payload.operation,
          previousOper: reducerState.currentOper,
          currentOper: null,
        };
      }
      return {
        ...reducerState,
        previousOper: evaluate(reducerState),
        operation: payload.operation,
        currentOper: null,
      };
    case "clear":
      return {};
    case "delChar":
      if (reducerState.overwrite) {
        return {
          ...reducerState,
          currentOper: null,
          overwrite: false,
        };
      }
      if (reducerState.currentOper == null) return reducerState;
      if (reducerState.currentOper.length === 1) {
        return {
          ...reducerState,
          currentOper: null,
        };
      }
      return {
        ...reducerState,
        currentOper: reducerState.currentOper.slice(0, -1),
      };
    default:
      return reducerState;
  }
};

const evaluate = ({ currentOper, previousOper, operator }) => {
  const prev = parseFloat(previousOper);
  const curr = parseFloat(currentOper);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = 0;
  if (operator === "+") {
    computation = prev + curr;
  } else if (operator === "-") {
    computation = prev - curr;
  } else if (operator === "*") {
    computation = prev * curr;
  } else if (operator === "/") {
    computation = prev / curr;
  }
  return computation.toString();
};

function App() {
  const [{ currentOper, previousOper, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previus-operand">
            {previousOper} {operator}
          </div>
          <div className="current-operand">{currentOper}</div>
        </div>
        <button
          className="span-two"
          onClick={() => {
            dispatch({ type: "clear" });
          }}
        >
          AC
        </button>
        <button
          onClick={() => {
            dispatch({ type: "delChar", payload: {} });
          }}
        >
          DEL
        </button>

        <OperationButton operation="/" dispatch={dispatch} />
        <NumButton digit="1" dispatch={dispatch} />
        <NumButton digit="2" dispatch={dispatch} />
        <NumButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <NumButton digit="4" dispatch={dispatch} />
        <NumButton digit="5" dispatch={dispatch} />
        <NumButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <NumButton digit="7" dispatch={dispatch} />
        <NumButton digit="8" dispatch={dispatch} />
        <NumButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <NumButton digit="." dispatch={dispatch} />
        <NumButton digit="0" dispatch={dispatch} />
        <button
          className="span-two"
          onClick={() => {
            dispatch({ type: "evaluate" });
          }}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
