import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
// 	{
// 		id: "m1",
// 		name: "Sushi",
// 		description: "Finest fish and veggies",
// 		price: 22.99,
// 	},
// 	{
// 		id: "m2",
// 		name: "Schnitzel",
// 		description: "A german specialty!",
// 		price: 16.5,
// 	},
// 	{
// 		id: "m3",
// 		name: "Barbecue Burger",
// 		description: "American, raw, meaty",
// 		price: 12.99,
// 	},
// 	{
// 		id: "m4",
// 		name: "Green Bowl",
// 		description: "Healthy...and green...",
// 		price: 18.99,
// 	},
// ];

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const response = await fetch(
				"https://food-a3413-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went Wrong");
			}

			const responseData = await response.json();

			const _loadedMeals = [];

			for (const key in responseData) {
				_loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(_loadedMeals);
			setIsLoading(false);
		};

		// try {
		// 	fetchMeals();
		// } catch (error) {
		// 	setIsLoading(false);
		// 	setIsError(error.message);
		// }

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setIsError(error.message);
		});

		// const handleError = async ()=>{
		// 	try {
		// 		await fetchMeals();
		// 	} catch (error) {
		// 		setIsLoading(false);
		// 		setIsError(error.message);
		// 	}
		// }
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
	return (
		<>
			{isLoading ? (
				<section className={classes.meals}>
					<Card>
						<h2 style={{ textAlign: "center" }}>Loading......</h2>
					</Card>
				</section>
			) : (
				<section className={classes.meals}>
					<Card>
						{isError ? (
							<h2 style={{ textAlign: "center" }}>{isError}</h2>
						) : (
							<ul>{mealsList}</ul>
						)}
					</Card>
				</section>
			)}
		</>
	);
};

export default AvailableMeals;
