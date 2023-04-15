import { ITrolleyItemModel } from "../../types";
export enum TrolleyActionTypes {
    ADD_TO_TROLLEY = 'ADD_TO_TROLLEY',
    UPDATE_TROLLEY = 'UPDATE_TROLLEY',
    REMOVE_FROM_TROLLEY = 'REMOVE_FROM_TROLLEY',
    CLEAR_TROLLEY = 'CLEAR_TROLLEY',
    TROLLEY_LOADING = 'TROLLEY_LOADING',
    TROLLEY_ERROR = 'TROLLEY_ERROR',
    SUBMIT_ORDER = 'SUBMIT_ORDER',
}

export interface TrolleyItem {
    id: string;
    name: string;
    price: number;
    count: number;
    image: string;
}

interface AddToTrolleyAction {
    type: TrolleyActionTypes.ADD_TO_TROLLEY;
    payload: ITrolleyItemModel;
}

interface UpdateTrolleyAction {
    type: TrolleyActionTypes.UPDATE_TROLLEY;
    payload: ITrolleyItemModel;
}

interface RemoveFromTrolleyAction {
    type: TrolleyActionTypes.REMOVE_FROM_TROLLEY;
    payload: string;
}

interface ClearTrolleyAction {
    type: TrolleyActionTypes.CLEAR_TROLLEY;
}

interface TrolleyLoadingAction {
    type: TrolleyActionTypes.TROLLEY_LOADING;
}

interface TrolleyErrorAction {
    type: TrolleyActionTypes.TROLLEY_ERROR;
    payload: string;
}

// 提交订单
export interface OrderItem {
    recipe: {
        _id: string;
        count: number;
    }[]
    openid: string;
    ordertotalprice: number;
}

interface SubmitOrderAction {
    type: TrolleyActionTypes.SUBMIT_ORDER;
}

export type TrolleyAction = AddToTrolleyAction | RemoveFromTrolleyAction | ClearTrolleyAction | TrolleyLoadingAction | TrolleyErrorAction | UpdateTrolleyAction | SubmitOrderAction;