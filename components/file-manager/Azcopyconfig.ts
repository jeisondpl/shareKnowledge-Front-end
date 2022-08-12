import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';

interface ISasInfo {
    Storage: string;
    Container: string;
    Blob: string;
}
class AzCopy {
    uploadBlob = async (sasInfo: ISasInfo, file: any, fileParsed: any) => {
        try {
            if (sasInfo && sasInfo.Storage !== '') {
                const blobServiceClient = new BlobServiceClient(sasInfo.Storage, new AnonymousCredential());
                console.log('File to send', file);
                const containerClient = blobServiceClient.getContainerClient(sasInfo.Container);
                const blockBlobClient = containerClient.getBlockBlobClient(
                    sasInfo.Blob.concat(`.${fileParsed.type.split('/')[1]}`)
                );
                const uploadBlobResponse = await blockBlobClient.upload(file, file.size);
                console.log('Blob was uploaded successfully. requestId: ', uploadBlobResponse.requestId);
            }
            return true;
        } catch (error) {
            console.log('Error uploading blob...', error);
            return false;
        }
    };

    // return list of blobs in container to display
    getBlobsInContainer = async (sasInfo: ISasInfo) => {
        const returnedBlobUrls: string[] = [];
        if (sasInfo && sasInfo.Storage !== '') {
            const blobServiceClient = new BlobServiceClient(sasInfo.Storage, new AnonymousCredential());
            console.log('Getting blobs...');
            const containerClient = blobServiceClient.getContainerClient('phx-audio-video');
            // get list of blobs in container
            // eslint-disable-next-line
            for await (const blob of containerClient.listBlobsFlat()) {
                // if image is public, just construct URL
                returnedBlobUrls.push(
                    `https://saaeusdmdev.blob.core.windows.net/${sasInfo.Container}/${blob.name}`
                );
            }

            console.log('Blobs fetched', returnedBlobUrls);
        }
        return returnedBlobUrls;
    };
}

export default new AzCopy();
