import axios from "axios"
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGOUT,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "./ActionType"

import api from "@/config/api"

const baseUrl = "https://nexax.up.railway.app"

// ✅ REGISTER
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST })
  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userData)
    const user = response.data
    console.log(user)

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt })
    localStorage.setItem("jwt", user.jwt)
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message })
    console.log(error)
  }
}

// ✅ LOGIN
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, userData.data)
    const user = response.data
    console.log(user)

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt })
    localStorage.setItem("jwt", user.jwt)

    if (user.user?.role === "ROLE_ADMIN") {
      userData.navigate("/admin/withdrawals")
    } else {
      userData.navigate("/")
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message })
    console.log(error)
  }
}

// ✅ GET USER PROFILE
export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const response = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    const user = response.data
    console.log(user)
    dispatch({ type: GET_USER_SUCCESS, payload: user })
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message })
    console.log(error)
  }
}

// ✅ LOGOUT
export const logout = () => (dispatch) => {
  localStorage.clear()
  dispatch({ type: LOGOUT })
}

// ✅ UPDATE PROFILE
export const updateUserProfile = ({ jwt, data }) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST })
  try {
    const response = await api.put(`/api/users/update`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    console.log("Profile Updated ---", response.data)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data })
  } catch (error) {
    console.log(error)
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message })
  }
}

// ✅ TWO-FACTOR AUTH APIs (safe for later)
export const sendTwoFactorOtp = (jwt) => async () => {
  await api.post("/api/users/2fa/send-otp", null, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
}

export const verifyTwoFactorOtp = (jwt, otp) => async () => {
  await api.post(`/api/users/2fa/verify-otp?otp=${otp}`, null, {
    headers: { Authorization: `Bearer ${jwt}` },
  })
}
