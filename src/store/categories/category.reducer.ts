import { createSlice } from '@reduxjs/toolkit';

import { Category } from './category.types';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        fetchCategoriesStart(state) {
            state.isLoading = true;
        },
        fetchCategoriesSuccess(state, action) {
            state.categories = action.payload;
            state.isLoading = false;
        },
        fetchCategoriesFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;