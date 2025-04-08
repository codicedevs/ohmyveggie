import { Dispatch } from "redux";

import { proshopAPI } from "../../lib";
import { ActionTypes } from "./ui.action-types";
import { UIAction } from "./ui.actions";

export const toggleUnderConstruction = () => {
  return async (dispatch: Dispatch<UIAction>, getState: any) => {
    dispatch({ type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION_REQUEST });

    try {
      const { data } = await proshopAPI.post("/toggle-under-construction", {});
      if (!data) {
        dispatch({
          type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION_FAILURE,
          payload: data.message,
        });
        throw new Error("Error en el servidor");
      }

      dispatch({
        type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION_SUCCESS,
        payload: data,
      });
      console.log(data, "data");
    } catch (err: any) {
      dispatch({
        type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const getUnderConstruction = () => {
  return async (dispatch: Dispatch<UIAction>, getState: any) => {
    try {
      const { data } = await proshopAPI.get("/is-under-construction");

      dispatch({
        type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION,
        payload: data.status,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.TOGGLE_UNDER_CONSTRUCTION_FAILURE,
        payload: err.message,
      });
    }
  };
};
