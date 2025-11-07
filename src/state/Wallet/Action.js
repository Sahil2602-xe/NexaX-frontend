import api, { API_BASE_URL } from "@/config/api";
import * as types from "./ActionType";

// ✅ 1️⃣ Get User Wallet
export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get(`/api/wallet`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: types.GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });

    console.log("User Wallet:", response.data);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    dispatch({
      type: types.GET_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

// ✅ 2️⃣ Get Wallet Transactions
export const getWalletTransactions = ({ jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_WALLET_TRANSACTION_REQUEST });

  try {
    const response = await api.get(`/api/transactions`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: types.GET_WALLET_TRANSACTION_SUCCESS,
      payload: response.data,
    });

    console.log("Wallet Transactions:", response.data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    dispatch({
      type: types.GET_WALLET_TRANSACTION_FAILURE,
      error: error.message,
    });
  }
};

// ✅ 3️⃣ Deposit Money
export const depositMoney = ({ jwt, orderId, paymentId, navigate }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.put(
      `/api/wallet/deposit`,
      null,
      {
        params: {
          order_id: orderId,
          payment_id: paymentId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: types.DEPOSIT_MONEY_SUCCESS,
      payload: response.data,
    });

    console.log("Deposit Response:", response.data);
    navigate("/wallet");
  } catch (error) {
    console.error("Deposit Error:", error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// ✅ 4️⃣ Payment Handler
export const paymentHandler = ({ jwt, amount, paymentMethod }) => async (dispatch) => {
  dispatch({ type: types.DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.post(
      `/api/payment/${paymentMethod}/amount/${amount}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    // ✅ Redirect user to payment gateway
    window.location.href = response.data.payment_url;
  } catch (error) {
    console.error("Payment Error:", error);
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// ✅ 5️⃣ Transfer Money Between Wallets
export const transferMoney = ({ jwt, walletId, reqData }) => async (dispatch) => {
  dispatch({ type: types.TRANSFER_MONEY_REQUEST });

  try {
    const response = await api.put(
      `/api/wallet/${walletId}/transfer`,
      reqData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({
      type: types.TRANSFER_MONEY_SUCCESS,
      payload: response.data,
    });

    console.log("Money Transferred:", response.data);
  } catch (error) {
    console.error("Transfer Error:", error);
    dispatch({
      type: types.TRANSFER_MONEY_FAILURE,
      error: error.message,
    });
  }
};
