export type Address = {
  name: string;
  postcode: string;
  country_iso: string;
};

type Item = {
  description: string;
  sku: string;
  quantity: number;
  weight: number;
  unit_weight: string;
  weight_unit: string;
  hs_code: string;
};

type Parcel = {
  description: string;
  items: Item[];
};

export interface LegDetail {
  from: string;
  to: string;
  price: number;
  amount: number;
  handlingFee: string;
  estimatedTime: number;
  courier: string;
}

export interface ShippingOption {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  totalPrice: number;
  totalAmount: number;
  legDetails: LegDetail[];
  estimatedDeliveryTime: number;
  estimatedDeliveryDate: string; // ISO date string
  isExpress: boolean;
  requiresDropoff: boolean;
  routeType: string;
}

export interface ShipmentState {
  shipment: {
    ship_from: Address;
    ship_to: Address;
    parcels: Parcel[];
    despatch_date: any;
  };
}

interface QuoteResponse {
  success: boolean;
  data: QuoteData;
}

interface QuoteData {
  origin: LocationInfo;
  destination: LocationInfo;
  currency: string;
  parcels: Parcel[];
  options: ShippingOption[];
  summary: QuoteSummary;
}

interface LocationInfo {
  name: string;
  postcode: string;
  country_iso: string;
}

export interface ParcelItem {
  description: string;
  sku: string;
  quantity: number;
  weight: number;
  unit_weight: string;
  weight_unit: string;
  hs_code: string;
}

export interface QuoteSummary {
  isDomestic: boolean;
  isInternational: boolean;
  isPickupRequired: boolean;
  isDropoffToOffice: boolean;
  isFromUKOffice: boolean;
  isToNigeriaOffice: boolean;
  isFromNigeriaOffice: boolean;
  isToUKOffice: boolean;
  totalOptions: number;
}
