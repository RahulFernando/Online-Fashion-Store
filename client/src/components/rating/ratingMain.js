import React from "react";
import axios from "axios";
import RatingList from '../rating/ratingList';
import {getUserId, getRatings, newRating} from '../../service/function';

class RatingMain extends React.Component
{

    constructor(props) {
        super(props);

        this.state = (
            {
                userId : getUserId(),
                rateList : [],
                comment : '',
                numberOfStars : 1,
                userRating : {
                    ratingId : null,
                    comment : null,
                    numberOfStars : null
                }
            });

        //getting required props to proceed
       // const userId = this.props.userId;
        const productId = this.props.productId;

        //getting ratings from API
        this.getRatingsFromApi(this.props.productId,this.state.userId);



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
                        <div className="pt-3">
                            <div>{elements}</div>
                            <div className="input-group mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your comment"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.onStartTyping(e)}
                                    value={this.state.comment}/>

                                    <div className="input-group-append">
                                        <div>
                                            {this.state.userRating.ratingId === null && <input type="button" className="btn btn-primary" value="Post" onClick={()=> this.submit(this.props.userId,this.props.productId,this.state.comment,this.state.numberOfStars)}/>}
                                            {this.state.userRating.ratingId !== null && <input type="button" className="btn btn-primary" value="Update"  onClick={()=> this.update(this.state.comment,this.state.numberOfStars)}/>}
                                            {this.state.userRating.ratingId !== null && <input type="button" className="btn btn-primary ml-1" value="Delete" onClick={() => this.delete()}/>}
                                        </div>
                                    </div>
                            </div>

                        </div>
                    <div className="pt-2">
                        <RatingList ratings = {this.state.rateList} userId = {this.props.userId}/>
                    </div>

                </div>

            </div>
        )
    }
    onStartTyping = (e) => {

        this.setState({comment : e.target.value});
    };
    getRatingsFromApi = (productId,userId) => {

        getRatings(productId)
        .then(res => {
            console.log(res.data)
            let ratinglist = res.data;
            //reversing the list to get the recent comments to the top
            ratinglist.reverse();
            this.setState({rateList : ratinglist});

            //alert(userId);
            this.setUsersRating(ratinglist,userId);

        })
        .catch(error => {
            console.log("Error while getting ratings " + error);
        });
    };
    submit = (userId,productId,comment,numberOfStars) => {

        if((comment !== null && comment !== '') && (userId !== '' && userId !== null))
        {
            newRating(userId, productId, comment, numberOfStars)
            .then(res => {

                    //clearing the input filed value
                    this.setState({comment : ''});
                    //get newly added rating to the list
                    this.getRatingsFromApi(this.props.productId,this.state.userId);

                })
                .catch(error => {
                    console.log("Error while getting ratings " + error);
                });
        }
        else
        {
            if(comment === null || comment === '')
            {
                alert("Please Enter a comment!");
            }
            else if((userId === '' || userId === null))
            {
                alert("Please login!");
            }
        }

    };
    update = (comment,numberOfStars) => {

        if(comment !== null && comment !== '')
        {
            
           axios.patch('/api/users/rating?ratingId=' + this.state.userRating.ratingId + "&comment=" + comment + "&numberOfStars=" + numberOfStars)
               .then(res => {
                   if(res.status === 200)
                   {
                       this.getRatingsFromApi(this.props.productId,this.state.userId);
                   }

               })
               .catch(error => {
                   console.log("Error while updating the rating " + error);
               });
        }
        else
        {
            alert("Please Enter a comment to update")
        }

    };
    onStarClicked = (i) => {

        this.setState({numberOfStars : i});
    };
    delete = () => {
        const ratingId = this.state.userRating.ratingId;
        if(ratingId === null)
        {
            alert("Cant delete because the Rating Id is missing!");
        }
        else
        {
            axios.delete('/api/users/rating?ratingId='  + ratingId)
                .then(res =>
                {
                   if(res.status === 200)
                   {
                       this.setState({
                                       userRating :
                                           {
                                               ratingId : null,
                                               comment : '',
                                               numberOfStars : 1
                                           },numberOfStars : 1,comment : ''});

                        this.getRatingsFromApi(this.props.productId,this.state.userId);
                   }
                })
                .catch(error => {

                });
        }
    };
    setUsersRating = (allratings,userId) => {

        allratings.map(item => {
            if(userId === item.userId)
            {
                this.setState({
                     userRating :
                     {
                        ratingId : item._id,
                        comment : item.comment,
                        numberOfStars : item.numberOfStars
                    },numberOfStars : item.numberOfStars,comment : item.comment});
            }
        });

    };

}
export default RatingMain;