import { existInWatchlist } from "@/utils/existInWatchList";
import * as types from "./ActionType";

const initialState = {
  id: null,
  user: null,
  coins: [],
  loading: false,
  error: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_WATCHLIST_REQUEST:
    case types.ADD_COIN_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_USER_WATCHLIST_SUCCESS:
    return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
        user: action.payload.user,
        coins: action.payload.coins || [],
    };


    case types.ADD_COIN_TO_WATCHLIST_SUCCESS:
      const updatedCoins = existInWatchlist(state.coins, action.payload)
        ? state.coins.filter((coin) => coin.id !== action.payload.id)
        : [action.payload, ...state.coins];

      return {
        ...state,
        coins: updatedCoins,
        loading: false,
        error: null,
      };

    case types.GET_USER_WATCHLIST_FAILURE:
    case types.ADD_COIN_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default watchlistReducer;
