

export const STAGE = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
export const API_BASE = `https://c831z4lync.execute-api.us-west-2.amazonaws.com/${STAGE}`;
export const AUTH_BASE = `https://auth.gmavillage.com/${STAGE}`
