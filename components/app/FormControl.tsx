import React from "react";

interface FormControlProps {
  label: string;
  type: string;
  value: string;
  onChange: any;
  className?: string;
}

const FormControl = ({
  label,
  type,
  className,
  onChange,
  value,
}: FormControlProps) => {
  return (
    <div className={`form-group ${className}`}>
      <label className="form-title">{label}</label>

      <input
        type={type}
        className="form-control"
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default FormControl;
