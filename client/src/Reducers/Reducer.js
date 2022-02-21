import { SignIn_User, SignUp_User, SignUp_Toggle } from "../Actions/actionTypes";

const initialState = {
    registerToggle: false,
    LoginState : true
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:
            return{
                ...state,
                registerToggle: true
            }
        
        case SignUp_Toggle: {
            return{
                ...state,
                registerToggle: false
            }
        }
        case SignIn_User:
            return{
                ...state,
                LoginState : false
            }
        default: 
            return state
    }
}

export default Reducer;