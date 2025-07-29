export interface ServiceResponse {
  success: boolean;
  data: Service[];
}

export interface Service {
  id: string;
  name: string;
  service_type: string;
  is_active: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  origin_name: string;
  origin_country: string;
  destination_name: string;
  destination_country: string;
  handling_fee: string;
  estimated_delivery_time: number;
  is_active: boolean;
  has_dependency: boolean;
  courier_handler: string;
  max_weight: string;
  min_weight: string;
  order_no: number;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteResponse {
  success: boolean;
  data: Route[];
}

export interface Courier {
  id: string;
  name: string;
  display_name: string;
  courier_dc_name: string;
  auth_company: string;
  pricing_rule: string;
  short_description: string;
  long_name: string;
  is_active: boolean;
  image_url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CouriersResponse {
  success: boolean;
  data: Courier[];
}

export interface CreateCourierPayload {
  name: string;
  display_name: string;
  courier_dc_name: string;
  auth_company: string;
  pricing_rule: string;
  short_description: string;
  long_name: string;
  is_active: boolean;
  image_path: string;
}

export interface Services {
  name: string;
  service_type: "air_freight" | "sea_freight" | "road_freight" | string; // extend as needed
  is_active: boolean;
}

export interface ServicesResponse {
  services: Services[];
}

export interface LegPayload {
  name: string;
  start_at: string;
  origin_country: string;
  end_at: string;
  destination_country: string;
  courier_handler: string;
  handling_fee: string;
  estimated_delivery_time: string;
  max_weight: number;
  min_weight: number;
  has_dependency: boolean;
  is_active: boolean;
  order_no: number;
}

export interface Leg {
  id: string;
  name: string;
  origin_name: string;
  origin_country: string;
  destination_name: string;
  destination_country: string;
  courier_handler: string;
  handling_fee: string;
  estimated_delivery_time: number;
  max_weight: string;
  min_weight: string;
  has_dependency: boolean;
  is_active: boolean;
  order_no: number;
  created_at: string;
}

export interface FullServicePayload {
  leg_ids: string[];
}

export interface ServiceLeg {
  id: string;
  Leg: Leg;
}

export interface LegService {
  id: string;
  name: string;
  service_type: string;
  is_active: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
  ServiceLegs: ServiceLeg[];
}
export interface ServiceLegResponse {
  success: boolean;
  data: LegService[];
}
