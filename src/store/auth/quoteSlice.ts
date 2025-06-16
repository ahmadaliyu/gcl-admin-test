import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, ShipmentState } from './types';

interface DeleteItemPayload {
  parcelIndex: number;
  itemIndex: number;
}

const initialState: ShipmentState = {
  shipment: {
    ship_from: {
      name: '',
      postcode: '',
      country_iso: '',
    },
    ship_to: {
      name: '',
      postcode: '',
      country_iso: '',
    },
    parcels: [
      {
        description: '',
        items: [
          {
            description: '',
            sku: '',
            quantity: 1,
            weight: 1,
            unit_weight: '1',
            weight_unit: 'kg',
            hs_code: '',
          },
        ],
      },
    ],
    despatch_date: new Date().toISOString(), // ✅ Store as ISO string
  },
};

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    updateShipFrom: (state, action: PayloadAction<Partial<Address>>) => {
      state.shipment.ship_from = { ...state.shipment.ship_from, ...action.payload };
    },
    updateShipTo: (state, action: PayloadAction<Partial<Address>>) => {
      state.shipment.ship_to = { ...state.shipment.ship_to, ...action.payload };
    },
    updateDespatchDate: (state, action: PayloadAction<string>) => {
      state.shipment.despatch_date = action.payload; // ✅ Expect ISO string
    },
    addOrUpdateItemInParcel: (state, action) => {
      const { parcelIndex, itemIndex, item, description } = action.payload;

      if (!state.shipment.parcels[parcelIndex]) return;

      const parcel = state.shipment.parcels[parcelIndex];

      if (!parcel.items) {
        parcel.items = [];
      }

      if (parcel.items[itemIndex]) {
        // Update existing item
        parcel.items[itemIndex] = { ...parcel.items[itemIndex], ...item };
      } else {
        // Add new item
        parcel.items.push(item);
      }

      if (description) {
        parcel.description = description;
      }
    },

    deleteItemInParcel: (state, action: PayloadAction<DeleteItemPayload>) => {
      const { parcelIndex, itemIndex } = action.payload;

      if (state.shipment.parcels[parcelIndex]) {
        const items = state.shipment.parcels[parcelIndex].items;

        if (items && itemIndex >= 0 && itemIndex < items.length) {
          // Remove the item at itemIndex
          items.splice(itemIndex, 1);

          // Optional: If you want to ensure at least one default item remains, you could do:
          if (items.length === 0) {
            items.push({
              description: '',
              sku: '',
              quantity: 1,
              weight: 1,
              unit_weight: '1',
              weight_unit: 'kg',
              hs_code: '',
            });
          }
        }
      }
    },

    clearQuotesData: (state) => {
      return initialState;
    },
  },
});

export const {
  updateShipFrom,
  updateShipTo,
  updateDespatchDate,
  addOrUpdateItemInParcel,
  clearQuotesData,
  deleteItemInParcel,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;
