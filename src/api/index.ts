import request from "./request";

export const RecipeListRequestApi = <T>(params?: any) => request.get<T>('/recipes/listbycategory', params);
export const CategoryListRequestApi = <T>(params?: any) => request.get<T>('category/list', params);
export const OrderAddRequestApi = <T>(params?: any) => request.post<T>('/order/add', params);