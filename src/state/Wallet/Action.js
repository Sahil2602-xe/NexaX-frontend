import api from "@/config/api";
import * as types from "./ActionType";
import { toast } from "@/hooks/use-toast";

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

    console.log("✅ User Wallet:", response.data);
  } catch (error) {
    console.error("❌ Error fetching wallet:", error);
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

    console.log("📜 Wallet Transactions:", response.data);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
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

    toast({
      title: "Deposit Successful 🎉",
      description: "Your wallet has been updated successfully.",
    });

    console.log("💰 Deposit Response:", response.data);

    // ✅ Navigate safely after wallet update
    setTimeout(() => navigate("/wallet"), 1200);

  } catch (error) {
    console.error("❌ Deposit Error:", error);
    toast({
      title: "Deposit Failed ❌",
      description: "There was a problem updating your wallet balance.",
      variant: "destructive",
    });
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

    // ✅ Redirect to payment gateway
    window.location.href = response.data.payment_url;

  } catch (error) {
    console.error("❌ Payment Error:", error);
    toast({
      title: "Payment Failed ❌",
      description: "Could not initiate payment. Please try again.",
      variant: "destructive",
    });
    dispatch({
      type: types.DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// ✅ 5️⃣ Transfer Money Between Wallets
export const transferMoney = ({ jwt, walletId, reqData }) => async (dispatch, getState) => {
  dispatch({ type: types.TRANSFER_MONEY_REQUEST });

  try {
    const { wallet } = getState();
    const userWallet = wallet?.userWallet;

    // ✅ Validation before transfer
    if (!reqData.amount || reqData.amount <= 0) {
      toast({
        title: "Invalid Amount ⚠️",
        description: "Please enter a valid amount to transfer.",
        variant: "destructive",
      });
      return;
    }

    if (walletId === userWallet?.id) {
      toast({
        title: "Invalid Transfer ❌",
        description: "You cannot transfer to your own wallet.",
        variant: "destructive",
      });
      return;
    }

    if (reqData.amount > userWallet?.balance) {
      toast({
        title: "Insufficient Balance 💸",
        description: "You don’t have enough funds to make this transfer.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Proceed with transfer
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

    toast({
      title: "Transfer Successful ✅",
      description: `You sent $${reqData.amount} successfully.`,
    });

    console.log("📤 Money Transferred:", response.data);

  } catch (error) {
    console.error("❌ Transfer Error:", error);
    toast({
      title: "Transfer Failed ❌",
      description: "Unable to complete the transfer. Please check details.",
      variant: "destructive",
    });
    dispatch({
      type: types.TRANSFER_MONEY_FAILURE,
      error: error.message,
    });
  }
};
