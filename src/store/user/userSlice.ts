import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    id: null,
    roleId: null,
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    accountType: '',
    businessName: '',
    businessPhone: '',
    gender: '',
    emailVerifiedAt: null,
    accountStatus: '',
    twoFa: false,
    notificationSettings: {
        email: false,
        sms: false,
        push: false,
    },
    lastLogin: null,
    refCode: '',
    refBy: '',
    marketingCommunications: false,
    promotionalEmails: false,
    shippingEmails: false,
    howYouFoundUs: '',
    createdAt: null,
    updatedAt: null,
    role: '',
    Role: {
        slug: ""
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userData = action.payload;
            state.id = userData.id;
            state.roleId = userData.role_id;
            state.firstName = userData.first_name;
            state.lastName = userData.last_name;
            state.middleName = userData.middle_name;
            state.phone = userData.phone;
            state.email = userData.email;
            state.accountType = userData.account_type;
            state.businessName = userData.business_name;
            state.businessPhone = userData.business_phone;
            state.gender = userData.gender;
            state.emailVerifiedAt = userData.email_verified_at;
            state.accountStatus = userData.account_status;
            state.twoFa = userData.two_fa;
            state.notificationSettings = userData.notification_settings;
            state.lastLogin = userData.last_login;
            state.refCode = userData.ref_code;
            state.refBy = userData.ref_by;
            state.marketingCommunications = userData.marketing_communications;
            state.promotionalEmails = userData.promotional_emails;
            state.shippingEmails = userData.shipping_emails;
            state.howYouFoundUs = userData.how_you_found_us;
            state.createdAt = userData.createdAt;
            state.updatedAt = userData.updatedAt;
            state.role = userData.Role?.slug || '';
            state.Role = {
                slug: userData.Role?.slug || '',
            };
        },
        resetUser: (state) => {
            return initialState;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: any) => state.user;