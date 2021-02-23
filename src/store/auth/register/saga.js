import { takeEvery, fork,  all} from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER_USER } from './actionTypes';
import {webUrl} from "../../../config";

const url = webUrl + '/v1/api/admin/users/register';


function* registerUser({ payload: { user } }) {
    axios.post(url, user)
        .then(response => {
            if (response.data['success'] === false)
                return response.data;
            throw response.data;
        })
        .catch((err) => {
            let message;
            if (err.response && err.response.status ) {
                switch (err.response.status) {
                    case 404: message = "Sorry! the page you are looking for could not be found"; break;
                    case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                    case 401: message = "Invalid credentials"; break;
                    default: message = err[1]; break;
                }
            }
            throw message;
        });
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;