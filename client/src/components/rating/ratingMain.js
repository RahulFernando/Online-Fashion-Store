import React from "react";
import axios from "axios";

class RatingMain extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({rateList : []});

        //getting required props to proceed
        const userId = this.props.userId;
        const productId = this.props.productId;
        //getting ratings from API
        this.getRatingsFromApi(userId,productId);
    }
    render() {
        return(
            <h1>{this.props.userId}</h1>
        )
    }
    getRatingsFromApi = (userId,productId) => {

        axios.get('http://localhost:4000/api/users/rating/find', {
            productId: productId,
            userId: userId
        })
        .then(res => {

            let ratinglist = res.data;
            this.setState({rateList : ratinglist});

        })
        .catch(error => {
            console.log("Error while getting ratings " + error);
        });
    }
}
export default RatingMain;