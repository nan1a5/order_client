import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useModal } from "../hooks/useModal";
import { useDialog } from "../hooks/useDialog";

interface BillCheckProps {
    className?: string;
}

const BillCheck: React.FC<BillCheckProps> = ({
    className = ''
}) => {

    const show: Function = useDialog('sm');

    const trolleyTotal = useSelector((state: any) => state.trolley.trolleyTotal);
    const dispatch = useDispatch();

    const submitOrder: React.MouseEventHandler = (e) => {
        show({
                title: '提交订单',
                msg: '确定要提交订单吗？',
            },() => {
                dispatch({
                    type: 'SUBMIT_ORDER'
                });
            }, () => console.log('cancel'),
        );
        
    }

    return (
        <div className={className}>
            <div className="billcheck-wrapper">
                 <div className="billcheck-main">
                    <div className="title">
                        <span>订单信息</span>
                    </div>
                    <div className="section subtotal">
                        <span className="name"><span className="icon icon-coin-yen"></span><span>合计:</span></span>
                        <span className="value">+{trolleyTotal}</span>
                    </div>
                    <div className="section discount">
                        <span className="name"><span className="icon icon-credit-card"></span><span>优惠:</span></span>
                        <span className="value">-0</span>
                    </div>
                    <div className="section total">
                        <span className="name"><span className="icon icon-coin-yen"></span><span>总计:</span></span>
                        <span className="value"> ={trolleyTotal} </span>
                    </div>
                 </div>
                 <div className="billcheck-footer">
                    <button className="button_submit"
                     onClick={submitOrder}
                    >
                        <span className="icon icon-pencil"></span>
                        <span>提交订单</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default BillCheck;