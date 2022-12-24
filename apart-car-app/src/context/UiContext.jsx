import { createContext, useState } from 'react';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {

    const [data, setData] = useState([]);

    const set_data = (data) => {
        setData((value) => [...value, data]);
    }

    const reset_data = () => setData([]);

    return (
        <UiContext.Provider 
            value={{
                data,
                set_data,
                reset_data
            }}
        >   
            { children }
        </UiContext.Provider>
    )
}