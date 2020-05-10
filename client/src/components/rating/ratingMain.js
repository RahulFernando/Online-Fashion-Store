import React from "react";
import axios from "axios";
import RatingList from '../rating/ratingList';

class RatingMain extends React.Component
{

    constructor(props) {
        super(props);

        this.state = ({rateList : [],comment : ''});

        //getting required props to proceed
        const userId = this.props.userId;
        const productId = this.props.productId;
        //getting ratings from API
        this.getRatingsFromApi(productId);
    }
    render() {
        return(
            <div>
                <div className="input">
                    {this.props.userId === null &&
                        <div>
                            <input type="text" onChange={(e) => this.onStartTyping(e)} value={this.state.comment}/>
                            <input type="button" value="Submit" onClick={()=> this.submit(this.props.userId,this.props.productId)}/>
                            <input type="button" value="Delete"/>
                        </div>
                    }
                    <div className="container">
                        <RatingList ratings = {this.state.rateList}/>
                    </div>
                </div>

            </div>
        )
    }
    onStartTyping = (e) => {

        this.setState({comment : e.target.value});
    };
    getRatingsFromApi = (productId) => {

        axios.get('http://localhost:4000/api/users/rating/find?productId=' + productId)
        .then(res => {

            let ratinglist = res.data;
            this.setState({rateList : ratinglist});

        })
        .catch(error => {
            console.log("Error while getting ratings " + error);
        });
    };
    submit = (userId,productId) => {

        axios.post('http://localhost:4000/api/users/rating?userId='+userId+"&productId="+productId+"&comment="+this.state.comment+"&numberOfStars="+5 )
            .then(res => {
                let ratinglist = res.data;
                this.setState({rateList : ratinglist});

            })
            .catch(error => {
                console.log("Error while getting ratings " + error);
            });
    };
}
export default RatingMain;