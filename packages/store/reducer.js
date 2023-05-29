import { INITIAL_STATE } from "./constants"

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_LIBRARIES":
            return action.payload

        case "SET_CURRENT_LIBRARY_NAME":
            return { ...state, currentLibraryName: action.payload }

        // case "SET_ACTIVE_LIBRERIES":
        //     return action.payload
    }

    return state
}