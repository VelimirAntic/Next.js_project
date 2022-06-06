import { ErrorMessage, Field } from "formik";
import React from "react";

interface FormControlProps {
  type: string;
  name: string;
  placeholder: string;
}

const renderControl = (type: string, name: string, placeholder: string) => {
  if (type === "textarea")
    return (
      <Field name={name}>
        {({ field }: any) => {
          return (
            <textarea
              className="form-control"
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              name={name}
            />
          );
        }}
      </Field>
    );

  if (type === "checkbox")
    return (
      <label>
        <Field type={type} name={name} /> {placeholder}
      </label>
    );

  return (
    <Field
      type={type}
      name={name}
      className="form-control"
      placeholder={placeholder}
    />
  );
};

const FormControl = ({ type, name, placeholder }: FormControlProps) => {
  return (
    <div className="form-group">
      <div>{renderControl(type, name, placeholder)}</div>

      <ErrorMessage name={name}>
        {(msg) => <div className="error-message">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default FormControl;
