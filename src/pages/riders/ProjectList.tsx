import Card from "@/components/ui/Card";
import Tooltip from "@/components/ui/Tooltip";
import { useTBERidersModalStore } from "@/data/riders/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Icon from "@/components/ui/Icon";
// import Dropdown from "@/components/ui/Dropdown";
// import ProgressBar from "@/components/ui/ProgressBar";
// import { Menu } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination, Column } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import GlobalFilter from "../table/react-tables/GlobalFilter";

const columns: ColumnDef<Rider>[] = [
  {
    header: "Name",
    cell({ row }) {
      return (
        <p className="whitespace-nowrap">{`${row.original.user.first_name} ${row.original.user.last_name}`}</p>
      );
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Email",
    accessorFn(rider) {
      return rider.user.email;
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Phone",
    accessorFn(rider) {
      return rider.user.phone;
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Status",
    accessorFn() {
      return "Active";
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Actions",
    cell({ row }) {
      return (
        <div className="flex items-center gap-2">
          <Tooltip title="View" content="View">
            <Link to={row.original.id} className="block w-fit">
              <Icon icon="heroicons-outline:eye" />
            </Link>
          </Tooltip>
          <Tooltip title="Edit" content="Edit">
            <button
              className="block w-fit"
              onClick={() => {
                useTBERidersModalStore.setState({
                  rider: row.original,
                  isOpen: true,
                });
              }}
            >
              <Icon icon="heroicons-outline:pencil" />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];

const ProjectList = ({ riders }: { riders: Rider[] }) => {
  const navigate = useNavigate();
  const tableInstance = useReactTable({
    columns,
    data: riders,
    getCoreRowModel: getCoreRowModel<Rider>(),
    getPaginationRowModel: getPaginationRowModel<Rider>(),
    getSortedRowModel: getSortedRowModel<Rider>(),
  });

  return (
    <>
      {/* @ts-ignore */}
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Riders List</h4>
          <GlobalFilter filter={""} setFilter={() => console.log("")} />
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className=" bg-slate-100 dark:bg-slate-700">
                  {tableInstance.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} scope="col" className=" table-th ">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.getIsSorted() ? (
                            <span>
                              {header.column.getIsSorted() === "desc"
                                ? " 🔽"
                                : " 🔼"}
                            </span>
                          ) : null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {tableInstance.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => navigate(`./${row.original.id}`)}
                      className="cursor-pointer hover:bg-slate-50/80"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td className="table-td" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={
                    tableInstance.getState().pagination.pageIndex + 1
                  }
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    tableInstance.setPageIndex(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {tableInstance.getState().pagination.pageIndex + 1} of{" "}
                {tableInstance.getPageCount()}
              </span>
            </span>
          </div>
          {/* <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100  dark:text-slate-400 text-slate-900  font-normal "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}>
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}>
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul> */}
        </div>
      </Card>
    </>
  );
};

export default ProjectList;
