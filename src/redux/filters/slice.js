import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    name: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState.filters,
  selectors: { selectNameFilter: (state) => state.name },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;
