import { IconButton, LinearProgress } from '@mui/material';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import 'commons/styles/PhxUploadFile.scss';
import bytesToSI from 'commons/utils/formatSize';
import { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import getFileType from 'modules/process/commons/utils/FileType';
import PhxModalFeedback from 'commons/components/forms/PhxModalFeedback';
import { IconsNotification } from 'commons/icons';
import useMensajesFeedback from 'commons/Mensajeria/reducer/reducers/useMensajesFeedback';
import { mensajesTYpes } from 'commons/Mensajeria/reducer';
import ModalFeedbackState from 'commons/Mensajeria';
import { IconsActions } from 'commons/icons';

export interface IPhxUploadFile {
    placeholder: string;
    showProgress?: boolean;
    handleFile: any;
    deleteFile?: any;
    multiple?: boolean;
    files: any[];
    isUniqueFile?: boolean;
    listTypeFiles?: string[];
    canDelete?: boolean;
    disabled?: boolean;
    disabledZone?: boolean;
    validateSize?: boolean;
}

export default function PhxUploadFile(props: IPhxUploadFile) {
    const [files, setFiles] = useState<any[]>(props.files);
    const { canDelete = true, multiple = false, disabled = false, validateSize, disabledZone = false } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [mensajesValues, dispatch] = useMensajesFeedback();

    const handleFile = async (e: any) => {
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                //Si el tamaño del archivo es mayor a 20 MB
                const validateSizeUpload = e.target.files[i].size > 20971520;
                if (validateSizeUpload && validateSize) {
                    setShowModal(true);
                    return;
                } else if (
                    props.isUniqueFile
                        ? props.listTypeFiles?.includes(e.target.files[i].type)
                        : getFileType(e.target.files[i].type) !== -1
                ) {
                    let base64code = await toBase64(e.target.files[i])
                        .then(res => {
                            e.target.files[i].base64code = res?.split(',')[1];
                            props.handleFile(e.target.files[i]);
                        })
                        .catch(error => {
                            console.log(error);
                            dispatch({
                                type: mensajesTYpes.ARCHIVO_NO_VALIDO,
                                payload: {
                                    action: () => {
                                        dispatch({ type: mensajesTYpes.DEFAULT });
                                    },
                                    cancel: () => dispatch({})
                                }
                            });
                        });
                } else {
                    dispatch({
                        type: mensajesTYpes.ARCHIVO_NO_VALIDO,
                        payload: {
                            action: () => {
                                dispatch({ type: mensajesTYpes.DEFAULT });
                            },
                            cancel: () => dispatch({})
                        }
                    });
                }
            }
        }
    };

    const deleteFile = (file: any) => {
        props.deleteFile(file);
    };

    const toBase64 = (file: any) => {
        return new Promise<string | undefined>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString());
            reader.onerror = error => reject(error);
        });
    };

    useEffect(() => {
        setFiles(props.files);
    }, [props.files]);

    return (
        <div>
            <Button
                variant="text"
                component="label"
                style={{
                    width: '100%',
                    padding: 0,
                    margin: 0,
                    marginTop: '10px',
                    display: !multiple && files?.length <= 0 ? 'block' : ''
                }}
            >
                <div className="Modal-Input-file">
                    <div className="Modal-file-icon">
                        {/* <CloudUploadIcon fontSize="large" /> */}
                        <img
                            style={{ width: '35px' }}
                            src={IconsActions.uploadimg}
                            alt="Icono subir archivo"
                        />
                    </div>
                    <p
                        style={{
                            color: '#c4c4c4',
                            textAlign: 'center',
                            paddingBottom: 20,
                            textTransform: 'none'
                        }}
                    >
                        {props.placeholder}
                    </p>
                    <input name="file" disabled={disabledZone} onChange={handleFile} type="file" hidden multiple={props.multiple} />
                </div>
            </Button>
            {canDelete === true &&
                files?.map((file, i) => (
                    <div key={i}>
                        <File file={file} disabled={disabled} deleteFile={deleteFile} />
                    </div>
                ))}
            {validateSize === true && (
                <PhxModalFeedback
                    img={IconsNotification.exclamationTriangle}
                    textTitle={'El archivo debe pesar máximo 20MB'}
                    textBody={'Debe ingresar un archivo menor a 20MB'}
                    textButton="Entendido"
                    open={showModal}
                    size={30}
                    url={() => setShowModal(false)}
                />
            )}
            <ModalFeedbackState state={mensajesValues} />
        </div>
    );
}

export function File(props: any) {
    let file = props.file;
    let deleteFile = props.deleteFile;
    let disabled = props.disabled;
    return (
        <>
            <div style={{ display: 'flex' }}>
                <strong style={{ display: 'inline', alignSelf: 'center' }}>
                    {file?.Name || file?.name || 'Archivo'}
                </strong>
                <IconButton
                    disabled={disabled}
                    style={{
                        display: 'inline',
                        marginLeft: 'auto'
                    }}
                    onClick={() => deleteFile(file)}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
            <LinearProgress variant="determinate" color="primary" value={100} />
            <div style={{ display: 'flex' }}>
                <label style={{ marginLeft: 'auto' }}>
                    {file?.size ? bytesToSI(file?.size) : file?.Size ? file?.Size : ''}
                </label>
            </div>
        </>
    );
}
