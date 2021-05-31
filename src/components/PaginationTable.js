import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

import "./table.scss";

const PaginationTable = () => {
  // Мемоизируем, чтобы данные не пересоздавались при каждом действии
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      // Используем shorthand ES6 и объявим только имена свойств
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : null}
                    </span>
                  </div>
                  <span>
                    {column.canFilter ? column.render("Filter") : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="footer-toolbar">
        <div className="page-n-of">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <label className="go-to-page__label">
          | Go to page:{" "}
          <input
            className="go-to-page-input"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(event) => {
              const pageNumber = event.target.value
                ? Number(event.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </label>
        <div className="page-navigation">
          <button
            className="page-navigation__button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"«"}
          </button>
          <button
            className="page-navigation__button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            ◀
          </button>
          <button
            className="page-navigation__button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            ▶
          </button>
          <button
            className="page-navigation__button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"»"}
          </button>
        </div>

        <select
          className="show-n-rows"
          value={pageSize}
          onChange={(event) => setPageSize(Number(event.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PaginationTable;
