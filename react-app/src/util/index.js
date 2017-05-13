

export const STAGE = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
export const API_BASE = `https://api.gmavillage.com/${STAGE}`;
export const AUTH_BASE = `https://auth.gmavillage.com/${STAGE}`
