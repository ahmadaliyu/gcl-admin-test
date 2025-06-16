export interface Address {
  id?: string;
  label: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  contact_email: string;
  post_code: string;
  contact_name: string;
  contact_phone: string;
  notes: string;
  is_default: boolean;
  is_sender_address: boolean;
}
