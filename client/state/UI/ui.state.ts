export interface UIState {
  isLoginVisible: boolean,
  isRegisterVisible: boolean,
  isPasswordRecoverVisible: boolean,
  isResetPasswordVisible: boolean,
  emailForRecover: string,
  toast: {
    message: string,
    type: string,
    visible: boolean
  },
}

