import Router from "next/router";
import { Dispatch } from "redux";
import { ActionTypes as AT } from "../UI/ui.action-types";
import { useEffect } from "react";


export const showToast =
  (message: string, type: string) =>
  async (dispatch: Dispatch<any>) => {
    
      dispatch({
        type: AT.OPEN_TOAST, payload: {message, type}
        
      })          
      setTimeout(() => {
      dispatch({ type: AT.CLOSE_TOAST });
          }, 5000);
    
  };