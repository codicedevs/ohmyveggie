import { ActionTypes } from './ui.action-types';
import { UIAction } from './ui.actions';
import { uIInitialState } from './ui.initial-state';
import { UIState } from './ui.state';

console.log(uIInitialState);

export const uIReducer = (
  state: UIState = uIInitialState,
  action: UIAction
): UIState => {
  switch (action.type) {

    case ActionTypes.TOGGLE_LOGIN:
      return {...state, isLoginVisible: !state.isLoginVisible }

    case ActionTypes.OPEN_LOGIN:
      return {...state, isLoginVisible: true }
        
    case ActionTypes.CLOSE_LOGIN:
      return {...state, isLoginVisible: false }      

    case ActionTypes.TOGGLE_REGISTER:
      return {...state, isRegisterVisible: !state.isRegisterVisible }
      
    case ActionTypes.OPEN_REGISTER:
      return {...state, isRegisterVisible: true }
      
    case ActionTypes.CLOSE_REGISTER:
      return {...state, isRegisterVisible: false}
      
    case ActionTypes.TOGGLE_PASSWORD_RECOVER:
      return {...state, isPasswordRecoverVisible: !state.isPasswordRecoverVisible }
        
    case ActionTypes.OPEN_PASSWORD_RECOVER:
      return {...state, isPasswordRecoverVisible: true }
        
    case ActionTypes.CLOSE_PASSWORD_RECOVER:
      return {...state, isPasswordRecoverVisible: false}
      
    case ActionTypes.EMAIL_UPDATE_RECOVER:
      return {...state, emailForRecover: action.payload}  

    default:
      return state;
  }
};

