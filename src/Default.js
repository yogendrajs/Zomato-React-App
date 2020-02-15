import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Image } from "semantic-ui-react";
import CardActionArea from "@material-ui/core/CardActionArea";
import restaurantImg from "./restaurant.jpg";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles(theme => ({
	card: {
		width: '700px',
		display: "flex",
		alignItems: 'center'
	},
	media: {
		width: "300px",
		borderRadius: '20px',
		height: '200px',
		marginLeft: '20px'
	},
	content: {
		width: "500px"
	},
	eachContent: {
		paddingBottom: "5px",
		fontSize: '15px'
	}
}));

export default function Default(props) {
	const classes = useStyles();
	const { restaurants } = props;

	return (
		restaurants.map((each, index) => {
			return (
				<Grid
					key={index}
					container
					spacing={0}
					direction="row"
					alignItems="center"
					justify="center"
					style={{ minHeight: "10vh", marginBottom: "30px" }}
				>
					<Grid >

						<Card className={classes.card} raised>
							<CardActionArea href={each.restaurant.url} style={{ display: 'flex' }} target="_blank">
								<Image
									src={each.restaurant.featured_image || restaurantImg}
									className={classes.media}
								// size="small"
								/>
								<CardContent className={classes.content}>
									<Typography color="primary" variant="h5">
										{each.restaurant.name}
									</Typography>
									<Typography color="secondary" variant="subtitle1">
										{each.restaurant.location.address}
									</Typography>
									<hr></hr>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className={classes.eachContent}
									>
										<b>Average Cost For Two Persons</b> :{" "}
										{each.restaurant.average_cost_for_two}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className={classes.eachContent}
									>
										<b>Price Range</b> : {each.restaurant.price_range}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className={classes.eachContent}
									>
										<b>Online Delivery</b> :{" "}
										{each.restaurant.has_online_delivery === 1 ? "Yes" : "No"}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className={classes.eachContent}
									>
										<b>Cuisines</b> : {each.restaurant.cuisines}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className={classes.eachContent}
									>
										<b>Rating</b> :{" "}
										{each.restaurant.user_rating.aggregate_rating}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>

					</Grid>
				</Grid>
			);
		})
	)
}
