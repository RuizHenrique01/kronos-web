import { Button, Dialog, styled } from '@mui/material';
import styles from './fileForm.module.css';
import { CloudUpload, Description, UploadFile } from '@mui/icons-material';
import { useState } from 'react';
import { TasksService } from '../../../../services/task.service';
import { enqueueSnackbar } from 'notistack';

interface IProps {
    taskId: number | undefined;
    isOpen: boolean;
    handleOpen: () => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileForm = ({ isOpen, handleOpen, taskId }: IProps) => {

    const [file, setFile] = useState<File>();

    const taskService = new TasksService();

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files![0]);
    }

    const handleDropFile = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        setFile(event.dataTransfer.files[0]);
    }


    const handleSubimit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const formData = new FormData();
    
            formData.append('file', file!, file?.name);

            await taskService.uploadFile(taskId!, formData);
            handleOpen();
            setFile(undefined);
            enqueueSnackbar("Upload de arquivo realizado com sucesso!", {
                variant: 'success'
            });
        }catch(err){
            const sizeFile = file!.size / (1024 *1024);
            if(sizeFile > 10) {
                enqueueSnackbar("O arquivo selecionado ultrapassa o tamanho de 10 MB!", {
                    variant: 'error'
                });
            } else {
                enqueueSnackbar("Falha ao realizar upload do arquivo!", {
                    variant: 'error'
                });
            }
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleOpen} maxWidth='xl'>
            <form className={styles.formBox} onSubmit={e => handleSubimit(e)}>
                <legend className={styles.formBoxTitle}>Escolha uma imagem!</legend>
                <label className={styles.formFileBox} htmlFor='file-input' onDrop={e => handleDropFile(e)} onDragOver={e => e.preventDefault()}>
                {file?.name ?
                        <div className={styles.formFileBoxInfo}>
                            <Description sx={{ width: 100, height: 100 }} />
                            <span>{file?.name}</span>
                    </div> :
                        <div className={styles.formFileBoxInfo}>
                            <UploadFile sx={{ width: 100, height: 100 }} />
                            <span>{file?.name}</span>
                        </div>
                }
                    <input type='file' id='file-input' className={styles.fileInput} hidden onChange={e => handleChangeFile(e)} />
                </label>

                <div className={styles.formBoxButtons}>
                    <Button sx={{
                        backgroundColor: '#002D2B',
                        '&:hover': {
                            backgroundColor: '#85B0B0'
                        }
                    }} component="label" variant="contained" startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={e => handleChangeFile(e)} />
                    </Button>

                    <Button sx={{
                        color: '#85B0B0',
                        borderColor: '#85B0B0',
                        ml: 'auto',
                        '&:hover': {
                            backgroundColor: '#85B0B0',
                            borderColor: '#85B0B0',
                            color: 'white'
                        }
                    }} component="label" variant="outlined" onClick={() => {
                        handleOpen();
                        setFile(undefined);
                        }}>
                        Cancelar
                    </Button>

                    <Button
                        type='submit'
                        disabled={file ? false : true}
                        sx={{
                            backgroundColor: '#002D2B',
                            '&:hover': {
                                backgroundColor: '#85B0B0'
                            }
                        }}
                        variant="contained"
                        >
                        Salvar
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}

export default FileForm;