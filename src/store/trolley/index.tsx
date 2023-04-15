import { TrolleyAction, TrolleyActionTypes, OrderItem } from './types';
import { ITrolleyItemModel, IOrderModel } from '../../types';
import { OrderAddRequestApi } from '../../api';

interface TrolleyState {
    trolley: ITrolleyItemModel[];
    trolleyTotal: number;
    trolleyCount: number;
    trolleyLoading: boolean;
    trolleyError: string;
}

const initialState: TrolleyState = {
    trolley: [
        // {
        //     id: '1',
        //     name: 'Product 1',
        //     price: 10,
        //     count: 1,
        //     image: '',
        // }
    ],
    trolleyTotal: 0,
    trolleyCount: 0,
    trolleyLoading: false,
    trolleyError: '',
};

export const trolleyReducer = (state = initialState, action: TrolleyAction): TrolleyState => {
    switch (action.type) {
        case TrolleyActionTypes.ADD_TO_TROLLEY:
            if (state.trolley.find((x) => x.id === action.payload.id)) {
                // 移除原先的
                const item = state.trolley.find((x) => x.id === action.payload.id);
                if (item) {
                    state.trolley = state.trolley.filter((x) => x.id !== action.payload.id)
                    state.trolleyTotal = state.trolleyTotal - item.price * item.count;
                    state.trolleyCount = state.trolleyCount - 1;
                   
                    return {
                        ...state,
                        trolley: [...state.trolley, action.payload],
                        trolleyTotal: state.trolleyTotal + action.payload.price * action.payload.count,
                        trolleyCount: state.trolleyCount + 1,
                    };
                }
            }
            return {
                ...state,
                trolley: [...state.trolley, action.payload],
                trolleyTotal: state.trolleyTotal + action.payload.price*action.payload.count,
                trolleyCount: state.trolleyCount + 1,
            };
        case TrolleyActionTypes.UPDATE_TROLLEY:
            const itemIndex = state.trolley.findIndex((x) => x.id === action.payload.id);
            if (itemIndex === -1) {
                return {
                    ...state,
                    trolleyError: 'Item not found',
                };
            }
            const trollleyItem = state.trolley[itemIndex];
            if (trollleyItem.count === action.payload.count) {
                return state;
            }
            if (action.payload.count === 0) {
                return {
                    ...state,
                    trolley: state.trolley.filter((x) => x.id !== action.payload.id),
                    trolleyTotal: state.trolleyTotal - trollleyItem.price,
                    trolleyCount: state.trolleyCount - 1,
                };
            }
            const updatedItem = {
                ...trollleyItem,
                count: action.payload.count,
            };
            const updatedTrolley = [...state.trolley];
            updatedTrolley[itemIndex] = updatedItem;
            return {
                ...state,
                trolley: updatedTrolley,
                trolleyTotal: state.trolleyTotal + (updatedItem.price - trollleyItem.price),
            };
        case TrolleyActionTypes.REMOVE_FROM_TROLLEY:
            const item = state.trolley.find((x) => x.id === action.payload);
            if (!item) {
                return {
                    ...state,
                    trolleyError: 'Item not found',
                };
            }
            return {
                ...state,
                trolley: state.trolley.filter((x) => x.id !== action.payload),
                trolleyTotal: state.trolleyTotal - item.price,
                trolleyCount: state.trolleyCount - 1,
            };
        case TrolleyActionTypes.CLEAR_TROLLEY:
            return {
                ...state,
                trolley: [],
                trolleyTotal: 0,
                trolleyCount: 0,
            };
        case TrolleyActionTypes.TROLLEY_LOADING:
            return {
                ...state,
                trolleyLoading: true,
            };
        case TrolleyActionTypes.TROLLEY_ERROR:
            return {
                ...state,
                trolleyError: action.payload,
            };
        case TrolleyActionTypes.SUBMIT_ORDER:
            if (state.trolley.length === 0) {
                return {
                    ...state,
                    trolleyError: 'Trolley is empty',
                }
            }
            let recipes: { recipe_id: string, count: number }[] = [];
            for (let i = 0; i < state.trolley.length; i++) {
                recipes.push({ recipe_id: state.trolley[i].id, count: state.trolley[i].count });
            }
            const order: IOrderModel = {
                recipes: recipes,
                open_id: 'FROM_REACT_APP',
                ordertotalprice: state.trolleyTotal,
                create_time: new Date(),
                orderstatus: 0
            };
            // 上传订单
            OrderAddRequestApi<any>(order).then(res => {
                console.log('====================================');
                console.log('OrderADDRequestAPI_RESULT:' + res);
                console.log('====================================');

                // 清空购物车

            })

            // console.log('====================================');
            // console.log('order', order);
            // console.log('====================================');


            return {
                ...state,
                trolley: [],
                trolleyTotal: 0,
                trolleyCount: 0,
            };
        default:
            return state;
    }
}