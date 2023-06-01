import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		// cartCtx.addItem(item);
		cartCtx.addItem({
			...item,
			amount: 1,
		});
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		const response = await fetch(
			"https://food-a3413-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderdItems: cartCtx.items,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Something Went Wrong, Please try again");
		}

		setIsSubmitting(false);
		setDidSubmit(true);

		cartCtx.clearCart();
	};

	// const getOrderdItemDetails = async () => {
	// 	// setIsSubmitting(true);
	// 	const response = await fetch(
	// 		"https://food-a3413-default-rtdb.firebaseio.com/orders.json"
	// 	);

	// 	if (!response.ok) {
	// 		throw new Error("Something Went Wrong, Please try again");
	// 	}

	// 	const responseData = await response.json();

	// 	console.log(responseData);
	// 	// setIsSubmitting(false);
	// 	// setDidSubmit(true);
	// };

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx?.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	// useEffect(() => {
	// 	getOrderdItemDetails();
	// }, [didSubmit]);
	const cardModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onClose={props.onHideCart}
					onSubmit={submitOrderHandler}
					setIsCheckout={setIsCheckout}
				/>
			)}

			{!isCheckout && (
				<div className={classes.actions}>
					<button onClick={props.onHideCart} className={classes["button--alt"]}>
						Close
					</button>
					{hasItems && (
						<button className={classes.button} onClick={orderHandler}>
							Order Now
						</button>
					)}
				</div>
			)}
		</>
	);

	const isSubmittingModalContent = <p>Sending Order Data.....</p>;
	const didSubmitModalContent = <p>Successfully Placed an order!</p>;
	return (
		<Modal onHideCart={props.onHideCart}>
			{!isSubmitting && !didSubmit && cardModalContent}

			{isSubmitting && isSubmittingModalContent}

			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
