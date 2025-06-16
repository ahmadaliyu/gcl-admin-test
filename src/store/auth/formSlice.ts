import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FormState {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  email: string;
  account_type: 'personal' | 'business';
  business_name: string;
  business_phone: string;
  gender: string;
  password: string;
  confirmPassword: string;
  ref_by: string;
  marketing_communications: boolean;
  promotional_emails: boolean;
  shipping_emails: boolean;
  how_you_found_us: string;
  // billing details
  country: string;
  address_line_1: string;
  address_line_2: string;
  state: string;
  city: string;
  post_code: string;
  eori_number: string;
  is_residential: boolean;
  is_vat_registered: boolean;
  temp_credentials?: {
    email?: string;
    password?: string;
  };
  selectedCountry?: {
    name: string;
    code: string;
    dial_code: string;
  };
}

const initialState: FormState = {
  first_name: '',
  last_name: '',
  middle_name: '',
  phone: '',
  email: '',
  account_type: 'personal',
  business_name: '',
  business_phone: '',
  gender: '',
  password: '',
  confirmPassword: '',
  ref_by: '',
  marketing_communications: false,
  promotional_emails: false,
  shipping_emails: false,
  how_you_found_us: '',
  country: '',
  address_line_1: '',
  address_line_2: '',
  state: '',
  city: '',
  post_code: '',
  eori_number: '',
  is_residential: true,
  is_vat_registered: false,
  selectedCountry: undefined,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: <K extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ field: K; value: FormState[K] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    setSelectedCountry: (state, action: PayloadAction<{ name: string; code: string; dial_code: string }>) => {
      state.selectedCountry = {
        name: action.payload.name,
        code: action.payload.code,
        dial_code: action.payload.dial_code,
      }
    },
    setTempCredentials: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.temp_credentials = {
        email: action.payload.email,
        password: action.payload.password,
      };
    },
    clearTempCredentials: (state) => {
      state.temp_credentials = undefined;
    },
  },
});

export const { updateField, resetForm, setFormData, setTempCredentials, clearTempCredentials, setSelectedCountry } = formSlice.actions;
// export const selectForm = (state: RootState) => state.form;
export const selectForm = (state: RootState) => {
  const { _persist, ...formState } = (state.form as any);
  return formState as FormState;
};

export const selectTempCredentials = (state: RootState) => state.form.temp_credentials;
export const selectEmail = (state: RootState) => state.form.email || state.form.temp_credentials?.email;

export default formSlice.reducer;
