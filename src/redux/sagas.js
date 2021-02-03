import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as config from '../config/config';

export function* getBeersSaga(action) {
    const payload = action.payload;
    const URL = buildFetchBeersUrl(payload);
    try {
        const result = yield call(getBeers, URL);
        yield put(actions.getBeersSuccess(result));
    } catch (e) {
        yield put(actions.getBeersFailure("Error: " + e));
    }
}

function buildFetchBeersUrl(options) {
    let URL = config.API_ROOT + 'per_page=' + config.ITEMS_PER_PAGE + '&page=' + options.pageNumber;

    if (options.searchValue !== "") {
        URL += '&food=' + options.searchValue;
    }

    return URL;
}

const getBeers = async (URL) => {
    return await fetch(URL)
        .then(
            (res) => {
                return res.json();
            },
            (error) => {
                throw error;
            }
        );
}

const beersSagas = [
    takeLatest(actions.getBeersRequest.toString(), getBeersSaga)
];

export default function* rootSaga() {
    yield all([...beersSagas]);
}
