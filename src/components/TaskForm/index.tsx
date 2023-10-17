import { Box, Button, FormControl, IconButton, InputLabel, ListItemIcon, Menu, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./taskForm.module.css";
import { enqueueSnackbar } from "notistack";
import InputError from "../InputError";
import { IBoard, IFile, ITask, IUsersIntegrated } from "../../interfaces";
import { Add, AttachFile, Delete, Download, Info, MoreVert } from "@mui/icons-material";
import FileForm from "./components/FileForm";
import { TasksService } from "../../services/task.service";

interface IProps {
  title?: string;
  buttonText?: string;
  boards: Array<IBoard>;
  users?: Array<IUsersIntegrated>;
  handleSubmit: (task: ITask) => void;
  editableTask?: ITask;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

const options = [
  {
    name: 'Download',
    icon: <Download fontSize="small" />
  },
  {
    name: 'Remover',
    icon: <Delete fontSize="small" />
  }
];

const TaskForm = ({ title = "CRIE SUA ATIVIDADE", buttonText = "Criar atividade", boards, users, handleSubmit, editableTask }: IProps) => {

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
  const [isValidEndDate] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
  const [isFileFormOpen, setIsFileFormOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<IFile>>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenu, setContextMenu] = useState<{item: number; mouseX: number; mouseY: number;} | null>(null);
  const [fileName, setFileName] = useState<string>();

  const boxRef = useRef<HTMLFormElement>(null);
  const taskService = new TasksService();

  const open = Boolean(anchorEl);
 
  const handleContextMenu = (item: number) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          item,
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6
        }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
    setAnchorEl(null);
  };

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

  const handleTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFileFormOpen = () => {
    setIsFileFormOpen(!isFileFormOpen);
  }

  useEffect(() => {
    if (task.id) {
      taskService.getAllFiles(task.id).then(data => setFiles(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFileFormOpen, anchorEl, contextMenu]);

  const handleDownload = async (name: string) => {
    try {
      handleClose();
      if (task.id) {
        const download = await taskService.downloadFile(task.id, name);
        const url = window.URL.createObjectURL(new Blob([download]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        return download
      }
    } catch (err) {
      console.log(err)
      enqueueSnackbar("Falha ao realizar o download do arquivo!", {
        variant: "error"
      })
    }
  }

  const handleRemoveUpload = async (name: string) => {
    try {
      handleClose();
      if (task.id) {
        const download = await taskService.removeFile(task.id, name);
        return download
      }
    } catch (err) {
      enqueueSnackbar("Falha ao realizar a remoção do arquivo!", {
        variant: "error"
      })
    }
  }

  return (
    <>
      <div className={`${styles.area} ${styles.formContainer}`}>
        <div className={styles.form_div}>
          <h5>{title}</h5>
          <Box sx={{ mt: '8px' }}>
            <Tabs TabIndicatorProps={{ style: { backgroundColor: '#002D2B' } }} textColor="inherit" sx={{ height: 50, minHeight: 50, alignItems: 'center', color: '#002D2B' }} value={tabValue} onChange={handleTab} aria-label="basic tabs example">
              <Tab icon={<Info />} iconPosition="start" label="Info" value={0} style={{ minHeight: 10, padding: 10 }} />
              {task.id && <Tab icon={<AttachFile />} iconPosition="start" label="Arquivos" value={1} style={{ minHeight: 10, padding: 10 }} />}
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <form className={styles.formulario} onSubmit={e => onSubmit(e)} ref={boxRef}>

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
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <FileForm isOpen={isFileFormOpen} handleOpen={handleFileFormOpen} taskId={task.id} />
            <div style={{ minHeight: boxRef.current?.clientHeight, overflowY: 'auto' }} className={styles.fileList}>
              <div className={styles.files}>

                <Button variant="outlined" startIcon={<Add />} sx={{
                  width: '30%',
                  height: '150px'
                }}
                  onClick={handleFileFormOpen}
                >
                  Adicionar
                </Button>
                {
                  files.map((file, i) =>
                    <Tooltip title={file.name} key={i}>
                      <Box sx={{
                        width: '30%',
                        height: '150px',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                        key={i}
                        className={styles.fileItem}
                      >
                        <IconButton
                          aria-label="more"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onContextMenu={handleContextMenu(i)}
                          onClick={(e) => {
                            handleContextMenu(i)(e)
                            setFileName(file.name)
                          }}
                          sx={{
                            alignSelf: 'flex-end'
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                        <Typography fontWeight="bold" component='h3'>{file.type.toUpperCase()}</Typography>
                        <Typography sx={{
                          width: "95%",
                          textAlign: 'center',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }} component='span'>{file.name}</Typography>
                      </Box>
                    </Tooltip>)
                }
                <Menu
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  open={contextMenu != null}
                  onClose={() => handleClose()}
                  anchorReference="anchorPosition"
                  anchorPosition={
                    contextMenu != null
                      ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                      : undefined
                  }
                  anchorEl={anchorEl}
                  PaperProps={{
                    style: {
                      width: '16ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.name} onClick={async () => { option.name === 'Download' ? await handleDownload(fileName!) : await handleRemoveUpload(fileName!) }}>
                      <ListItemIcon>
                        {option.icon}
                      </ListItemIcon>
                      <Typography variant="inherit">{option.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </>
  )
}
export default TaskForm;