import React from "react";
import Trolley from "./Trolley";
import BillCheck from "./BillCheck";
import Space from "./Space";


const SideBar: React.FC = () => {
    return (
        <div className="section section-trolley">
                <Space height={'4%'}></Space>
                <Trolley className="trolley"></Trolley>
                <Space></Space>
                <BillCheck className='billcheck'></BillCheck>
        </div>
    );
};

export default SideBar;