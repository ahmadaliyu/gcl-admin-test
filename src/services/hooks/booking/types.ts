import { LegDetail } from "../auth";

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

export interface BookingItem {
  id: string;
  booking_id: string;
  group_id: string;
  description: string;
  hs_code: string;
  sku: string;
  quantity: number;
  unit_weight: string;
  weight: string;
  weight_unit: string;
  actual_quantity: number | null;
  actual_unit_weight: string | null;
  actual_weight: string | null;
  comment: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingTracker {
  id: string;
  booking_id: string;
  status: string;
  slug: string;
  comment: string | null;
  action: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface BookingData {
  id(id: any): unknown;
  code: string;
  status: string;
  createdAt: string | number | Date;
  booking: {
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
    leg_details: LegDetail[];
    recipientAddress: {
      id: string;
      user_id: string;
      label: string;
      contact_name: string;
      contact_email: string;
      contact_phone: string;
      address_line_1: string;
      address_line_2?: string;
      city: string;
      state?: string;
      post_code: string;
      country: string;
      country_iso: string;
      address_type?: string;
      drivers_note?: string;
      is_default: boolean;
      is_sender_address: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    senderAddress: {
      id: string;
      user_id: string;
      label: string;
      contact_name: string;
      contact_email: string;
      contact_phone: string;
      address_line_1: string;
      address_line_2?: string;
      city: string;
      state?: string;
      post_code: string;
      country: string;
      country_iso: string;
      address_type?: string;
      drivers_note?: string;
      is_default: boolean;
      is_sender_address: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    BookingItems: BookingItem[];
    BookingLabels: BookingLabel[];
    BookingTrackers: BookingTracker[];
  };
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
  // bookings: Booking[];
  bookings: BookingData[];
}

export interface OrdersResponse {
  success: boolean;
  data: Orders;
}
