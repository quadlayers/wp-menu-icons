import { INITIAL_STATE } from "./constants"

export function library(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_LIBRARY":
            return action.payload;
    }
    return state;
}