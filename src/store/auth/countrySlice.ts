import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Country {
    emoji: any;
    countryCode: any;
    name: string;
    alpha_2_code: string;
    has_postal: boolean;
    is_active: boolean;
}

interface City {
    name: string;
    code: string;
    is_active: boolean;
}

interface CountryState {
    countries: Country[];
    cities: City[];
}

interface City {
    name: string;
    code: string;
    is_active: boolean;
}

const initialState: CountryState = {
    countries: [],
    cities: [],
};


const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries: (state, action: PayloadAction<Country[]>) => {
            state.countries = action.payload;
        },
        setCities: (state, action: PayloadAction<City[]>) => {
            state.cities = action.payload;
        },

        resetCountry: () => {
            return initialState;
        },

    },
});

export const {
    setCountries,
    setCities,
    resetCountry
} = countrySlice.actions;

export const selectAllCountries = (state: { country: CountryState }) => state.country.countries;
export const selectAllCities = (state: { country: CountryState }) => state.country.cities;

export default countrySlice.reducer;