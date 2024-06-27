import React, { useCallback, useState } from "react";
import { useMainContext } from "../context";
import {
    ButtonAdd,
    ContentList,
    Divider,
    Header,
    Page,
    Topic,
    ItemList,
    Modal,
    ButtonSubmit,
} from "../components";
import { useHover } from "../hooks";

export default function Setores() {
    const { setores, cargos, funcionarios, modal, setModal } = useMainContext();

    const { handleMouse, hoveredIndex } = useHover();

    return (
        <Page>
            <Header>
                <Topic>Setores</Topic>
                <ButtonAdd onClick={() => setModal(true)} />
            </Header>
            <Divider className="my-5" />
            <ContentList>
                {setores?.map((setor, idx) => {
                    const currentCargos = cargos.filter(
                        (_i) => _i.setorId === setor.id
                    );
                    const currentFuncionarios = funcionarios.filter(
                        (funcionario) =>
                            currentCargos.some(
                                (cargo) => cargo.id === funcionario.cargoId
                            )
                    );
                    return (
                        <ItemList
                            key={setor.id}
                            onMouseEnter={() => handleMouse(idx)}
                            onMouseLeave={() => handleMouse(null)}
                        >
                            <div className="flex flex-col cursor-pointer">
                                <span>
                                    {setor.name} - {setor.description}
                                </span>
                                {hoveredIndex === idx && (
                                    <>
                                        <span className="py-4">
                                            Cargos:
                                            {currentCargos.map((i) => (
                                                <p key={i.id}>- {i.name}</p>
                                            ))}
                                        </span>
                                        <span className="py-4">
                                            Funcionários:
                                            {currentFuncionarios.map((i) => (
                                                <p key={i.id}>- {i.name}</p>
                                            ))}
                                        </span>
                                    </>
                                )}
                            </div>
                        </ItemList>
                    );
                })}
            </ContentList>
            <Modal
                key={1}
                isOpen={modal}
                onClose={() => setModal(false)}
                title={"Cadastro de setor"}
            >
                <form className="pt-6 pb-2 flex flex-col gap-4">
                    <input
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Setor"
                    />
                    <ButtonSubmit>
                        <span>Confirmar</span>
                    </ButtonSubmit>
                </form>
            </Modal>
        </Page>
    );
}
