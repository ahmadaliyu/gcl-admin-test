interface BookingLabel {
  id: string;
  booking_id: string;
  label: null;
  key: string;
  status: string;
  uri: string;
  type: string;
  courier: string;
  tracking_codes: string[];
  tracking_urls: string[];
  tracking_request_id: string;
  tracking_request_hash: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingTracker {}

export interface BookingData {
  id: string;
  user_id: string;
  service_id: string;
  sender_address_id: string;
  recipient_address_id: string;
  code: string;
  product_book: string;
  product_code: string;
  product_type: string;
  product_details: string;
  product_weight: string;
  product_value: string;
  product_qty: string;
  origin: string;
  origin_postcode: string;
  destination: string;
  destination_postcode: string;
  is_insured: boolean;
  has_protection: boolean;
  is_sign_required: boolean;
  print_type: string;
  amount: number;
  parcel: string;
  status: string;
  comment: null;
  createdAt: string;
  updatedAt: string;
  BookingLabels: BookingLabel[];
  BookingTrackers: BookingTracker[];
}

export interface BookingByIdResponse {
  success: boolean;
  data: BookingData;
}

interface ParcelItem {
  description: string;
  sku: string;
  quantity: number;
  weight: number;
  unit_weight: string;
  weight_unit: string;
  hs_code: string;
}

interface Parcel {
  description: string;
  items: ParcelItem[];
}

interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  sender_address_id: string;
  recipient_address_id: string;
  code: string;
  product_book: string;
  product_code: string;
  product_type: string;
  product_details: string;
  product_weight: string;
  product_value: string;
  product_qty: string;
  origin: string;
  origin_postcode: string;
  destination: string;
  destination_postcode: string;
  is_insured: boolean;
  has_protection: boolean;
  is_sign_required: boolean;
  print_type: string;
  amount: number;
  parcel: string | Parcel[]; // Can be string or parsed Parcel array
  status: string;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Orders {
  bookings: Booking[];
}

export interface OrdersResponse {
  success: boolean;
  data: Orders;
}
