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

export default function Setores() {
    const { setores, cargos, funcionarios, modal, setModal } = useMainContext();
    const { handleMouse, hoveredIndex } = useHover();

    return (
        <Page>
            <Header>
                <Topic>Funcionários</Topic>
                <ButtonAdd onClick={() => setModal(true)} />
            </Header>
            <Divider className="my-5" />
            <ContentList>
                {funcionarios?.map((func, idx) => {
                    const currentCargo = cargos.find(
                        (_i) => _i.id === func.cargoId
                    );
                    const currentSetor = setores.find(
                        (_i) => _i.id === currentCargo.setorId
                    );
                    return (
                        <ItemList
                            key={idx}
                            onMouseEnter={() => handleMouse(idx)}
                            onMouseLeave={() => handleMouse(null)}
                        >
                            <div className="flex flex-col cursor-pointer">
                                <span>{func.name}</span>
                                {hoveredIndex === idx && (
                                    <>
                                        <span className="py-4">
                                            Cargo:
                                            <p>- {currentCargo.name}</p>
                                        </span>
                                        <span className="py-4">
                                            Setor:
                                            <p>
                                                - {currentSetor.description} (
                                                {currentSetor.name})
                                            </p>
                                        </span>
                                    </>
                                )}
                            </div>
                        </ItemList>
                    );
                })}
            </ContentList>
            <Modal
                key={3}
                isOpen={modal}
                onClose={() => setModal(false)}
                title={"Cadastro de funcionário"}
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
                    <select
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        placeholder="Cargo"
                    >
                        <option value={""} disabled selected>
                            Escolha o cargo
                        </option>
                        {cargos.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>

                    <input
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Funcionário"
                    />
                    <ButtonSubmit>
                        <span>Confirmar</span>
                    </ButtonSubmit>
                </form>
            </Modal>
        </Page>
    );
}
