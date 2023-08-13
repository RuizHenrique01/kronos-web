import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styles from "./taskForm.module.css";
import { enqueueSnackbar } from "notistack";
import InputError from "../InputError";
import { IBoard, ITask, IUsersIntegrated } from "../../interfaces";

interface IProps {
    title?: string;
    buttonText?: string; 
    boards: Array<IBoard>; 
    users?: Array<IUsersIntegrated>;
    handleSubmit: (task: ITask) => void; 
    editableTask?: ITask; 
}

const TaskForm = ({ title="CRIE SUA ATIVIDADE", buttonText="Criar atividade", boards, users, handleSubmit, editableTask }: IProps) => {

  const [task, setTask] = useState(editableTask ? {
    ...editableTask,
    endDate: new Date(editableTask.endDate!.split('T')[0])

  } : {
    name: '',
    description: '',
    endDate: new Date(),
    boardId: boards[0].id,
    ownerId: users![0]?.userId ?? 0,
  });
  const [ isValidEndDate ] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmit(true);

    if (task.name.length < 4) {
      enqueueSnackbar("Campo 'nome' está inválido.", {
        variant: "error"
      })
      return;
    }

    if (!checkEndDate(new Date(task.endDate))) {
      enqueueSnackbar("Campo 'Data término' está inválido.", {
        variant: "error"
      })
      return;
    }

    const taskData: ITask = {
        ...task,
        endDate: task.endDate.toISOString()
    }

    handleSubmit(taskData);
  }

  function checkEndDate(date: Date) {
    const currentYear = new Date().getFullYear();
    const yearSelected = date.getFullYear();

    return yearSelected >= currentYear;
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<number>, key: string) {
    setTask({
      ...task,
      [key]: event.target.value
    });
  }

  return (
    <>
      <div className={`${styles.area} ${styles.formContainer}`}>
        <div className={styles.form_div}>
          <form className={styles.formulario} onSubmit={ e => onSubmit(e)}>
            <h5>{title}</h5>

            <input
              onChange={(e) => handleChange(e, 'name')}
              type="text"
              value={task.name}
              placeholder="Nome da sua Atividade"
              className={styles.nameCamp}
              maxLength={40}
            />

            <textarea
              onChange={(e) => handleChange(e, 'description')}
              value={task.description}
              name="description"
              id="descriptionCamp"
              cols={30}
              rows={10}
              placeholder="Descrição"
              maxLength={255}
              className={`${styles.textarea}`}>
            
            </textarea>

            <input
              id="datepicker"
              type="date"
              value={task.endDate.getFullYear() + "-" + ("0" + (task.endDate.getMonth() + 1)).slice(-2) + "-" + ("0" + task.endDate.getDate()).slice(-2)}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                newDate.setDate(Number(e.target.value.slice(-2)));
                setTask({
                  ...task,
                  endDate: newDate,
                })
              }}
              placeholder="Finaliza em"
              className={`${styles.datepick}}`}
            />
            {(isSubmit && !isValidEndDate) && <InputError>A data de término está inválida.</InputError>}

            <FormControl sx={{
              margin: '0'
            }} fullWidth>
              <InputLabel
                sx={{
                  top: '0px',
                  left: '-5px',
                }}
                //onChange={(e: any, k: string) => handleChange(e, k)}
                id="boardsLabel">
                Quadro
              </InputLabel>
              <Select
                sx={{
                  height: '40px'
                }}
                labelId="boardsLabel"
                id="demo-simple-select"
                value={task.boardId}
                label="Quadro"
                onChange={(e) => handleChange(e, 'boardId')}
              >
                {
                  boards.length ? boards.map(board => (
                    <MenuItem key={board.id} value={board.id}>{board.name}</MenuItem>
                  ))
                    : null
                }
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                sx={{
                  left: '-5px',
                  backgroundColor: '#FFFFFF',
                  paddingRight: '10px',
                }}
                //onChange={(e: any, k: string) => handleChange(e, k)}
                id="userLabel">
                Atribuir à
              </InputLabel>
              <Select
                sx={{
                  height: '40px'
                }}
                labelId="userLabel"
                id="demo-simple-select"
                value={task.ownerId}
                label="Atribuir à"
                onChange={(e) => handleChange(e, 'ownerId')}
              >
                {
                  users!.length ? users!.map(user => (
                    <MenuItem key={user.id} value={user.userId}>{user.Users.name}</MenuItem>
                  ))
                    : null
                }
              </Select>
            </FormControl>

            <button type="submit" className={styles.submitBtn}>
              <p>{buttonText}</p>              
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default TaskForm;