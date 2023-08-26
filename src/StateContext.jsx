import { useContext, useState } from "react";
import React from "react";

const AppContext = React.createContext();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
    const [user, setuser] = useState(null);

    return (
        <AppContext.Provider
            value={{
                user,
                setuser
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };