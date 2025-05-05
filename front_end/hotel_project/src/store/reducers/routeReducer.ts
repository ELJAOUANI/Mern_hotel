import { combineReducers } from "redux";
import authReducer from "../slices/auth/authSlice";
import bookingReducer from "../slices/booking/bookingSlice";
import roomReducer from "../slices/room/roomSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    booking: bookingReducer,
    room: roomReducer, 

});

export default rootReducer;