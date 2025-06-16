import { ReactNode } from 'react';

export interface Country {
  area?: number;
  capital?: string;
  countryCallingCode?: string;
  emoji?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  name?: string;
  countryCode?: string;
}

export interface User {
  id?: number | null;
  roleId?: number | null;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  accountType?: string;
  businessName?: string;
  businessPhone?: string;
  gender?: string;
  emailVerifiedAt?: Date | null;
  accountStatus?: string;
  twoFa?: boolean;
  notificationSettings?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  lastLogin?: Date | null;
  refCode?: string;
  refBy?: string;
  marketingCommunications?: boolean;
  promotionalEmails?: boolean;
  shippingEmails?: boolean;
  howYouFoundUs?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  role?: string;
  Role?: {
    slug?: string;
  };
}


