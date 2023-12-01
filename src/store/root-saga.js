import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories';
import { userSagas } from './user';

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}