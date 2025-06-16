// addressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from './types';

const initialState: Address = {
  id: '',
  label: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  country: '',
  contact_email: '',
  post_code: '',
  contact_name: '',
  contact_phone: '',
  notes: '',
  is_default: false,
  is_sender_address: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddress(state, action: PayloadAction<Address>) {
      return { ...state, ...action.payload };
    },
    resetAddress() {
      return initialState;
    },
  },
});

export const { saveAddress, resetAddress } = addressSlice.actions;
export default addressSlice.reducer;
