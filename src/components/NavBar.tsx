import React from "react";
import CategoryContainer from "./CategoryContainer";
import CustomerIcon from "../customer.svg";


const NavBar: React.FC = () => {
    return (
        <div className="section section-nav">
            <div className="section-nav-logo">
            <div className="icon-logo">
                logo.png
            </div>
            </div>
            <div className="section-nav-main">
                <CategoryContainer></CategoryContainer>
            </div>
            <div className="section-nav-contact">
                <div className="button-text-contact"><img src={CustomerIcon} alt="" /><span>联系客服</span></div>
            </div>
        </div>
    );
};

export default NavBar;