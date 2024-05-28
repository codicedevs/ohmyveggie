import { UIInterface } from '../../interfaces';
import { ActionTypes } from './ui.action-types';

export type UIAction =
    ToggleLogin
    | ToggleRegister
    | CloseRegister
    | OpenRegister
    | CloseLogin
    | OpenLogin
    | TogglePasswordRecover
    | OpenPasswordRecover
    | ClosePasswordRecover
    | OpenResetPassword
    | CloseResetPassword
    | EmailUpdateRecover
    | OpenToast
    | CloseToast
    ;


export interface ToggleLogin {
    type: ActionTypes.TOGGLE_LOGIN;
}

export interface OpenLogin {
    type: ActionTypes.OPEN_LOGIN;   
}

export interface CloseLogin {
    type: ActionTypes.CLOSE_LOGIN;   
}

export interface ToggleRegister {
    type: ActionTypes.TOGGLE_REGISTER;
}

export interface OpenRegister {
    type: ActionTypes.OPEN_REGISTER;
}

export interface CloseRegister {
    type: ActionTypes.CLOSE_REGISTER;
}

export interface TogglePasswordRecover {
    type: ActionTypes.TOGGLE_PASSWORD_RECOVER;
}

export interface OpenPasswordRecover {
    type: ActionTypes.OPEN_PASSWORD_RECOVER;
}

export interface ClosePasswordRecover {
    type: ActionTypes.CLOSE_PASSWORD_RECOVER;
}
export interface OpenResetPassword {
    type: ActionTypes.OPEN_RESET_PASSWORD;
}

export interface CloseResetPassword {
    type: ActionTypes.CLOSE_RESET_PASSWORD;
}

export interface EmailUpdateRecover {
    type: ActionTypes.EMAIL_UPDATE_RECOVER;
    payload: string  
}


