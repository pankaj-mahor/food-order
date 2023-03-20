import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCart.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);

	// console.log(cartCtx.items);
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((groupedCartItemQty, cartItem) => {
		// console.log("Grouped : " + groupedCartItemQty);
		// console.log("Item : " + cartItem);
		return groupedCartItemQty + cartItem.amount;
	}, 0);

	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) return;

		setBtnIsHighlighted(true);

		//Remove Class Animation
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<>
			<button onClick={props.onClick} className={btnClasses}>
				<span className={classes.icon}>
					<CartIcon />
				</span>
				<span>Your Cart</span>
				<span className={classes.badge}> {numberOfCartItems}</span>
			</button>
		</>
	);
};

export default HeaderCartButton;
