import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  // Фильтр будет отрабатывать через 400мс после последнего ввода, чтобы "облегчить" приложение
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 400);

  return (
    <div>
      <div className="global-seach-bar">
        <label className="global-seach-bar__label">Search: </label>
        <input
          className="global-seach-bar__input"
          value={value || ""}
          onChange={(event) => {
            setValue(event.target.value);
            onChange(event.target.value);
          }}
        />
      </div>
    </div>
  );
};
