import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
// import RecipeChoosePage from "../views/RecipeChoosePage";
import { CategoryListRequestApi }from "../api/index";
import'./Main.scss';

const main: React.FC = () => {



    return (
        <div className="main">
            <NavBar></NavBar>
            <Content></Content>
            <SideBar></SideBar>
        </div>
    );
};

export default main;