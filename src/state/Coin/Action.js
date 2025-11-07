import api, { API_BASE_URL } from "@/config/api";
import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COIN_LIST_FAILURE,
  FETCH_TOP_50_COIN_LIST_REQUEST,
  FETCH_TOP_50_COIN_LIST_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS
} from "./ActionTypes";
import axios from "axios";

// 🔹 Fetch all coins (paginated)
export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins?page=${page}`);
    console.log("Coin list:", data);
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching coin list:", error);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
  }
};

// 🔹 Fetch top 50 coins
export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COIN_LIST_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/coins/top50`);
    console.log("Top 50 coins:", response.data);
    dispatch({ type: FETCH_TOP_50_COIN_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching top 50 coins:", error);
    dispatch({ type: FETCH_TOP_50_COIN_LIST_FAILURE, payload: error.message });
  }
};

// 🔹 Fetch market chart (if protected, keep JWT)
export const fetchMarketChart = ({ coinId, days, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const response = await api.get(`/coins/${coinId}/chart?days=${days}`, {
      headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
    });
    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching market chart:", error);
    dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
  }
};

// 🔹 Fetch coin by ID
export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
    console.log("Coin by ID:", response.data);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching coin by ID:", error);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
  }
};

// 🔹 Fetch detailed coin data
export const fetchCoinDetails = ({ coinId }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/coins/details/${coinId}`);
    console.log("Coin details:", response.data);
    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching coin details:", error);
    dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
  }
};

// 🔹 Search coins
export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/coins/search?q=${keyword}`);
    console.log("Coin search:", response.data);
    dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error searching coin:", error);
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
  }
};
