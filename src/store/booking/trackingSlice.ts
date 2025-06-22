// redux/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingItem {
  actualValue: string;
  status?: "mismatch" | "completed" | null;
}

interface BookingState {
  items: BookingItem[];
}

const initialState: BookingState = {
  items: [
    { actualValue: "", status: null },
    { actualValue: "", status: null },
  ],
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    updateActualValue: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      const { index, value } = action.payload;
      if (state.items[index]) {
        state.items[index].actualValue = value;
      }
    },
    setItemStatus: (
      state,
      action: PayloadAction<{ index: number; status: "mismatch" | "completed" }>
    ) => {
      const { index, status } = action.payload;
      if (state.items[index]) {
        state.items[index].status = status;
      }
    },
  },
});

export const { updateActualValue, setItemStatus } = trackingSlice.actions;
export default trackingSlice.reducer;
