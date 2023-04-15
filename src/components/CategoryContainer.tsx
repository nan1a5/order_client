import React from 'react'
// import cake from '../cake.svg'
import { useSelector, useDispatch } from 'react-redux';
import { CategoryListRequestApi } from '../api';
import { ICategoryModel } from '../types';



const CategoryContainer: React.FC = () => {

  const categoryList = useSelector((state: any) => state.page.categorys)
  const pageSelectedID = useSelector((state: any) => state.page.pageSelectedID)
  const dispatch = useDispatch()
  // 保存第一个_id,每次点击时， 如果不同则改变保存的_id,使用state
  // const [currentId, setCurrentId] = React.useState(categoryList[0]._id)

  React.useEffect(() => {
    // 请求分类列表
    CategoryListRequestApi<ICategoryModel[]>().then((res) => {
      // console.log(res);
      dispatch({
        type: 'REQUEST_SET_PAGE',
        payload: res
      })
    }).catch((err) => {
        // 无法获取
    });
  }, [])


  return (
    <>
      <div className='category-container'>
        {
          categoryList.map((category: any, index: any) => {
            return (
              <div className={pageSelectedID !== category._id?'item':'item active'}
              key={index}
              onClick={() => {dispatch({
                type: 'SET_PAGE',
                payload: category._id
              })}}>
                <div style={{overflow: 'hidden'}}>
                  <img src={category.icon} alt={'error'}></img>
                </div>
                <span>{category.categoryname}</span>

                <div className='shape shape_top'></div>
                <div className='shape shape_bottom'></div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default CategoryContainer