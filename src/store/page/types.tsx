import {ICategoryModel} from '../../types'

export enum PageActionTypes {
    SET_PAGE = 'SET_PAGE',
    REQUEST_SET_PAGE = 'REQUEST_SET_PAGE',
}

interface SetPageAction {
    type: PageActionTypes.SET_PAGE;
    payload: string;
}

interface RequestSetPageAction {
    type: PageActionTypes.REQUEST_SET_PAGE;
    payload: Array<ICategoryModel>;
}

export type PageAction = SetPageAction | RequestSetPageAction;