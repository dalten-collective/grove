import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { dateToDa, deSig } from '@urbit/api';
import { useFileStore, useStorage } from '@/state/storage';
function useFileUpload() {
    const { s3, ...storage } = useStorage();
    const { credentials } = s3;
    const { client, setFiles, createClient, setStatus, setFileStatus, setErrorMessage, setFileURL, } = useFileStore();
    const [hasCredentials, setHasCredentials] = useState(false);
    useEffect(() => {
        const hasCreds = credentials?.accessKeyId &&
            credentials?.endpoint &&
            credentials?.secretAccessKey;
        if (hasCreds) {
            setHasCredentials(true);
        }
    }, [credentials]);
    const initClient = useCallback(async () => {
        if (credentials) {
            await createClient(credentials);
            setStatus('success');
        }
    }, [createClient, credentials, setStatus]);
    useEffect(() => {
        if (hasCredentials && !client) {
            initClient();
        }
    }, [client, hasCredentials, initClient]);
    const uploadFile = useCallback(async (upload) => {
        if (!client) {
            return;
        }
        const { file, key } = upload;
        setFileStatus([key, 'loading']);
        const command = new PutObjectCommand({
            Bucket: s3.configuration.currentBucket,
            Key: key,
            Body: file,
            ContentType: file.type,
            ContentLength: file.size,
            ACL: 'public-read',
        });
        const url = await getSignedUrl(client, command);
        client
            .send(command)
            .then(() => {
            setFileStatus([key, 'success']);
            setFileURL([key, url.split('?')[0]]);
        })
            .catch((error) => {
            setFileStatus([key, 'error']);
            setErrorMessage([
                key,
                `S3 upload error: ${error.message}, check your S3 configuration.`,
            ]);
            console.log({ error });
        });
    }, [client, setFileStatus, s3, setFileURL, setErrorMessage]);
    const uploadFiles = useCallback(async (files) => {
        if (!files)
            return;
        const newFiles = _.keyBy([...files].map((file) => ({
            file,
            key: `${window.ship}/${deSig(dateToDa(new Date()))}-${file.name}`,
            for: window.ship,
            status: 'initial',
            url: '',
        })), 'key');
        _.map(newFiles, (file) => setFiles(file));
        _.map(newFiles, (file) => uploadFile(file));
    }, [setFiles, uploadFile]);
    const onFiles = useCallback((e) => uploadFiles(e.target.files), [uploadFiles]);
    const promptUpload = useCallback((fileId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.id = fileId;
        input.accept = 'image/*,video/*,audio/*';
        input.addEventListener('change', (e) => {
            onFiles(e);
        });
        input.click();
    }, [onFiles]);
    return {
        storage,
        hasCredentials,
        loaded: storage.loaded,
        uploadFiles,
        promptUpload,
    };
}
export default useFileUpload;
