import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    SERVER_URL,
    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED,
    LOGOUT
} from "./Consts";
import axios from "axios";

export const checkAuthenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        try{
            const res = await axios.post( `${SERVER_URL}/auth/jwt/verify/`, {
                token: localStorage.getItem('access')
            })

            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type: USER_AUTHENTICATED_SUCCESS
                })
            }else{
                dispatch({
                    type:USER_AUTHENTICATED_FAILED
                })
            }

            } catch(err) {
            dispatch({
                type:USER_AUTHENTICATED_FAILED
            })
        }
    }else {
        dispatch({
            type: USER_AUTHENTICATED_FAILED
        })
    }
}

export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        try{
            const res1 = await axios.get( `${SERVER_URL}/auth/users/me/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            })
            var res2 = {data:null}
            if(res1.data.is_renter)
                res2 = await axios.get( `${SERVER_URL}/get_renter/${res1.data.id}`)
            else if(res1.data.is_user)
                res2 = await axios.get( `${SERVER_URL}/get_user/${res1.data.id}`)

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: {...res1.data, ...res2.data}
            })
        } catch(err){
            dispatch({
                type: USER_LOADED_FAILED
            })
        }
    }else {
        dispatch({
            type: USER_LOADED_FAILED
        })
    }
};

export const login = (email, password, is_admin, is_user, is_renter, handleError) => async dispatch => {
    try{
        const res1 = await axios.post( `${SERVER_URL}/auth/jwt/create/`, {
            email:email,
            password:password,
        })

        const res2 = await axios.get( `${SERVER_URL}/auth/users/me/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${res1.data.access}`,
                'Accept': 'application/json'
            }
        })

        if((res2.data.is_user === true && is_user === true) || (res2.data.is_renter === true && is_renter === true) || (res2.data.is_admin === true && is_admin === true)
        ){
            console.log(is_admin, res2.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res1.data
            })
            dispatch(load_user())
        }
        else
            dispatch({
                type: LOGIN_FAIL
            })

    } catch(err){
        console.log(err.response.data)
        handleError(err.response.data)
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const register = (email, password, is_admin, is_user, is_renter, DATA) => async dispatch => {
    try{
        const res1 = await axios.post( `${SERVER_URL}/auth/users/`, {
            email:email,
            password:password,
            is_user:is_user,
            is_renter:is_renter,
            is_admin: is_admin,
            city: DATA.city
        })
        if(is_renter){
            const encodedName = encodeURIComponent(DATA.name)
            const res2 = await axios.post(`${SERVER_URL}/add_renter/`, {
                ...DATA,
                name:encodedName,
                id: res1.data.id

            })
        }else if(is_user) {
            const res2 = await axios.post(`${SERVER_URL}/add_user/`, {
                ...DATA,
                first_name:encodeURIComponent(DATA.first_name),
                last_name:encodeURIComponent(DATA.last_name),
                id: res1.data.id
            })
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res1.data
        })
    } catch(err){
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const verify = (uid, token) => async dispatch =>{
    try{
        const res = await axios.post( `${SERVER_URL}/auth/users/activation/`, {
            uid:uid,
            token:token
        })
        dispatch({
            type: ACTIVATION_SUCCESS
        })

    } catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    try{
        await axios.post( `${SERVER_URL}/auth/users/reset_password/`, {
            email:email
        })
        dispatch({
            type:PASSWORD_RESET_SUCCESS
        })

    }catch(err){
        dispatch({
            type:PASSWORD_RESET_FAILED
        })
    }
}

export const reset_password_confirm = (uid, token, new_password) => async dispatch => {
    try{
        await axios.post( `${SERVER_URL}/auth/users/reset_password_confirm/`, {
            uid:uid,
            token:token,
            new_password:new_password
        })
        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        })
    }catch(err){
        dispatch({
            type:PASSWORD_RESET_CONFIRM_FAILED
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}