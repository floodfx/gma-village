

export const STAGE = process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev';
export const API_BASE = `https://api.gmavillage.com/${STAGE}`;
export const AUTH_BASE = `https://auth.gmavillage.com/${STAGE}`
