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
import { CarTaxiFront, Edit, PackageOpen, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Funcionarios() {
    const {
        setores,
        cargos,
        funcionarios,
        modal,
        setModal,
        cleanSetName,
        setFuncionarios,
    } = useMainContext();
    const { handleMouse, hoveredIndex } = useHover();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        reset,
        clearErrors,
        getValues,
    } = useForm();
    const [idEditMode, setIdEditMode] = useState();

    function submit(props) {
        const { name, cargoId, setorId } = props;
        const funcRaw = localStorage.getItem("funcionarios");

        if (funcRaw) {
            const funcionarios = JSON.parse(funcRaw);
            const funcionariosIguais = funcionarios.filter(
                (i) =>
                    cleanSetName(i.name) === cleanSetName(name) &&
                    i.setorId === setorId &&
                    i.cargoId === cargoId
            );

            if (funcionariosIguais.length) {
                const currentFunc = [
                    ...funcionarios,
                    {
                        cargoId,
                        setorId,
                        name: `${name} ${funcionariosIguais.length + 1}`,
                        id: v4(),
                    },
                ];

                localStorage.setItem(
                    "funcionarios",
                    JSON.stringify(currentFunc)
                );
                setFuncionarios(currentFunc);
            } else {
                const currentFunc = [
                    ...funcionarios.filter((i) => i.id !== idEditMode),
                    {
                        cargoId,
                        setorId,
                        name,
                        id: v4(),
                    },
                ];
                localStorage.setItem(
                    "funcionarios",
                    JSON.stringify(currentFunc)
                );
                setFuncionarios(currentFunc);
            }
        } else {
            const currentFunc = [
                ...funcionarios,
                {
                    cargoId,
                    setorId,
                    name,
                    id: v4(),
                },
            ];
            localStorage.setItem("funcionarios", JSON.stringify(currentFunc));
            setFuncionarios(currentFunc);
        }
        setModal(false);
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
        reset();
    }

    const onDragEnd = (result, set, refStorage) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(funcionarios);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        set(items);
        localStorage.setItem(refStorage, JSON.stringify(items));
    };

    return (
        <Page>
            <ToastContainer />
            <Header>
                <Topic>Funcionários</Topic>
                {!!funcionarios.length && (
                    <ButtonAdd onClick={() => setModal(true)} />
                )}
            </Header>
            <Divider className="my-5" />
            <ContentList>
                <DragDropContext
                    touchSlop={10}
                    onDragEnd={(ev) =>
                        onDragEnd(ev, setFuncionarios, "funcionarios")
                    }
                >
                    <Droppable droppableId="funcionarios">
                        {(provided) => (
                            <ul
                                className="flex flex-col gap-2 "
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {funcionarios?.map((func, index) => {
                                    const currentCargo = cargos.find(
                                        (_i) => _i.id === func?.cargoId
                                    );
                                    const currentSetor = setores.find(
                                        (_i) => _i.id === currentCargo?.setorId
                                    );
                                    return (
                                        <Draggable
                                            key={func?.id}
                                            draggableId={func?.id.toString()}
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
                                                                {func?.name}
                                                            </span>

                                                            <div className="flex flow-row gap-4">
                                                                <button
                                                                    onClick={() => {
                                                                        setIdEditMode(
                                                                            func?.id
                                                                        );
                                                                        setModal(
                                                                            true
                                                                        );
                                                                        setValue(
                                                                            "name",
                                                                            func?.name
                                                                        );
                                                                        setValue(
                                                                            "cargoId",
                                                                            func?.cargoId
                                                                        );
                                                                        setValue(
                                                                            "setorId",
                                                                            func?.setorId
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        const raw =
                                                                            localStorage.getItem(
                                                                                "funcionarios"
                                                                            );
                                                                        const funcionarios =
                                                                            JSON.parse(
                                                                                raw
                                                                            );
                                                                        const currentFuncionarios =
                                                                            [
                                                                                ...funcionarios.filter(
                                                                                    (
                                                                                        i
                                                                                    ) =>
                                                                                        i.id !==
                                                                                        func?.id
                                                                                ),
                                                                            ];
                                                                        setFuncionarios(
                                                                            currentFuncionarios
                                                                        );
                                                                        localStorage.setItem(
                                                                            "funcionarios",
                                                                            JSON.stringify(
                                                                                currentFuncionarios
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
                                                                {currentCargo && (
                                                                    <span className="py-4">
                                                                        Cargo:
                                                                        <p>
                                                                            -{" "}
                                                                            {
                                                                                currentCargo?.name
                                                                            }
                                                                        </p>
                                                                    </span>
                                                                )}
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
            {!funcionarios.length && (
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
                title={"Cadastro de funcionário"}
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
                            clearErrors("setorId");
                            setValue("setorId", ev.currentTarget.value);
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

                    <select
                        value={getValues("cargoId") || ""}
                        {...register("cargoId", {
                            required: "Campo obrigatório",
                        })}
                        onChange={(ev) => {
                            clearErrors("cargoId");
                            setValue("cargoId", ev.currentTarget.value);
                        }}
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
                    {errors.cargoId && (
                        <span className="text-red-500">
                            {errors.cargoId.message}
                        </span>
                    )}
                    <input
                        {...register("name", {
                            required: "Campo obrigatório",
                        })}
                        className="border-0 outline-none h-[35px]  rounded-sm px-3 bg-zinc-700 placeholder:text-base w-full"
                        autoFocus
                        type="text"
                        placeholder="Funcionário"
                    />
                    {errors.name && (
                        <span className="text-red-500">
                            {errors.name.message}
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
