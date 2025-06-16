import { QuotesResponse } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LegDetail } from './types';

interface PriceDetail {
  handlingFee: string;
  totalPrice: number;
  totalAmount: number;
}
interface QuoteState {
  quote: QuotesResponse | null;
  priceDetails: PriceDetail;
}

const initialState: QuoteState = {
  quote: null,
  priceDetails: {
    handlingFee: '0',
    totalPrice: 0,
    totalAmount: 0,
  },
};

const quoteDataSlice = createSlice({
  name: 'quoteData',
  initialState,
  reducers: {
    loadQuotes(state, action: PayloadAction<QuotesResponse>) {
      state.quote = action.payload;
    },
    setPriceDetails(state, action: PayloadAction<Partial<PriceDetail>>) {
      state.priceDetails = {
        ...state.priceDetails,
        ...action.payload,
      };
    },

    clearQuote(state) {
      state.quote = null;
    },
  },
});

export const { loadQuotes, setPriceDetails, clearQuote } = quoteDataSlice.actions;

export default quoteDataSlice.reducer;
