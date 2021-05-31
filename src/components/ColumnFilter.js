import React from "react";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="column-filter">
      <input
        className="column-filter__input"
        value={filterValue || ""}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};
