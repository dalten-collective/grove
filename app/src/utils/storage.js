export const handleMissingCredentials = (err) => {
  console.error(storageErrorCopy.credentialsMissing);
};

export const storageErrorCopy = {
  accessDenied: 'Access Denied. Check your S3 configuration.',
  bucketNotFound: 'Bucket not found. Check your S3 configuration.',
  credentialsError: 'Credentials error. Check your S3 configuration.',
  credentialsMissing:
    'Missing storage credentials. Check your S3 configuration.',
};
