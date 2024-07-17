type User = {
  id: string;
  account_type: "rider" | "organization";
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image_url: string;
  date_joined: string;
  org_: Organization;
};

type Organization = {
  id: string;
  cac_doc: string;
  logo: string;
  name: string;
  description: string;
  price_per_km: number;
  additional_km: number;
  address: string;
  date_created: string;
  commission: number;
};

type Rider = {
  id: string;
  user: User;
  company: Organization;
  last_known_location?: string;
  last_known_location_updated_at?: string;
};

type Order = {
  id: string;
  rider_info: {
    name: string;
    phone: string;
    email: string;
  };
  booking_id: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  pickup_code: string;
  dropoff_code: string;
  recipient: string;
  amount: number;
  item: string;
  recipient_phone: string;
  delivery_note?: string;
  created_at: string;
  status:
    | "pending"
    | "confirmed"
    | "completed"
    | "in_transit"
    | "picked"
    | "cancelled";
  confirmed_at?: string;
  completed_at?: string;
  in_transit_at?: string;
  picked_at?: string;
  provider: "whatsapp" | "mobile_app" | "web_app";
  rider: string;
  user?: string;
};

type WHistory = {
  id: string;
  amount: number;
  transaction_id: string;
  transaction_type: "credit" | "debit";
  desc: string;
  status: "success" | "failed";
  created_at: string;
};

type Loan = {
  id: number;
  request_type: string;
  type_of_bike?: string;
  num_of_bike?: number;
  note?: string;
  amount?: number;
  status: "pending" | "approved" | "declined";
  created_at: string;
};
