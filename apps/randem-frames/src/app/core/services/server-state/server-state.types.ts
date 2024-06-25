export const STATE_LIST_VIEW_KEY = 'LIST_VIEW';
export const STATE_MENU_VIEW_KEY = 'MENU_VIEW';
export const STATE_FILTER_VIEW_KEY = 'FILTER_VIEW';

export type StateValueTypes = {
    [STATE_LIST_VIEW_KEY]: 'list' | 'small' | 'full' | 'custom';
    [STATE_MENU_VIEW_KEY]: 'icons' | 'noIcons';
    [STATE_FILTER_VIEW_KEY]: boolean;
};

export type ListStateKeys = keyof StateValueTypes;
