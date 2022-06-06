import React from "react";

interface CheckBoxProps {
  checked: boolean | undefined;
  onCheck: any;
  label: string;
}

const CheckBox = ({ checked, onCheck, label }: CheckBoxProps) => {
  const id = Math.random() + "";
  return (
    <div className="form-group">
      <label className="form-title">{label}</label>

      <div className="form-check">
        <label className="switch">
          <input
            type="checkbox"
            className="form-check-input mt-0"
            id={id}
            onChange={onCheck}
            checked={checked}
          />{" "}
          <span className="slider"></span>
        </label>

        <label className="text" htmlFor={id}>{label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
