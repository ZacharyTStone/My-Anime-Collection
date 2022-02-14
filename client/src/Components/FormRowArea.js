import styled from "styled-components";

const FormRowArea = ({ labelText, name, value, handleChange, type }) => {
  return (
    <Wrapper>
      {" "}
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}{" "}
          <span className={300 - value.length >= 0 ? "normal" : "red"}>
            * {300 - value.length} characters left
          </span>
        </label>
        <textarea
          wrap="hard"
          resize="both"
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
          style={{
            height: "100px",
            width: "100%",
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .normal {
    color: var(--textColor);
  }
  .red {
    color: var(--red-light);
  }
`;
export default FormRowArea;
