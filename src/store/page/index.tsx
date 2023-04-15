// import { IRecipeModel } from './types';
import {ICategoryModel} from '../../types'
import cake from '../../cake.svg';

interface PageState {
    categorys: ICategoryModel[];
    pageSelectedID: String;
    currentPageName: String;
}

const initialState: PageState = {
    categorys: [
        {
            _id: '5f1f1b0b0b0b0b0b0b0b0b0b',
            categoryname: '甜品',
            categorydescription: '甜品',
            icon: cake
        }, {
            _id: '5f1f1b0b0b0b0b0b0b0b0b0c',
            categoryname: '饮品',
            categorydescription: '饮品',
            icon: cake
        }, {
            _id: '5f1f1b0b0b0b0b0b0b0b0b0d',
            categoryname: '主食',
            categorydescription: '主食',
            icon: cake
        }, {
            _id: '5f1f1b0b0b0b0b0b0b0b0b0e',
            categoryname: '小吃',
            categorydescription: '小吃',
            icon: cake
        }, {
            _id: '5f1f1b0b0b0b0b0b0b0b0b0f',
            categoryname: '热菜',
            categorydescription: '热菜',
            icon: cake
        }, {
            _id: '5f1f1b0b0b0b0b0b0b0b0b10',
            categoryname: '凉菜',
            categorydescription: '凉菜',
            icon: cake
        }
    ],
    pageSelectedID: '5f1f1b0b0b0b0b0b0b0b0b0b',
    currentPageName: '甜品',
};

export const pageReducer = (state = initialState, action: any): PageState => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...state,
                pageSelectedID: action.payload,
                currentPageName: state.categorys.find((item: any) => item._id === action.payload)?.categoryname || '甜品'
            };
        case 'REQUEST_SET_PAGE':
            // console.log('====================================');
            // console.log('REQUEST_SET_PAGE');
            // console.log('====================================');
            return {
                ...state,
                categorys: action.payload,
                pageSelectedID: action.payload[0]._id,
                currentPageName: action.payload[0].categoryname
            };
        default:
            return state;
    }
};