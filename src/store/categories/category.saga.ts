import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils';

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './category.reducer';


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(
        'categories/fetchCategoriesStart',
        fetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}