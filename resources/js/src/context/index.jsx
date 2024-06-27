import { createContext, useContext, useState } from "react";

const MainContext = createContext({});

function MainProvider({ children }) {
    const [modal, setModal] = useState(false);

    const [setores, setSetores] = useState([
        { id: 1, name: "TI", description: "Tecnologia da Informação" },
        { id: 2, name: "RH", description: "Recursos Humanos" },
        { id: 3, name: "UI/UX", description: "Criativo" },
    ]);

    const [cargos, setCargos] = useState([
        { id: 1, name: "Desenvolvedor Frontend", setorId: 1 },
        { id: 2, name: "Desenvolvedor Backend", setorId: 1 },
        { id: 3, name: "Designer gráfico", setorId: 3 },
        { id: 4, name: "Gerente RH", setorId: 2 },
        { id: 5, name: "Assistente RH", setorId: 2 },
        { id: 6, name: "PO - Project Owner", setorId: 2 },
    ]);

    const [funcionarios, setFuncionarios] = useState([
        { id: 1, name: "Bruno", cargoId: 1 },
        { id: 1, name: "Hudson", cargoId: 6 },
        { id: 1, name: "Felipe", cargoId: 2 },
        { id: 1, name: "Ian", cargoId: 3 },
        { id: 2, name: "Maria", cargoId: 4 },
    ]);

    const props = { setores, cargos, funcionarios, modal, setModal };

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
