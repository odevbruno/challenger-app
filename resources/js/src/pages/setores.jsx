import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { Edit, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

export default function Setores() {
    const {
        setores,
        setSetores,
        cargos,
        funcionarios,
        modal,
        setModal,
        cleanSetName,
    } = useMainContext();
    const { handleMouse, hoveredIndex } = useHover();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        reset,
    } = useForm();
    const [idEditMode, setIdEditMode] = useState();

    function submit(props) {
        const name = props.setor;
        const setRaw = localStorage.getItem("setores");

        if (setRaw) {
            const setores = JSON.parse(setRaw);
            const setoresIguais = setores.filter(
                (i) => cleanSetName(i.name) === cleanSetName(name)
            );

            if (setoresIguais.length) {
                const currentSetores = [
                    ...setores,
                    {
                        name: `${name} ${setoresIguais.length + 1}`,
                        id: v4(),
                    },
                ];

                localStorage.setItem("setores", JSON.stringify(currentSetores));
                setSetores(currentSetores);
            } else {
                const currentSetores = [
                    ...setores.filter((i) => i.id !== idEditMode),
                    {
                        name,
                        id: v4(),
                    },
                ];
                localStorage.setItem("setores", JSON.stringify(currentSetores));
                setSetores(currentSetores);
            }
        } else {
            const currentSetores = [
                ...setores,
                {
                    name,
                    id: v4(),
                },
            ];
            localStorage.setItem("setores", JSON.stringify(currentSetores));
            setSetores(currentSetores);
        }
        setModal(false);
        reset();
        toast(idEditMode ? "Edição concluida !" : "Novo cadastro concluido !", {
            position: "top-right",
            icon: "success",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const onDragEnd = (result, set, refStorage) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(setores);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        set(items);
        localStorage.setItem(refStorage, JSON.stringify(items));
    };

    return (
        <Page>
            <ToastContainer />
            <Header>
                <Topic>Setores</Topic>
                {!!setores.length && (
                    <ButtonAdd onClick={() => setModal(true)} />
                )}
            </Header>
            <Divider className="my-5" />
            <ContentList>
                <DragDropContext
                    touchSlop={10}
                    onDragEnd={(ev) => onDragEnd(ev, setSetores, "setores")}
                >
                    <Droppable droppableId="setores">
                        {(provided) => (
                            <ul
                                className="flex flex-col gap-2"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {setores.map((setor, index) => {
                                    const currentCargos = cargos.filter(
                                        (_i) => _i.setorId === setor.id
                                    );
                                    const currentFuncionarios =
                                        funcionarios.filter((funcionario) =>
                                            currentCargos.some(
                                                (cargo) =>
                                                    cargo.id ===
                                                    funcionario.cargoId
                                            )
                                        );
                                    return (
                                        <Draggable
                                            key={setor.id}
                                            draggableId={setor.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <ItemList
                                                    onMouseEnter={() =>
                                                        handleMouse(index)
                                                    }
                                                    onMouseLeave={() =>
                                                        handleMouse(null)
                                                    }
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div className="flex flex-col cursor-pointer w-full">
                                                        <div className="flex flow-row justify-between w-full ">
                                                            <span>
                                                                {setor.name}
                                                            </span>

                                                            <div className="flex flow-row gap-4">
                                                                <button
                                                                    onClick={() => {
                                                                        setIdEditMode(
                                                                            setor.id
                                                                        );
                                                                        setModal(
                                                                            true
                                                                        );
                                                                        setValue(
                                                                            "setor",
                                                                            setor.name
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        const raw =
                                                                            localStorage.getItem(
                                                                                "setores"
                                                                            );
                                                                        const setores =
                                                                            JSON.parse(
                                                                                raw
                                                                            );
                                                                        const currentSetores =
                                                                            [
                                                                                ...setores.filter(
                                                                                    (
                                                                                        i
                                                                                    ) =>
                                                                                        i.id !==
                                                                                        setor.id
                                                                                ),
                                                                            ];
                                                                        setSetores(
                                                                            currentSetores
                                                                        );
                                                                        localStorage.setItem(
                                                                            "setores",
                                                                            JSON.stringify(
                                                                                currentSetores
                                                                            )
                                                                        );
                                                                        toast(
                                                                            "Cadastro deletado com sucesso !",
                                                                            {
                                                                                icon: "warning",
                                                                                position:
                                                                                    "top-right",
                                                                                autoClose: 3000,
                                                                                hideProgressBar: false,
                                                                                closeOnClick: true,
                                                                                pauseOnHover: true,
                                                                                draggable: true,
                                                                                progress:
                                                                                    undefined,
                                                                                theme: "dark",
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <Trash color="red" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {hoveredIndex ===
                                                            index && (
                                                            <>
                                                                {!!currentCargos.length && (
                                                                    <span className="py-4">
                                                                        Cargos:
                                                                        {currentCargos.map(
                                                                            (
                                                                                i
                                                                            ) => (
                                                                                <p
                                                                                    key={
                                                                                        i.id
                                                                                    }
                                                                                >
                                                                                    -{" "}
                                                                                    {
                                                                                        i.name
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {!!currentFuncionarios.length && (
                                                                    <span className="py-4">
                                                                        Funcionários:
                                                                        {currentFuncionarios.map(
                                                                            (
                                                                                i
                                                                            ) => (
                                                                                <p
                                                                                    key={
                                                                                        i.id
                                                                                    }
                                                                                >
                                                                                    -{" "}
                                                                                    {
                                                                                        i.name
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </ItemList>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </ContentList>
            <div>
                {!setores.length && (
                    <ButtonSubmit onClick={() => setModal(true)}>
                        <span>Novo</span>
                    </ButtonSubmit>
                )}
            </div>
            <Modal
                key={1}
                isOpen={modal}
                onClose={() => setModal(false)}
                title={"Cadastro de setor"}
            >
                <form
                    onSubmit={handleSubmit(submit)}
                    className="pt-6 pb-2 flex flex-col gap-4"
                >
                    <input
                        {...register("setor", {
                            required: true,
                        })}
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Setor"
                    />
                    {errors.setor && (
                        <span className="text-red-500">Campo obrigatório</span>
                    )}
                    <ButtonSubmit>
                        <span>Confirmar</span>
                    </ButtonSubmit>
                </form>
            </Modal>
        </Page>
    );
}
