import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styles from "./sprintForm.module.css";
import { enqueueSnackbar } from "notistack";
import InputError from "../InputError";
import { ISprint } from "../../interfaces";

interface IProps {
    titleComponent?: string;
    buttonText?: string;
    handleSubmit: (sprint: ISprint) => void;
    endSubmit?: (sprint: ISprint) => void;
    editableSprint?: ISprint;
}

const SprintForm = ({ titleComponent = "INICIE SUA SPRINT", buttonText = "Iniciar sprint", handleSubmit, endSubmit, editableSprint }: IProps) => {

    const [ isEnd, setIsEnd ] = useState<boolean>(false);
    const [sprint, setSprint] = useState(editableSprint ? {
        ...editableSprint,
        startDate: new Date(editableSprint.startDate!.split('T')[0]),
        endDate: new Date(editableSprint.endDate!.split('T')[0])

    } : {
        title: '',
        startDate: new Date(),
        endDate: new Date(),
    });
    const [isValidEndDate] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmit(true);

        if (sprint.title.length < 4) {
            enqueueSnackbar("Campo 'nome' está inválido.", {
                variant: "error"
            })
            return;
        }

        if (!checkEndDate(new Date(sprint.startDate))) {
            enqueueSnackbar("Campo 'Data inicio' está inválido.", {
                variant: "error"
            })
            return;
        }

        if (!checkEndDate(new Date(sprint.endDate))) {
            enqueueSnackbar("Campo 'Data término' está inválido.", {
                variant: "error"
            })
            return;
        }

        const sprintData: ISprint = {
            ...sprint,
            startDate: sprint.startDate.toISOString(),
            endDate: sprint.endDate.toISOString()
        }

        handleSubmit(sprintData);
    }

    function onEndSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const sprintData: ISprint = {
            ...sprint,
            startDate: sprint.startDate.toISOString(),
            endDate: sprint.endDate.toISOString()
        }
        endSubmit!(sprintData);
    }

    function checkEndDate(date: Date) {
        const currentYear = new Date().getFullYear();
        const yearSelected = date.getFullYear();

        return yearSelected >= currentYear;
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<number>, key: string) {
        setSprint({
            ...sprint,
            [key]: event.target.value
        });
    }

    return (
        <>
            <div className={`${styles.area} ${styles.formContainer}`}>
                <div className={styles.form_div}>
                    <form className={styles.formulario} onSubmit={e => isEnd ? onEndSubmit(e) : onSubmit(e)}>
                        <h5>{titleComponent}</h5>

                        <input
                            onChange={(e) => handleChange(e, 'title')}
                            type="text"
                            value={sprint.title}
                            placeholder="Titulo da sua Sprint"
                            className={styles.nameCamp}
                            maxLength={80}
                            disabled={editableSprint ? true : false}
                        />

                        <input
                            id="datepicker"
                            type="date"
                            value={sprint.startDate.getFullYear() + "-" + ("0" + (sprint.startDate.getMonth() + 1)).slice(-2) + "-" + ("0" + sprint.startDate.getDate()).slice(-2)}
                            onChange={(e) => {
                                const newDate = new Date(e.target.value);
                                newDate.setDate(Number(e.target.value.slice(-2)));
                                setSprint({
                                    ...sprint,
                                    startDate: newDate,
                                })
                            }}
                            placeholder="Inicia em"
                            className={`${styles.datepick}}`}
                        />
                        {(isSubmit && !isValidEndDate) && <InputError>A data de inicio está inválida.</InputError>}

                        <input
                            id="datepicker"
                            type="date"
                            value={sprint.endDate.getFullYear() + "-" + ("0" + (sprint.endDate.getMonth() + 1)).slice(-2) + "-" + ("0" + sprint.endDate.getDate()).slice(-2)}
                            onChange={(e) => {
                                const newDate = new Date(e.target.value);
                                newDate.setDate(Number(e.target.value.slice(-2)));
                                setSprint({
                                    ...sprint,
                                    endDate: newDate,
                                })
                            }}
                            placeholder="Finaliza em"
                            className={`${styles.datepick}}`}
                        />
                        {(isSubmit && !isValidEndDate) && <InputError>A data de término está inválida.</InputError>}

                        { editableSprint ?
                            <div className={styles.boxOptions}>
                                <button type="submit" className={styles.boxOptionsBtn} onClick={() => setIsEnd(false)}>
                                    Salvar Alterações
                                </button>
                                <button type="submit" className={styles.boxOptionsBtn} onClick={() => setIsEnd(true)}>
                                    Finalizar Sprint
                                </button>
                            </div> :
                            <button type="submit" className={styles.submitBtn}>
                                <p>{buttonText}</p>
                            </button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
export default SprintForm;