import { createContext, useContext, useState } from "react";

const MainContext = createContext({});

function MainProvider({ children }) {
    const [modal, setModal] = useState(false);
    const setoresLocal = localStorage.getItem("setores");
    const cargosLocais = localStorage.getItem("cargos");
    const funcionariosLocais = localStorage.getItem("funcionarios");

    const [setores, setSetores] = useState(() =>
        setoresLocal ? JSON.parse(setoresLocal) : []
    );

    const [cargos, setCargos] = useState(() =>
        cargosLocais ? JSON.parse(cargosLocais) : []
    );

    const [funcionarios, setFuncionarios] = useState(() =>
        funcionariosLocais ? JSON.parse(funcionariosLocais) : []
    );

    const cleanSetName = (name) => {
        return name
            ?.replace(/[^\w\s]/gi, "")
            ?.replace(/\d/g, "")
            ?.replace(/\s+/g, "");
    };

    const props = {
        setores,
        setSetores,
        cargos,
        setCargos,
        funcionarios,
        setFuncionarios,
        modal,
        setModal,
        cleanSetName,
    };

    return (
        <MainContext.Provider value={props}>{children}</MainContext.Provider>
    );
}

const useMainContext = () => {
    const ctx = useContext(MainContext);
    return {
        ...ctx,
    };
};

export { useMainContext, MainProvider };
