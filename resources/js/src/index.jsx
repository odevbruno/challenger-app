import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Setores from "./pages/setores";
import Funcionarios from "./pages/funcionarios";
import Cargos from "./pages/cargos";
import { LayoutRoot } from "./components";
import { MainProvider } from "./context";

function LayoutElement({ children }) {
    return <LayoutRoot>{children}</LayoutRoot>;
}

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <LayoutElement>
                            <Setores />
                        </LayoutElement>
                    }
                />
                <Route
                    path="/setores"
                    element={
                        <LayoutElement>
                            <Setores />
                        </LayoutElement>
                    }
                />
                <Route
                    path="/funcionarios"
                    element={
                        <LayoutElement>
                            <Funcionarios />
                        </LayoutElement>
                    }
                />
                <Route
                    path="/cargos"
                    element={
                        <LayoutElement>
                            <Cargos />
                        </LayoutElement>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const cntr = document.getElementById("root");
if (cntr) {
    ReactDOM.createRoot(cntr).render(
        <MainProvider>
            <Root />
        </MainProvider>
    );
}
