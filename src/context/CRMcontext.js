import React, {useState} from 'react'

const CRMContext = React.createContext([ {}, () => {} ]);

const CRMProvider = ({ children }) => {
    // definir el state inicial
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    });

    return (
        <CRMContext.Provider value={[ auth, guardarAuth ]} >
            {children} 
        </CRMContext.Provider>
    )
}

export {CRMContext, CRMProvider};
