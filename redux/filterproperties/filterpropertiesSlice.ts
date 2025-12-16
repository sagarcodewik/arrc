import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRange {
  min: number;
  max: number;
}

interface PropertyFilterState {
  propertyType: string;
  address: string,
  bedrooms: number | null;
  bathrooms: number | null;
  // builtInYear: number | null;
  garages: number | null | undefined;
  priceRange: PriceRange;
}

const initialState: PropertyFilterState = {
  propertyType: "",
  address: "",
  bedrooms: null,
  bathrooms: null,
  garages: null,
  // builtInYear: null,
  priceRange: {
    min: 0,
    max: 0,
  },
};

const propertyFilterSlice = createSlice({
  name: "propertyFilter",
  initialState,
  reducers: {
    setPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setBedrooms: (state, action: PayloadAction<number | null>) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action: PayloadAction<number | null>) => {
      state.bathrooms = action.payload;
    },
    // setBuiltInYear: (state, action: PayloadAction<number | null>) => {
    //   state.builtInYear = action.payload;
    // },
    setGarages: (state, action: PayloadAction<number | null>) => {
      state.garages = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPropertyType,
  setBedrooms,
  setAddress,
  setBathrooms,
  // setBuiltInYear,
  setGarages,
  setPriceRange,
  resetFilters,
} = propertyFilterSlice.actions;

export default propertyFilterSlice.reducer;
