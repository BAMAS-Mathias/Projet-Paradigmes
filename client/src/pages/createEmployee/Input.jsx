import React from "react";

const Input = ({ type = "text", name, placeholder, onChange, ...props }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-[400px] text-black rounded-md p-1"
      {...props}
    />
  );
};

export default Input;
