import React from "react";

const Input = ({
  icon,
  id,
  type = "text",
  placeholder,
  value,
  required = true,
  onChange,
  step,
}) => {
  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        step={step}
        className={`block w-full text-[#345E42] px-3 py-2 ${
          icon ? "pl-10" : ""
        } bg-white border border-[#F5E8D6] rounded-md
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500
                  sm:text-sm`}
        placeholder={placeholder}
      />
    </div>
  );
};

const TextArea = ({
  icon,
  id,
  placeholder,
  value,
  required = true,
  onChange,
  cols = "10",
  rows = "5",
}) => {
  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>

      <textarea
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className={`mt-1 resize-none block w-full text-[#345E42] px-3 py-2 ${
          icon ? "pl-10" : ""
        }
       bg-white border border-[#F5E8D6] rounded-md
          shadow-sm placeholder-gray-400 focus:outline-none
          focus:ring-emerald-500 focus:border-emerald-500
          sm:text-sm`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

const Select = ({
  id,
  name,
  value,
  onChange,
  itemName,

  selection = ["selection1", "selection2", "selection3"],
  required = true,
}) => {
  return (
    <div className="mt-1 relative rounded-md shadow-sm">
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`mt-1 resize-none block w-full text-[#345E42] px-3 py-2 
       bg-white border border-[#F5E8D6] rounded-md
          shadow-sm placeholder-gray-400 focus:outline-none
          focus:ring-emerald-500 focus:border-emerald-500
          sm:text-sm`}
      >
        <option>Select a {itemName}</option>
        {selection.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export { Input, TextArea, Select };
