export interface AddressFormData {
  type?: string;
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
  drivers_note?: string;
  is_default: boolean;
  country_iso: string;
}

export interface ImportData {
  id: string;
  user_id: string;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  no_of_items: number;
  address: string;
  description: string;
  status: string;
  meta: any | null;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportResponse {
  success: boolean;
  data: ImportData[];
}
