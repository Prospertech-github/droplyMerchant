// import { useOrders } from "@/data/orders";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import AssignRider from "./AssignRider";

export default function OrdersPage() {
  // useOrders();
  return (
    <>
      <ExampleTwo title="All Orders" />
      <AssignRider />
    </>
  );
}
