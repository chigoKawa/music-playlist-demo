import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [xrayMode, setXrayMode] = useState(false);
    let sharedState = {
        state: {
            xrayMode: xrayMode,
        },
        setXrayMode: setXrayMode,
    };

    return ( <
        AppContext.Provider value = { sharedState } > { children } < /AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}