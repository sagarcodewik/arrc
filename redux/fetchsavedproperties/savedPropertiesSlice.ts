
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SavedPropertiesState {
  savedPropertyIds: number[]; 
}

const initialState: SavedPropertiesState = {
  savedPropertyIds: [],
};

const savedPropertiesSlice = createSlice({
  name: 'savedProperties',
  initialState,
  reducers: {
    setSavedPropertyIds: (state, action: PayloadAction<number[]>) => {
      state.savedPropertyIds = action.payload;
    },
    addSavedProperty: (state, action: PayloadAction<number>) => {
      if (!state.savedPropertyIds.includes(action.payload)) {
        state.savedPropertyIds.push(action.payload);
      }
    },
    removeSavedProperty: (state, action: PayloadAction<number>) => {
      state.savedPropertyIds = state.savedPropertyIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setSavedPropertyIds,
  addSavedProperty,
  removeSavedProperty,
} = savedPropertiesSlice.actions;

export default savedPropertiesSlice.reducer;
