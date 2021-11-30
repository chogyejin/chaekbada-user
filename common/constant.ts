export const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' ? true : false;

export const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
export const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;

// 'http://chaekbadabackend-env.eba-wmmnpxhk.ap-northeast-2.elasticbeanstalk.com';

export const BACKEND_ENDPOINT = IS_PRODUCTION
  ? 'http://localhost:4000'
  : 'http://localhost:4000';
export const S3_BUCKET_BASE_URL =
  'https://chaekbada-image.s3.ap-northeast-2.amazonaws.com/';
export const S3_BUCKET = 'chaekbada-image';
export const REGION = 'ap-northeast-2';
