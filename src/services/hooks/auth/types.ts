interface User {
  id: string;
  role_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email: string;
  account_type: string;
  business_name?: string;
  business_phone?: string;
  gender: string;
  email_verified_at: string | null;
  account_status: string;
  two_fa: boolean;
  notification_settings: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  last_login: string;
  ref_code: string;
  ref_by?: string;
  marketing_communications: boolean;
  promotional_emails: boolean;
  shipping_emails: boolean;
  how_you_found_us?: string;
  createdAt: string;
  updatedAt: string;
  Role: {
    slug: string;
  };
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    data: any;
    success: boolean;
    message: any;
    slug: any;
    user: {
      id: string;
      role_id: string;
      first_name: string;
      last_name: string;
      middle_name: string | null;
      phone: string;
      email: string;
      account_type: string;
      business_name: string;
      business_phone: string;
      gender: string;
      password: string;
      password_expires_at: string | null;
      password_last_changed_at: string | null;
      password_login_attempt: number;
      password_lockout_duration: number;
      password_lockout_time: string | null;
      email_verified_at: string | null;
      account_status: "active" | "inactive" | "suspended" | "pending";
      two_fa: boolean;
      notification_settings: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      last_login: string | null;
      ref_code: string;
      ref_by: string | null;
      marketing_communications: boolean;
      promotional_emails: boolean;
      shipping_emails: boolean;
      how_you_found_us: string;
      createdAt: string;
      updatedAt: string;
      Role: {
        id: string;
        title: string;
        slug: string;
      };
    };
    token: string;
    refresh: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  data: {
    message: string;
    success: boolean;
    user: User;
    token: string;
    refresh: string;
  };
  success: boolean;
  message: string;
  status: number;
}

export type TgoogleAuthService = {
  payload: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  };
};

export type TfacebookAuthService = {
  payload: {
    name: string;
    email: string;
    picture: {
      data: {
        url: string;
      };
    };
    id: string;
    accessToken: string;
  };
};

export type TValidateTokenService = {
  payload: {
    token: string;
  };
};

export type TForgotService = {
  payload: {
    email?: string;
  };
};

export type TResetService = {
  payload: {
    newPassword?: string;
    confirmNewPassword?: string;
    otp?: number | null;
  };
};
export type T = {
  payload: {
    content: string;
    parentId: string;
  };
};

export interface CountryResponse {
  success: boolean;
  data: Country[];
}

export interface Country {
  name: string;
  alpha_2_code: string;
  has_postal: boolean;
  is_active: boolean;
}

export interface City {
  name: string;
  code: string;
  is_active: boolean;
}

export interface CityResponse {
  success: boolean;
  data: City[];
}

export interface QuotesResponse {
  status: number;
  success: boolean;
  data: {
    origin: Address;
    destination: Address;
    currency: string;
    parcels: Parcel[];
    options: ShippingOption[];
    summary: ShipmentSummary;
  };
}

interface Address {
  name: string;
  postcode: string;
  country_iso: string;
}

interface Parcel {
  description: string;
  items: Item[];
}

interface Item {
  description: string;
  sku: string;
  quantity: number;
  weight: number;
  unit_weight: string;
  weight_unit: string;
  hs_code: string;
}

interface ShippingOption {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  totalPrice: number;
  totalAmount: number;
  legDetails: LegDetail[];
  estimatedDeliveryTime: number;
  estimatedDeliveryDate: string;
  isExpress: boolean;
  requiresDropoff: boolean;
  routeType: string;
}

export interface LegDetail {
  from: string;
  to: string;
  price: number;
  amount: number;
  handlingFee: string;
  estimatedTime: number;
  courier: string;
  legId: string;
}

interface ShipmentSummary {
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
