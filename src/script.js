import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const data = [
  { id: "clear", value: "AC" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
  { id: "divide", value: "/" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "multiply", value: "x" },
  { id: "equals", value: "=" }
];

const operatorsToUse = ["AC", "/", "+", "-", "=", "x"];

const numb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const ShowData = ({ display, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="display">
      {display}
    </span>
  </div>
);

const Items = ({ keyData: { id, value }, handleDisplay }) => (
  <button id={id} onClick={() => handleDisplay(value)}>
    {value}
  </button>
);

const KeyPress = ({ handleDisplay }) => (
  <div className="keys">
    {data.map((key) => (
      <Items key={key.id} keyData={key} handleDisplay={handleDisplay} />
    ))}
  </div>
);

const Cal = () => {
  const [display, setDisplay] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [mathData, setMathData] = React.useState("");

  const handleSubmit = () => {
    const total = eval(mathData);
    setDisplay(total);
    setOutput(`${total} = ${total}`);
    setMathData(`${total}`);
  };

  const handleClear = () => {
    setDisplay("0");
    setMathData("");
  };

  const handleNumbers = (value) => {
    if (!mathData.length) {
      setDisplay(`${value}`);
      setMathData(`${value}`);
    } else {
      if (value === 0 && (mathData === "0" || display === "0")) {
        setMathData(`${mathData}`);
      } else {
        const EndCharIs = mathData.charAt(mathData.length - 1);
        const isLastChatOperator =
          EndCharIs === "*" || operatorsToUse.includes(EndCharIs);

        setDisplay(isLastChatOperator ? `${value}` : `${display}${value}`);
        setMathData(`${mathData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const EndCharIs = mathData.charAt(mathData.length - 1);
    if (!mathData.length) {
      setDisplay("0.");
      setMathData("0.");
    } else {
      if (EndCharIs === "*" || operatorsToUse.includes(EndCharIs)) {
        setDisplay("0.");
        setMathData(`${mathData} 0.`);
      } else {
        setDisplay(
          EndCharIs === "." || display.includes(".")
            ? `${display}`
            : `${display}.`
        );
        const formattedValue =
          EndCharIs === "." || display.includes(".")
            ? `${mathData}`
            : `${mathData}.`;
        setMathData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    if (mathData.length) {
      setDisplay(`${value}`);
      const beforeLastChat = mathData.charAt(mathData.length - 2);

      const checkLastOperator =
        operatorsToUse.includes(beforeLastChat) || beforeLastChat === "*";

      const EndCharIs = mathData.charAt(mathData.length - 1);

      const lastOperatorIs =
        operatorsToUse.includes(EndCharIs) || EndCharIs === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastOperatorIs && value !== "-") ||
        (checkLastOperator && lastOperatorIs)
      ) {
        if (checkLastOperator) {
          const updatedValue = `${mathData.substring(
            0,
            mathData.length - 2
          )}${value}`;
          setMathData(updatedValue);
        } else {
          setMathData(
            `${mathData.substring(0, mathData.length - 1)}${validOp}`
          );
        }
      } else {
        setMathData(`${mathData}${validOp}`);
      }
    }
  };

  const handleDisplay = (value) => {
    const number = numb.find((num) => num === value);
    const operator = operatorsToUse.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(mathData);
  };

  React.useEffect(() => {
    handleOutput();
  }, [mathData]);

  return (
    <>
      <div className="container">
        
        <div className="calculator">
          <ShowData display={display} output={output} />
          <KeyPress handleDisplay={handleDisplay} />
        </div>
      </div>
      <div class="footer">
        Calculator project by{" "}
        <a href="https://github.com/rkgith01">Raj Kapadia</a>
      </div>
    </>
  );
};

ReactDOM.render(<Cal />, document.getElementById("cal"));
