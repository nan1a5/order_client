export interface ICategoryModel {
    _id: string;
    categoryname: string;
    categorydescription: string;
    icon: string;
}

export interface IRecipeModel {
    _id: string;
    recipename: string;
    recipedescription: string;
    price: string,
    image: Array<string>
}

interface recipe {
    recipe_id: string,
    count: number
}

export interface IOrderModel {
    order_id?: string;
    open_id: string;
    create_time: Date | string;
    recipes: Array<recipe>,
    ordertotalprice: number,
    orderstatus: -1 | 0 | 1
}

export interface ITrolleyItemModel {
    id: string;
    name: string;
    price: number;
    count: number;
    image: string;
}