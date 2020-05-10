import React from "react";
import axios from "axios";
import RatingList from '../rating/ratingList';

class RatingMain extends React.Component
{

    constructor(props) {
        super(props);

        this.state = ({rateList : [],comment : '',numberOfStars : 1});

        //getting required props to proceed
        const userId = this.props.userId;
        const productId = this.props.productId;
        //getting ratings from API
        this.getRatingsFromApi(productId);
    }
    render() {


        var arr =[1,2,3,4,5];
        var elements = [];

        arr.map(i => {

            if(this.state.numberOfStars >= i)
            {
                elements.push(<span className="fa fa-star checked"  onClick={() => this.onStarClicked(i)}/>);
            }
            else
            {
                elements.push(<span className="fa fa-star"  onClick={() => this.onStarClicked(i)}/>);
            }
        });


        return(
            <div>
                <div className="input">
                    {this.props.userId === null &&
                        <div>

                            <div>
                                {elements}
                            </div>


                            <input type="text" onChange={(e) => this.onStartTyping(e)} value={this.state.comment}/>
                            <input type="button" value="Post" onClick={()=> this.submit(this.props.userId,this.props.productId,this.state.comment,this.state.numberOfStars)}/>
                            <input type="button" value="Delete"/>
                        </div>
                    }
                    <div className="details col-md-6">
                        <RatingList ratings = {this.state.rateList} userId = {this.props.userId}/>
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
            //reversing the list to get the recent comments to the top
            ratinglist.reverse();
            this.setState({rateList : ratinglist});

        })
        .catch(error => {
            console.log("Error while getting ratings " + error);
        });
    };
    submit = (userId,productId,comment,numberOfStars) => {

        if(comment != null)
        {
            axios.post('http://localhost:4000/api/users/rating?userId='+userId+"&productId="+productId+"&comment="+comment+"&numberOfStars="+numberOfStars )
                .then(res => {

                    //get newly added rating to the list
                    this.getRatingsFromApi(this.props.productId);

                    this.setState({comment : ''})

                })
                .catch(error => {
                    console.log("Error while getting ratings " + error);
                });
        }
        else {
            alert("Please Enter a comment!")
        }

    };
    onStarClicked = (i) => {

        this.setState({numberOfStars : i});
    }
}
export default RatingMain;