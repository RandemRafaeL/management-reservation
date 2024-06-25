import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { state } from '@angular/animations';

// Typ dla stanu tematu
export type ThemeState = 'dark' | 'light';

// Stan dla części template aplikacji
export interface TemplateState {
    theme: ThemeState;
}

// Całkowity stan aplikacji
export interface AppState {
    template: TemplateState;
}

// Początkowy stan tematu
export const initialTemplateThemeState: TemplateState = {
    theme: 'light', // Domyślny temat
};

// Akcja do zmiany tematu
export const setTemplate = createAction('[Theme] Set Template', props<{ template: TemplateState }>());
export const setTheme = createAction('[Theme] Set Theme', props<{ theme: ThemeState }>());

// Reducer dla tematu
export const themeReducer = createReducer(
    initialTemplateThemeState,
    on(setTemplate, (state, template) => ({ ...state, ...template })),
    on(setTheme, (state, { theme }) => ({ ...state, theme }))
);

// Mapowanie reducerów dla całej aplikacji
export const reducers: ActionReducerMap<AppState> = {
    template: themeReducer,
    // Możesz dodać inne reducery tutaj
};
