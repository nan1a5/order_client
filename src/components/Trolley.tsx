import React from 'react';
import './components.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useDialog } from '../hooks/useDialog';

interface TrolleyProps {
    className?: string;
}

// interface TrolleyState {
//     recipeList: Array<any>;
// }

const Trolley: React.FC<TrolleyProps> = ({
    className = ''
}) => {

    const recipeList = useSelector((state: any) => state.trolley.trolley);
    const dispatch = useDispatch();
    const show: Function = useDialog('sm');

    // 移除购物车中的某个菜品
    const removeFromTrolley: React.MouseEventHandler = (e) => {
        const target = e.currentTarget as any;
        const id = target.dataset.id;

        show({
                title: '移除菜品',
                msg: '确定要移除该菜品吗？',
            },() => {
                dispatch({
                    type: 'REMOVE_FROM_TROLLEY',
                    payload: id
                });
            }
        );
    }

    // 清空购物车
    const ClearTrolley: React.MouseEventHandler = (e) => {
        show({
                title: '清空购物车',
                msg: '确定要清空购物车吗？',
            },() => {
                dispatch({
                    type: 'CLEAR_TROLLEY'
                });
            }
        );
    }

    // 显示或隐藏购物车中的某个菜品的数量
    const hideOrshowCounts: React.MouseEventHandler = (e) => {
        const target = e.currentTarget as any;

        const from_style = {
            borderTop: '#e5e5e5 1px solid',
            padding: '5px',
            height: '30px'
        }
        const to_style = {
            borderTop: 'none',
            padding: '0px',
            height: '0px'
        }
        
        // 获取当前点击的元素的子元素.recipe_item_count
        const recipe_item_count = target.querySelector('.recipe_item_count');

        const height = recipe_item_count.style.height;

        if (height === to_style.height) {

            recipe_item_count.style.borderTop = from_style.borderTop;
            recipe_item_count.style.padding = from_style.padding;
            recipe_item_count.style.height = from_style.height;

            const siblings = target.parentNode.children;
            for (let i = 0; i < siblings.length; i++) {
                const sibling = siblings[i];
                if (sibling !== target) {
                    const sibling_recipe_item_count = sibling.querySelector('.recipe_item_count');
                    sibling_recipe_item_count.style.borderTop = to_style.borderTop;
                    sibling_recipe_item_count.style.padding = to_style.padding;
                    sibling_recipe_item_count.style.height = to_style.height;
                }
            }
        } else {
            recipe_item_count.style.borderTop = to_style.borderTop;
            recipe_item_count.style.padding = to_style.padding;
            recipe_item_count.style.height = '0px';
        }
    } 
     
    // 阻止事件冒泡
    const preventPropagation: React.MouseEventHandler = (e) => {
        e.stopPropagation();
    }

    
    return (
        <div className={className}>
            <div className="trolley-wrapper">
                {
                    recipeList.length > 0 ? 
                        <>
                            <div className='trolley-main'>
                                {
                                    recipeList.map((recipe: any, index: any) => {
                                        return (
                                            <div className="recipe_item" onClick={hideOrshowCounts} key={index}>
                                                <div className='recipe_item_info'>
                                                    <div className="img">
                                                        <img src={recipe.image} alt="" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="item_name">
                                                            <span>{recipe.name}*{recipe.count}</span>
                                                        </div>
                                                        <div className="item_price">
                                                            <span>{recipe.price*recipe.count}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="recipe_item_count"
                                                style={{borderTop: '#e5e5e5 1px solid',height: '0', padding: '0'}}
                                                onClick={preventPropagation}>
                                                    <div className='delete'>
                                                        <span onClick={removeFromTrolley} data-id={recipe.id}>delete</span>
                                                    </div>
                                                    <div className="minus">
                                                        <span className="icon icon-minus"></span>
                                                    </div>
                                                    <div className="number">
                                                        <input value={recipe.count} type="text" readOnly/>
                                                    </div>
                                                    <div className="plus">
                                                        <span className="icon icon-plus"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='trolley-footer'>
                                <button className="clear_all_button" onClick={ClearTrolley}>
                                    <span className='icon icon-bin' style={{verticalAlign: 'base-line', margin: '0'}}></span><span>全部清空</span>
                                </button>
                            </div>
                        </> 
                    : 
                        <div className="empty">
                            <span className="icon-cart"></span>
                            <span>空空如也</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default Trolley;