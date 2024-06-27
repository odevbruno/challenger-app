import React from "react";
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

export default function Cargos() {
    const { setores, cargos, funcionarios, modal, setModal } = useMainContext();
    const { handleMouse, hoveredIndex } = useHover();

    return (
        <Page>
            <Header>
                <Topic>Cargos</Topic>
                <ButtonAdd onClick={() => setModal(true)} />
            </Header>
            <Divider className="my-5" />
            <ContentList>
                {cargos?.map((cargo, idx) => {
                    const currentSetor = setores.find(
                        (_i) => _i.id === cargo.setorId
                    );
                    const currentFuncionarios = funcionarios.filter(
                        (funcionario) => funcionario.cargoId === cargo.id
                    );
                    return (
                        <ItemList
                            key={cargo.id}
                            onMouseEnter={() => handleMouse(idx)}
                            onMouseLeave={() => handleMouse(null)}
                        >
                            <div className="flex flex-col cursor-pointer">
                                <span>{cargo.name}</span>
                                {hoveredIndex === idx && (
                                    <>
                                        <span className="py-4">
                                            Setor:
                                            <p>
                                                - {currentSetor.description} (
                                                {currentSetor.name})
                                            </p>
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
                key={2}
                isOpen={modal}
                onClose={() => setModal(false)}
                title={"Cadastro de cargo"}
            >
                <form className="pt-6 pb-2 flex flex-col gap-4">
                    <select
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        placeholder="Setor"
                    >
                        <option value={""} disabled selected>
                            Escolha o setor
                        </option>
                        {setores.map(({ id, name, description }) => (
                            <option key={id} value={id}>
                                {name} - {description}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Cargo"
                    />
                    <ButtonSubmit>
                        <span>Confirmar</span>
                    </ButtonSubmit>
                </form>
            </Modal>
        </Page>
    );
}
