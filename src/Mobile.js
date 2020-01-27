import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import restaurantImg from "./restaurant.jpg";

const useStyles = makeStyles(theme => ({
	media: {
		height: "200px"
	},
	content: {
		width: "auto"
	},
	eachContent: {
		paddingBottom: "5px"
	}
}));

export default function Mobile(props) {
	const classes = useStyles();
	const { restaurants } = props;

	return restaurants.map((each, index) => {
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
				<Grid item xs={10} md={8}>
					<Card className={classes.card} raised>
						<CardActionArea href={each.restaurant.url} target="_blank">
							<CardMedia
								className={classes.media}
								image={each.restaurant.featured_image || restaurantImg}
								title="Paella dish"
							/>
							<CardContent className={classes.content}>
								<Typography color="primary" variant="h5">
									{each.restaurant.name}
								</Typography>
								<Typography
									color="secondary"
									variant="subtitle1"
									style={{ marginBottom: "20px" }}
								>
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
									<b>Rating</b> : {each.restaurant.user_rating.aggregate_rating}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
		);
	});
}
