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
import "react-toastify/dist/ReactToastify.css";

export default function Cargos() {
    const {
        setores,
        setCargos,
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
        getValues,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm();

    const [idEditMode, setIdEditMode] = useState();

    function submit(props) {
        const name = props.cargo;
        const setorId = props.setorId;
        const setRaw = localStorage.getItem("cargos");

        if (setRaw) {
            const cargos = JSON.parse(setRaw);
            const cargosIguais = cargos.filter(
                (i) =>
                    cleanSetName(i.name) === cleanSetName(name) &&
                    i.setorId === setorId
            );

            if (cargosIguais.length) {
                const currentcargos = [
                    ...cargos,
                    {
                        setorId,
                        name: `${name} ${cargosIguais.length + 1}`,
                        id: v4(),
                    },
                ];

                localStorage.setItem("cargos", JSON.stringify(currentcargos));
                setCargos(currentcargos);
            } else {
                const currentcargos = [
                    ...cargos.filter((i) => i.id !== idEditMode),
                    {
                        setorId,
                        name,
                        id: v4(),
                    },
                ];
                localStorage.setItem("cargos", JSON.stringify(currentcargos));
                setCargos(currentcargos);
            }
        } else {
            const currentcargos = [
                ...cargos,
                {
                    setorId,
                    name,
                    id: v4(),
                },
            ];
            localStorage.setItem("cargos", JSON.stringify(currentcargos));
            setCargos(currentcargos);
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
        const items = Array.from(cargos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        set(items);
        localStorage.setItem(refStorage, JSON.stringify(items));
    };

    return (
        <Page>
            <ToastContainer />
            <Header>
                <Topic>Cargos</Topic>
                {!!cargos.length && (
                    <ButtonAdd onClick={() => setModal(true)} />
                )}
            </Header>
            <Divider className="my-5" />
            <ContentList>
                <DragDropContext
                    touchSlop={10}
                    onDragEnd={(ev) => onDragEnd(ev, setCargos, "cargos")}
                >
                    <Droppable droppableId="cargos">
                        {(provided) => (
                            <ul
                                className="flex flex-col gap-2"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {cargos?.map((cargo, index) => {
                                    const currentSetor = setores.find(
                                        (_i) => _i.id === cargo.setorId
                                    );
                                    const currentFuncionarios =
                                        funcionarios.filter(
                                            (funcionario) =>
                                                funcionario.cargoId === cargo.id
                                        );
                                    return (
                                        <Draggable
                                            key={cargo.id}
                                            draggableId={cargo.id.toString()}
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
                                                                {cargo.name}
                                                            </span>

                                                            <div className="flex flow-row gap-4">
                                                                <button
                                                                    onClick={() => {
                                                                        setIdEditMode(
                                                                            cargo.id
                                                                        );
                                                                        setModal(
                                                                            true
                                                                        );
                                                                        setValue(
                                                                            "cargo",
                                                                            cargo.name
                                                                        );
                                                                        setValue(
                                                                            "setorId",
                                                                            cargo.setorId
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        const raw =
                                                                            localStorage.getItem(
                                                                                "cargos"
                                                                            );
                                                                        const cargos =
                                                                            JSON.parse(
                                                                                raw
                                                                            );
                                                                        const currentcargos =
                                                                            [
                                                                                ...cargos.filter(
                                                                                    (
                                                                                        i
                                                                                    ) =>
                                                                                        i.id !==
                                                                                        cargo.id
                                                                                ),
                                                                            ];
                                                                        setCargos(
                                                                            currentcargos
                                                                        );
                                                                        localStorage.setItem(
                                                                            "cargos",
                                                                            JSON.stringify(
                                                                                currentcargos
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
                                                                {currentSetor && (
                                                                    <span className="py-4">
                                                                        Setor:
                                                                        <p>
                                                                            -{" "}
                                                                            {
                                                                                currentSetor?.name
                                                                            }
                                                                        </p>
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

            {!cargos.length && (
                <div>
                    <ButtonSubmit onClick={() => setModal(true)}>
                        <span>Novo</span>
                    </ButtonSubmit>
                </div>
            )}

            <Modal
                key={1}
                isOpen={modal}
                onClose={() => setModal(false)}
                title={"Cadastro de cargo"}
            >
                <form
                    onSubmit={handleSubmit(submit)}
                    className="pt-6 pb-2 flex flex-col gap-4"
                >
                    <select
                        value={getValues("setorId") || ""}
                        {...register("setorId", {
                            required: "Campo obrigatório",
                        })}
                        onChange={(ev) => {
                            setValue("setorId", ev.currentTarget.value);
                            clearErrors("setorId");
                        }}
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        placeholder="Setor"
                    >
                        <option value={""} disabled selected>
                            Escolha o setor
                        </option>
                        {setores.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.setorId && (
                        <span className="text-red-500">
                            {errors.setorId.message}
                        </span>
                    )}
                    <input
                        {...register("cargo", {
                            required: "Campo obrigatório",
                        })}
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Cargo"
                    />
                    {errors.cargo && (
                        <span className="text-red-500">
                            {errors.cargo.message}
                        </span>
                    )}
                    <ButtonSubmit>
                        <span>Confirmar</span>
                    </ButtonSubmit>
                </form>
            </Modal>
        </Page>
    );
}
