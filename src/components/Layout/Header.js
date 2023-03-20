import React from "react";
import mealsImage from "../../assets/meals.jpg";

import classes from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = ({ onShowCart }) => {
	return (
		<>
			<header className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={onShowCart} />
			</header>
			<div className={classes["main-image"]}>
				<img src={mealsImage} alt="Meals " />
			</div>
		</>
	);
};

export default Header;
