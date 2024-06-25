import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { state } from '@angular/animations';

export const appearanceNavMenu_initial: RlAppearanceNavMenu = {
    onlyIcons: false,
    toolTip: true,
};
export interface RlAppearanceNavMenu {
    onlyIcons: boolean;
    toolTip: boolean;
}

export interface RlNavMenuItem {
    matIcon: string | 'divider' | 'space' | 'space-sm' | 'space-lg' | 'space-grow';
    title?: string;
    subTitle?: string;
    route?: string;
}

export type RlNavMenuItems = RlNavMenuItem[];

export interface RlNavMenuState {
    items: RlNavMenuItems;
    selectedItem?: RlNavMenuItem;
    onlyIcons: boolean;
}
export const setNavMenuItems = createAction('[NavMenu] Set Items', props<{ items: RlNavMenuItems }>());
export const setNavItem = createAction('[NavMenu] Select Item', props<{ selectedItem: RlNavMenuItem }>());
export const toggleLabels = createAction('[NavMenu] Toggle label');
export const setLabels = createAction('[NavMenu] Set label', props<{ onlyIcons: boolean }>());

// Poprawiony stan początkowy
const initialNavMenuState: RlNavMenuState = {
    items: [],
    selectedItem: undefined,
    onlyIcons: false,
};
export const navMenuReducer = createReducer(
    initialNavMenuState,
    on(setNavMenuItems, (state, { items }) => ({ ...state, items })),
    on(setNavItem, (state, { selectedItem }) => ({ ...state, selectedItem })),
    on(toggleLabels, state => ({ ...state, onlyIcons: !state.onlyIcons })),
    on(setLabels, (state, { onlyIcons }) => ({ ...state, onlyIcons }))
);

// Selektory
export const selectNavMenuFeature = createFeatureSelector<RlNavMenuState>('navMenu');
export const selectNavMenuItems = createSelector(selectNavMenuFeature, (state: RlNavMenuState) => state.items);
export const selectSelectedItem = createSelector(selectNavMenuFeature, (state: RlNavMenuState) => state.selectedItem);
export const selectOnlyIcons = createSelector(selectNavMenuFeature, (state: RlNavMenuState) => state.onlyIcons);
