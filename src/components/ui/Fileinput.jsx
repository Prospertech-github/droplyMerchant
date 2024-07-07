import React from "react";

const Fileinput = ({
  name,
  label = "Browse",
  onChange,
  placeholder = "Choose a file or drop it here...",
  multiple,
  preview,
  className = "custom-class",
  id,
  badge,
  accept = "image/png, image/jpeg, image/jpg",
  ...props
}) => {
  const [value, setFile] = React.useState(null);
  return (
    <div>
      <div className="filegroup">
        <label>
          <input
            type="file"
            onChange={(e) => {
              onChange(e);
              setFile(e.target.files[0]);
            }}
            className="bg-red-400 w-full hidden"
            name={name}
            id={id}
            multiple={multiple}
            accept={accept}
            placeholder={placeholder}
            {...props}
          />
          <div className={`w-full h-[40px] file-control flex items-center ${className}`}>
            {!multiple && (
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {value && (
                  <span className={badge ? " badge-title" : "text-slate-900 dark:text-white"}>{value.name}</span>
                )}
                {!value && <span className="text-slate-400">{placeholder}</span>}
              </span>
            )}

            <span className="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal">
              {label}
            </span>
          </div>
          {preview && value && (
            <div className="w-[200px] h-[200px] mx-auto mt-6  ">
              <img
                src={value ? URL.createObjectURL(value) : ""}
                className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                alt={value?.name}
              />
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default Fileinput;
