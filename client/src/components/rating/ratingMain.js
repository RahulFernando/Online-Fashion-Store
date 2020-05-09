import React from "react";
import axios from "axios";

class RatingMain extends React.Component
{

    constructor(props) {
        super(props);

        this.state = ({rateList : [],comment : ''});

        //getting required props to proceed
        const userId = this.props.userId;
        const productId = this.props.productId;
        //getting ratings from API
        this.getRatingsFromApi(userId,productId);
    }
    render() {
        return(
            <div>
                <div className="input">
                    {this.props.userId != null &&
                        <input type="text" onChange={(e) => this.onStartTyping(e)} value={this.state.comment}/>
                    }


                </div>

            </div>
        )
    }
    onStartTyping = (e) => {

        this.setState({comment : e.target.value});
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