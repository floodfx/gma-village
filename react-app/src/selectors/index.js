import { createSelector } from 'reselect';

export const getUser = state => state.user
export const getCookie = state => state.cookie
export const getAccessToken = state => state.cookie.account_kit_access_token
