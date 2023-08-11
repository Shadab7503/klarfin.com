import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    USER: {},
    INVESTORS: [],
    ACCESSTOKEN: ""
};

// Create context
const AppContext = createContext();

// Reducer function
function appReducer(storeState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...storeState, USER: action.payload };
        case 'SET_INVESTORS':
            console.log("payload ",action.payload)
            return { ...storeState, INVESTORS: action.payload };
        case 'SET_ACTIVE_INVESTORS':
            return { ...storeState, ACTIVEINVETOR: action.payload };
        case "SET_ACCESSTOKEN":
            return { ...storeState, ACCESSTOKEN: action.payload }
        default:
            return storeState;
    }
}

// Context provider component
export function AppProvider({ children }) {
    const [storeState, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={[storeState, dispatch]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
