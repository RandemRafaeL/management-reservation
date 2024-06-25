// Selektory
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as user from './index';

export const FEATURE_USER = 'rl-user';

const userSelectFeature = createFeatureSelector<user.UserState>(FEATURE_USER);
export const userSelectState = createSelector(userSelectFeature, (state: user.UserState) => state);
