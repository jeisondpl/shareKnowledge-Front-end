import { Button, IconButton, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import bytesToSI from './utils/formatSize'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styles from '../styles/uploadFile.module.scss'

export enum FileType {
  PDF = 1,
  JPG = 2,
  JPEG = 3,
  PNG = 4,
  XLS = 5,
  XLSX = 6,
  DOC = 7,
  DOCX = 8,
  MP4 = 9,
  NO_VALID = -1,
  HTML = 10,
  MP3 = 11,
  TIF = 12,
}

const getFileType = (type: string) => {
  switch (type) {
    case 'application/pdf':
      return FileType.PDF
    case 'image/jpg':
      return FileType.JPG
    case 'image/jpeg':
      return FileType.JPEG
    case 'image/png':
      return FileType.PNG
    case 'application/vnd.ms-excel':
      return FileType.XLS
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return FileType.XLSX
    case 'application/msword':
      return FileType.DOC
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return FileType.DOCX
    case 'video/mp4':
      return FileType.MP4
    case 'html':
      return FileType.HTML
    case 'audio/mp3':
      return FileType.MP3
    case 'image/tiff':
      return FileType.TIF
    case 'tif':
      return FileType.TIF
    case 'audio/mpeg':
      return FileType.MP3
    default:
      return FileType.NO_VALID
  }
}

export interface IPhxUploadFile {
  placeholder: string
  showProgress?: boolean
  handleFile: any
  deleteFile?: any
  multiple?: boolean
  files: any[]
  isUniqueFile?: boolean
  listTypeFiles?: string[]
  canDelete?: boolean
  disabled?: boolean
  disabledZone?: boolean
  validateSize?: boolean
}

export default function SpUploadFile(props: IPhxUploadFile) {
  const [files, setFiles] = useState<any[]>(props.files)
  const { canDelete = true, multiple = false, disabled = false, validateSize, disabledZone = false } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleFile = async (e: any) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        //Si el tamaño del archivo es mayor a 20 MB
        const validateSizeUpload = e.target.files[i].size > 20971520
        if (validateSizeUpload && validateSize) {
          setShowModal(true)
          return
        } else if (props.isUniqueFile ? props.listTypeFiles?.includes(e.target.files[i].type) : getFileType(e.target.files[i].type) !== -1) {
          let base64code = await toBase64(e.target.files[i])
            .then((res) => {
              e.target.files[i].base64code = res?.split(',')[1]
              props.handleFile(e.target.files[i])
            })
            .catch((error) => {
              console.log(error, 'mensajesTYpes.ARCHIVO_NO_VALIDO')
            })
        } else {
          console.log('mensajesTYpes.ARCHIVO_NO_VALIDO')
        }
      }
    }
  }

  const deleteFile = (file: any) => {
    props.deleteFile(file)
  }

  const toBase64 = (file: any) => {
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result?.toString())
      reader.onerror = (error) => reject(error)
    })
  }

  useEffect(() => {
    setFiles(props.files)
  }, [props.files])

  return (
    <>
      <Button
        variant='text'
        component='label'
        className={styles.button}
        style={{
          display: !multiple && files?.length <= 0 ? 'block' : '',
        }}
      >
        <div className={styles.uploadFileContainer}>
          <div className={styles.fileIcon}>
            <CloudUploadIcon fontSize='large' />
          </div>
          <p
            style={{
              color: '#c4c4c4',
              textAlign: 'center',
              paddingBottom: 20,
              textTransform: 'none',
            }}
          >
            {props.placeholder}
          </p>
          <input name='file' disabled={disabledZone} onChange={handleFile} type='file' hidden multiple={props.multiple} />
        </div>
      </Button>
      {canDelete === true &&
        files?.map((file, i) => (
          <div key={i}>
            <File file={file} disabled={disabled} deleteFile={deleteFile} />
          </div>
        ))}
      {validateSize === true && console.log('El archivo debe pesar máximo 20MB')}
    </>
  )
}

export function File(props: any) {
  let file = props.file
  let deleteFile = props.deleteFile
  let disabled = props.disabled
  return (
    <>
      <div style={{ display: 'flex' }}>
        <strong style={{ display: 'inline', alignSelf: 'center' }}>{file?.Name || file?.name || 'Archivo'}</strong>
        <IconButton
          disabled={disabled}
          style={{
            display: 'inline',
            marginLeft: 'auto',
          }}
          onClick={() => deleteFile(file)}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
      <LinearProgress variant='determinate' color='primary' value={100} />
      <div style={{ display: 'flex' }}>
        <label style={{ marginLeft: 'auto' }}>{file?.size ? bytesToSI(file?.size) : file?.Size ? file?.Size : ''}</label>
      </div>
    </>
  )
}
