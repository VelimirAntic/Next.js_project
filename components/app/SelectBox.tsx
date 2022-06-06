import React from "react";

interface SelectBoxProps {
  label: string;
  value: string | undefined;
  onChange: any;
  children: any;
}

const SelectBox = ({ label, value, onChange, children }: SelectBoxProps) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-select" value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};

export default SelectBox;
