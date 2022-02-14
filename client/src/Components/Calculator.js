import Calculator from "awesome-react-calculator";

const CalculatorComponent = () => {
  function handleInput(input) {}

  function onResultChange(newResult) {}
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Calculator onNewInput={handleInput} onResultChange={onResultChange} />
    </div>
  );
};

export default CalculatorComponent;
