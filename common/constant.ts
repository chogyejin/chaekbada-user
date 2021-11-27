export const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' ? true : false;

export const BACKEND_ENDPOINT = IS_PRODUCTION ? '' : 'http://localhost:4000';
export const S3_BUCKET_BASE_URL =
  'https://chaekbada-image.s3.ap-northeast-2.amazonaws.com/';
export const S3_BUCKET = 'chaekbada-image';
export const REGION = 'ap-northeast-2';
