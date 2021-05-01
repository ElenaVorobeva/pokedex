import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('apiCallBegan');
export const apiCallSuccess = createAction('apiCallSuccess');
export const apiCallFailed = createAction('apiCallFailed');
