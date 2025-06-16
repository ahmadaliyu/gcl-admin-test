export interface Address {
  label: string;
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  post_code: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  drivers_note: string;
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
  items: ParcelItem[];
}

export interface BookingState {
  service_id: string;
  sender_address: Address;
  recipient_address: Address;
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
  parcel: Parcel[];
}

export type BookingFieldPayload = {
  field: string;
  value: any;
};

export type ParcelItemFieldPayload = {
  parcelIndex: number;
  itemIndex: number;
  field: keyof ParcelItem;
  value: any;
};
