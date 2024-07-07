import FormInput from "@/components/form-input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useLoggedInUser } from "@/data/auth";
import { useWalletBalance, useWalletDashboard, useWalletHistory } from "@/data/wallet";
import { useUpdateOrg } from "@/mutations/auth/profile";
import { useCreateWithdrawal } from "@/mutations/withdrawals";
import { Icon } from "@iconify/react/dist/iconify.js";
import { number, object } from "yup";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

export default function WalletPage() {
  const walletBalance = useWalletBalance();
  const [isCommisionOpen, setIsCommisionOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const updateOrg = useUpdateOrg();
  const createWithdrawal = useCreateWithdrawal();
  const user = useLoggedInUser();
  const walletDashboard = useWalletDashboard();

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {/* @ts-ignore */}
        <Card
          title="Wallet balance"
          noborder
          subtitle={
            walletBalance.isLoading ? (
              <p>Loading...</p>
            ) : (
              <p>
                {(walletBalance.data?.balance || 0).toLocaleString(undefined, {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "narrowSymbol",
                })}
              </p>
            )
          }>
          <button
            onClick={() => {
              if ((walletBalance.data?.balance || 0) < 2_000) {
                toast.error("You can only withdraw when your balance is at least ₦2,000");
                return;
              }
              setIsWithdrawOpen(true);
            }}
            className="btn-dark btn flex items-center gap-2">
            Withdraw <Icon icon="akar-icons:arrow-right" />
          </button>
        </Card>
        <Card
          noborder
          title="Total Earnings"
          subtitle={
            walletDashboard.isLoading ? (
              <p>Loading...</p>
            ) : (
              <p>
                {(walletDashboard.data?.credits.all_time_credit || 0).toLocaleString(undefined, {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "narrowSymbol",
                })}
              </p>
            )
          }>
          {walletDashboard.data ? (
            <div className="flex flex-col rtl:space-x-reverse">
              <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
                <Icon
                  icon={
                    walletDashboard.data.credits.this_month_credit < walletDashboard.data.credits.last_month_credit
                      ? "heroicons:arrow-trending-down"
                      : "heroicons:arrow-trending-up"
                  }
                />{" "}
                <span className="text-sm">
                  {Math.abs(
                    (walletDashboard.data.credits.this_month_credit - walletDashboard.data.credits.last_month_credit) /
                      walletDashboard.data.credits.last_month_credit
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  from last month
                </span>
              </span>
              <div className="text-sm">
                <span className={`mb-[2px]`}>
                  {walletDashboard.data?.credits.this_month_credit.toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                    currencyDisplay: "narrowSymbol",
                  })}{" "}
                </span>
                <span className=" text-slate-600 dark:text-slate-300">this month</span>
              </div>
            </div>
          ) : null}
        </Card>
        <Card
          noborder
          title="Total Withdrawals"
          subtitle={
            walletDashboard.isLoading ? (
              <p>Loading...</p>
            ) : (
              <p>
                {(walletDashboard.data?.withdrawals.all_time_withdrawal || 0).toLocaleString(undefined, {
                  style: "currency",
                  currency: "NGN",
                  currencyDisplay: "narrowSymbol",
                })}
              </p>
            )
          }>
          {walletDashboard.data ? (
            <div className="flex flex-col rtl:space-x-reverse">
              <span className={clsx("inline-flex items-center gap-2 text-success-700 dark:text-success-300")}>
                <Icon
                  icon={
                    walletDashboard.data.withdrawals.this_month_withdrawal <
                    walletDashboard.data.withdrawals.last_month_withdrawal
                      ? "heroicons:arrow-trending-down"
                      : "heroicons:arrow-trending-up"
                  }
                />{" "}
                <span className="text-sm">
                  {Math.abs(
                    walletDashboard.data.withdrawals.this_month_withdrawal -
                      walletDashboard.data.withdrawals.last_month_withdrawal ||
                      1 / walletDashboard.data.withdrawals.last_month_withdrawal ||
                      1
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  from last month
                </span>
              </span>
              <div className="text-sm">
                <span className={`mb-[2px]`}>
                  {walletDashboard.data?.withdrawals.this_month_withdrawal.toLocaleString(undefined, {
                    style: "currency",
                    currency: "NGN",
                    currencyDisplay: "narrowSymbol",
                  })}{" "}
                </span>
                <span className=" text-slate-600 dark:text-slate-300">this month</span>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
      {/* @ts-ignore */}
      <Card title="Wallet History" className="mt-4">
        <WalletHistory />
      </Card>
      <Modal activeModal={isCommisionOpen} onClose={() => setIsCommisionOpen(false)} title="Edit commission" centered>
        <Formik
          initialValues={{
            commission: user.data?.org_data.commission || 0,
          }}
          onSubmit={(values) => {
            updateOrg
              .mutateAsync({
                commission: values.commission,
                id: user.data?.org_data.id,
              })
              .then(() => {
                setIsCommisionOpen(false);
                toast.success("Commission updated successfully");
              })
              .catch(() => {
                toast.error("An error occured");
              });
          }}>
          {({ handleSubmit }) => (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormInput type="number" name="commission" label="Commission" step={0.01} max={100} min={0} required />
              <div className="flex justify-end">
                <Button
                  isLoading={updateOrg.isLoading}
                  disabled={updateOrg.isLoading}
                  loadingText="Updating..."
                  type="submit"
                  className="btn btn-dark btn-lg">
                  Update
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
      <Modal activeModal={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} title="Withdraw" centered>
        <Formik
          initialValues={{
            amount: 0,
          }}
          validationSchema={object({
            amount: number()
              .min(2000, "You can only withdraw a minimum of 2,000 Naira")
              .max(walletBalance.data?.balance || 0, "You can not withdraw more than your wallet balance")
              .required("Amount is required"),
          }).required()}
          onSubmit={(values) => {
            createWithdrawal
              .mutateAsync({
                amount: values.amount,
              })
              .then(() => {
                setIsWithdrawOpen(false);
                toast.success("Withdrawal request sent successfully");
              })
              .catch(() => {
                toast.error("An error occured");
              });
          }}>
          {({ handleSubmit }) => (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormInput
                required
                type="number"
                name="amount"
                label="Amount"
                min={0.01}
                step={0.01}
                max={walletBalance.data?.balance}
              />
              <div className="flex justify-end">
                <Button
                  isLoading={createWithdrawal.isLoading}
                  disabled={createWithdrawal.isLoading}
                  loadingText="Sending..."
                  type="submit"
                  className="btn btn-dark btn-lg">
                  Withdraw
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

const columns: ColumnDef<WHistory>[] = [
  {
    header: "ID",
    accessorKey: "transaction_id",
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Description",
    accessorKey: "desc",
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    header: "Type",
    accessorKey: "transaction_type",
    enableColumnFilter: true,
    enableGlobalFilter: true,
    cell(props) {
      return (
        <span className={`text-sm font-medium ${props.getValue() === "debit" ? "text-red-500" : "text-green-500"}`}>
          {props.getValue() as any}
        </span>
      );
    },
  },

  {
    header: "Amount",
    accessorKey: "amount",
    cell(props) {
      return (
        <span className={`text-sm font-medium text-end block`}>
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            currencyDisplay: "narrowSymbol",
          }).format(props.getValue() as any)}
        </span>
      );
    },
  },
  {
    header: "Date Created",
    accessorKey: "created_at",
    cell(props) {
      return <span className="text-sm font-medium">{new Date(props.getValue() as any).toLocaleString()}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell(props) {
      return (
        <span className={`text-sm font-medium ${props.getValue() === "failed" ? "text-red-500" : "text-green-500"}`}>
          {props.getValue() as any}
        </span>
      );
    },
  },
];

function WalletHistory() {
  const walletHistory = useWalletHistory();

  const tableInstance = useReactTable({
    columns,
    data: walletHistory.data || [],
    getCoreRowModel: getCoreRowModel<Rider>(),
    getPaginationRowModel: getPaginationRowModel<Rider>(),
    getSortedRowModel: getSortedRowModel<Rider>(),
  });

  return (
    <>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className=" bg-slate-100 dark:bg-slate-700">
                {tableInstance.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} scope="col" className=" table-th ">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() ? (
                          <span>{header.column.getIsSorted() === "desc" ? " 🔽" : " 🔼"}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {tableInstance.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="table-td" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">Go</span>
            <span>
              <input
                type="number"
                className=" form-control py-2"
                defaultValue={tableInstance.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                  tableInstance.setPageIndex(pageNumber);
                }}
                style={{ width: "50px" }}
              />
            </span>
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {tableInstance.getState().pagination.pageIndex + 1} of {tableInstance.getPageCount()}
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
    </>
  );
}
