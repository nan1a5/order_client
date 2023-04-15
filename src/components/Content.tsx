import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRecipeModel } from "../types";
import { RecipeListRequestApi } from "../api";
import { ITrolleyItemModel } from "../types";

const Content: React.FC = () => {

    const currentPageName = useSelector((state: any) => state.page.currentPageName);
    const dispatch = useDispatch();
    const [count, setCount] = React.useState(1);
    const [selections, setSelections] = React.useState<string[]>([]);
    const [recipe, setRecipe] = React.useState<IRecipeModel>(
        {
            recipename: '',
            recipedescription: '',
            price: '0',
            image: [''],
            _id: ''
        }
    );
    const [recipes_list, setRecipes_list] = React.useState<Array<IRecipeModel>>([])

    const increase = () => {
        setCount(count => count + 1);
    }
    const decrease = () => {
        setCount(count => {
            if (count > 1) {
                return count - 1;
            }
            return count;
        });
    }
    const submit = () => {
        console.log('====================================');
        console.log('提交');
        console.log('====================================');
        const trolleyItem: ITrolleyItemModel = {
            id: recipe?._id,
            name: recipe?.recipename,
            price: Number(recipe?.price),
            count: count,
            image: recipe?.image[0],
        }
        dispatch({
            type: 'ADD_TO_TROLLEY',
            payload: trolleyItem
        })
    }


    // 请求数据
    React.useEffect(() => {
        RecipeListRequestApi<Array<IRecipeModel>>({categoryname: currentPageName}).then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            setRecipe(res[0]);
            setRecipes_list(res);
        }).catch(err => {
        //    console.log('查无');
           
        })
    },[currentPageName])

    return (
        <div className="content">
            {/* {currentPageName} */}
            <div className="content-container">
                <div className="content-nav">
                    {
                        recipe && recipes_list.map((item, index) => {
                            return (
                                <div className="content-nav-item" key={index}>
                                    <img src={item.image[0]} alt="" />
                                    <div>
                                        <span className="name">{item.recipename}</span>
                                        <p className="descripe">{item.recipedescription}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="content-main">
                    <div className="content-left">
                        <div className="content-left-image" style={{gridArea: "a"}}>
                            <img src={recipe?.image[0]} alt="" />
                        </div>
                        <div className="content-left-info" style={{gridArea: "b"}}>
                            <h3 className="name">{recipe?.recipename}</h3>
                            <span className="price">￥{recipe?.price}</span>
                            <p className="descripe">{recipe?.recipedescription}</p>
                        </div>
                        <div className="content-left-selection" style={{gridArea: "c"}}>
                            <div className="selections">
                                <h4>选项一</h4>
                                <input type="radio" name="group_1" id="normal" />
                                <label htmlFor="normal">常温</label>
                                <input type="radio" name="group_1" id="ice" />
                                <label htmlFor="ice">加冰</label>
                                <input type="radio" name="group_1" id="hot" />
                                <label htmlFor="hot">加热</label>
                            </div>
                            <div className="selections">
                                <h4>选项二</h4>
                                <input type="radio" name="group_2" id="normal" />
                                <label htmlFor="normal">常温</label>
                                <input type="radio" name="group_2" id="ice" />
                                <label htmlFor="ice">加冰</label>
                                <input type="radio" name="group_2" id="hot" />
                                <label htmlFor="hot">加热</label>
                            </div>
                        </div>
                    </div>
                    <div className="content-right">
                        <p>{recipe?.recipename}</p>
                        <p>count: {count}</p>
                        <p>price: ￥{Number(recipe?.price) * count}</p>
                        <p>selections:</p>
                        <p></p>
                        <p></p>
                        <p>
                            <input type="button" value="减一" onClick={decrease} />
                            <input type="button" value="加一" onClick={increase}/>
                            <input type="button" value="提交" onClick={submit}/>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content;