import React from "react";
import RequiredLabel from "./RequiredLabel";
const InputField = ({ label, type, value, onChange, required = false, disabled = false, placeholder = "" }) => {
    return (
    <div>
      <RequiredLabel label={label} />
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        onChange={onChange}
        disabled={disabled}
      />
    </div>
    );
};
  export default InputField