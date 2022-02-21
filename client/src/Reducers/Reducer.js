import { SignIn_User, SignUp_User } from "../Actions/actionTypes";

const initialState = {

}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:
            return{
                ...state
            }
            
        case SignIn_User:
            return{
                ...state
            }
    }
}

export default Reducer;