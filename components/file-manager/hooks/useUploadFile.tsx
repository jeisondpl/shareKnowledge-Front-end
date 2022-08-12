import { FileType } from 'modules/process/commons/utils/FileType';
import FileServices from 'modules/process/services/fileupload.service';
import IFile from 'modules/process/types/IFile';
import React, { useState } from 'react';
import AzCopy from '../Azcopyconfig';

interface IUploadFile {}

export default function useUploadFile() {
    const date = new Date();
    const [isLoading, setIsLoading] = useState<boolean>(false); //Uselo si lo necesita para mostrar algo mientras se carga
    // const [response, setResponse] = useState<any>(); // Uselo si necesita algo de la respuesta

    const LoadFileAsync = async (file: any, fileFromInput: any) => {
        try {
            file.customPath = `${date.getFullYear()}/${date.getMonth() + 1}`;
            if (file.type === FileType.MP4 || file.type === FileType.MP3) {
                file.base64content = '';
                file.base64code = '';
            }
            console.log('Body file to send', file);
            let response = await FileServices.post('files', file);
            try {
                const obj: any = response.data;
                let parsedSAS = JSON.parse(obj);
                return await AzCopy.uploadBlob(parsedSAS, fileFromInput, file);
            } catch (error) {
                return true;
            }
        } catch (error) {
            console.log('Error cargando documento', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { LoadFileAsync, isLoading };
}
