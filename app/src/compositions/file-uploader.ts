import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { S3Credentials } from '@urbit/api';
import { dateToDa, deSig } from '@urbit/api';

import { addNode as groveAddNode } from "@/api/groveAPI"
import {ActionTypes} from '@/store/action-types';

export function prefixEndpoint(endpoint: string) {
  return endpoint.match(/https?:\/\//) ? endpoint : `https://${endpoint}`;
}

function saveToGrove(space, trail, fileObject, store) {
  if (!space || !trail || !('file' in fileObject)) {
    return
  }

  const extensionType = fileObject.file.file.name.split('.')[1]
  let extension
  if (extensionType[0] === '.') {
    extension = extensionType
  } else {
    extension = `.${ extensionType }`
  }

  let name
  if (fileObject.file.file.name.split('.').length === 1) {
    name = fileObject.file.file.name
  } else {
    name = fileObject.file.file.name.split('.')[0]
  }

  const groveFile = {
    trail: trail,
    url: fileObject.publicURL,
    name,
    extension,
  }
  groveAddNode(space, groveFile);
}

export async function uploadFile(file, groveConfig, s3Config, store) {
  const { trail, space } = groveConfig

  const bucket = s3Config.config.currentBucket
  const accessKeyId = s3Config.credentials.accessKeyId
  const secretAccessKey = s3Config.credentials.secretAccessKey

  const endpoint = new URL(prefixEndpoint(s3Config.credentials.endpoint));

  const credentials: S3Credentials = {
    endpoint: s3Config.credentials.endpoint,
    accessKeyId,
    secretAccessKey
  }

  file.status = 'loading';

  const s3Client = new S3Client({
    endpoint: {
      protocol: endpoint.protocol,
      hostname: endpoint.host,
      path: endpoint.pathname || '/',
    },
    region: 'us-east-1',  // required. in the tlon implementation
    credentials,
    forcePathStyle: true,
  });

  const key = `${window.ship}/${deSig(dateToDa(new Date()))}-${file.file.name}`
  const fileSize = file.file.size;
  const fileType = file.file.type;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: fileType,
    ContentLength: fileSize,
    ACL: 'public-read',
  });

  const signedUrl = await getSignedUrl(s3Client, command);

  // must set acl on fetch-style request (vs s3Client 'send))
  const headers = new Headers({
    'x-amz-acl': 'public-read'
  })
  return fetch(signedUrl, { method: 'PUT', body: file.file, headers })
    .then((r) => {
      const response = true
      // update file status for preview:
      file.status = response
      const publicURL = signedUrl.split('?')[0]
      saveToGrove(space, trail, { file, publicURL }, store)
      return r
    })
    .catch((error: any) => {
      console.log('s3 upload error')
      console.log({ error })
      return error
    })
}

export function uploadFiles(files, space, s3Config, store) {
  store.dispatch(ActionTypes.LOADING_SET, 's3UploadButton')
  return Promise.all(files.map((file) => uploadFile(file, space, s3Config, store)))
    .then((r) => {
      store.dispatch(ActionTypes.DISABLED_SET, 's3UploadButton')
      // TODO: store.dispatch(ActionTypes.S3_UPLOAD_DONE) // close + reset s3upload row
    });
}

export default function createUploader(groveConfig, s3Config, store) {
  return {
    uploadFile: function (file) {
      return uploadFile(file, groveConfig, s3Config, store);
    },
    uploadFiles: function (files) {
      return uploadFiles(files, groveConfig, s3Config, store);
    },
  };
}
