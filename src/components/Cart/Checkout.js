import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const Checkout = ({ setIsCheckout, onClose, onSubmit }) => {
	// const [formInputTouched, setFormInputTouced] = useState({
	// 	name: false,
	// 	address: false,
	// 	pincode: false,
	// 	city: false,
	// });

	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		address: true,
		pincode: true,
		city: true,
	});

	const nameInputRef = useRef();
	const addressInputRef = useRef();
	const pincodeInputRef = useRef();
	const cityInputRef = useRef();

	const isEmpty = (value) => value.trim() === "";
	const isValidPin = (value) => value.trim().length === 6;

	const confirmHandler = (e) => {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredPincode = pincodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredAddressIsValid = !isEmpty(enteredAddress);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPincodeIsValid = isValidPin(enteredPincode);

		setFormInputValidity({
			name: enteredNameIsValid,
			address: enteredAddressIsValid,
			pincode: enteredPincodeIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredAddressIsValid &&
			enteredCityIsValid &&
			enteredNameIsValid &&
			enteredPincodeIsValid;

		if (!formIsValid) {
			return;
		}

		//submit cart data
		onSubmit({
			name: enteredName,
			address: enteredAddress,
			pincode: enteredPincode,
			city: enteredCity,
		});
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					!formInputValidity.name && classes.invalid
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter Valid name</p>}
			</div>

			<div
				className={`${classes.control} ${
					!formInputValidity.address && classes.invalid
				}`}
			>
				<label htmlFor="address">Full address</label>
				<input type="text" id="address" ref={addressInputRef} />
				{!formInputValidity.address && <p>Please enter Valid address</p>}
			</div>

			<div
				className={`${classes.control} ${
					!formInputValidity.pincode && classes.invalid
				}`}
			>
				<label htmlFor="pincode">Pincode</label>
				<input type="text" id="pincode" ref={pincodeInputRef} />
				{!formInputValidity.pincode && <p>Please enter Valid Pincode</p>}
			</div>

			<div
				className={`${classes.control} ${
					!formInputValidity.city && classes.invalid
				}`}
			>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter Valid City</p>}
			</div>
			<br />
			<div className={classes.actions}>
				<button type="button" onClick={onClose}>
					Close
				</button>
				<button type="button" onClick={() => setIsCheckout(false)}>
					Cancel Checkout
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
