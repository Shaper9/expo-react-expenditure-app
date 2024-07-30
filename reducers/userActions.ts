import { LOGIN , CHANGE_NAME ,LOGOUT, GET_USER_BOOKS } from "./types"
import { Dispatch } from "redux"


export const loginAction = () => {
    return {
        type: LOGIN,
        payload: true
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT,
        payload: false
    }
}

export const changeNameAction = (userName: string) => {
    return {
        type: CHANGE_NAME,
        payload: userName
    }
}


export const getUsersBooks = () => {
  return async (dispatch : Dispatch) => {
    try {
        const data=['marko']

      dispatch({
        type: GET_USER_BOOKS,
        payload: data
      })

    } catch (error) {
      console.log(error);
    }
  };
};