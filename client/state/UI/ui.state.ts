export interface UIState {
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  isPasswordRecoverVisible: boolean;
  isResetPasswordVisible: boolean;
  emailForRecover: string;
  isUnderConstruction: boolean;
  loading: boolean;
  error: string | null;
}
