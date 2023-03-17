import urbitAPI from "./urbitAPI";
import { S3UpdateRemoveBucket } from '@urbit/api'

export function subscribeToS3(onEvent) {
  urbitAPI.subscribe({
    app: 's3-store',
    path: '/all',
    event: (data) => {
      onEvent(data)
    }
  })
}

