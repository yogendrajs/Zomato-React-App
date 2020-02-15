import React from "react";
import Default from "./Default";
import Mobile from "./Mobile";
import { useMediaQuery } from "react-responsive";
import { Grid, Icon, Input, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Typography } from "@material-ui/core";
import axios from "axios";

// const Desktop = ({ children }) => {
// 	const isDesktop = useMediaQuery({ minWidth: 992 });
// 	return isDesktop ? children : null;
// };
// const Tablet = ({ children }) => {
// 	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
// 	return isTablet ? children : null;
// };
const Mobiles = ({ children }) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	return isMobile ? children : null;
};
const Defaults = ({ children }) => {
	const isNotMobile = useMediaQuery({ minWidth: 768 });
	return isNotMobile ? children : null;
};

function App() {
	const [state, setState] = React.useState({
		location: null,
		restaurants: []
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			let { data } = await axios.get(
				`https://developers.zomato.com/api/v2.1/locations?query=${state.location}`,
				{
					headers: {
						"user-key": "<your-zomato-api-key>",
						"content-type": "application/json"
					}
				}
			);
			let { latitude, longitude } = await data.location_suggestions[0];

			try {
				let { data } = await axios.get(
					`https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`,
					{
						headers: {
							"user-key": "<your-zomato-api-key>",
							"content-type": "application/json"
						}
					}
				);
				// console.log(data.nearby_restaurants);
				setState({ ...state, restaurants: data.nearby_restaurants });
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<div style={{ background: 'rgb(165, 237, 240)', paddingBottom: '30px', border: 'solid skyblue' }}>
				<Typography style={
					{
						textAlign: "center",
						paddingTop: '20px',
						margin: '0 10px',
						fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif'
					}}
					variant="h3"
				>
					Zomato Restaurants
			</Typography>
			</div>

			<br></br>
			<form
				// style={{ display: "flex", justifyContent: "center" }}
				onSubmit={handleSubmit}
			>
				<Segment placeholder>
					<Grid columns={1} stackable textAlign="center">
						<Grid.Column
							style={{ display: "flex", justifyContent: "center" }}
							width={4}
						>
							<Segment circular>{"Try searching a city below 🤩"}</Segment>
						</Grid.Column>
						<Grid.Row verticalAlign="middle">
							<Grid.Column>
								<Input
									icon={
										<Icon
											name="search"
											inverted
											circular
											link
											onClick={handleSubmit}
										/>
									}
									placeholder="Enter a city name..."
									onChange={e =>
										setState({ ...state, location: e.target.value })
									}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</form>
			<br></br>
			<Defaults>
				<Default restaurants={state.restaurants} />
			</Defaults>
			<Mobiles>
				<Mobile restaurants={state.restaurants} />
			</Mobiles>
		</React.Fragment>
	);
}

export default App;
