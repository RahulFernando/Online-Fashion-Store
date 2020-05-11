import React from "react";
import axios from "axios";
import RatingList from '../rating/ratingList';
import {getUserId} from '../../service/function';

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
                    {this.props.userId !== null &&
                        <div>

                            <div>
                                {elements}
                            </div>


                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={(e) => this.onStartTyping(e)} value={this.state.comment}/>
                            {this.state.userRating.ratingId === null && <input type="button" className="btn btn-primary" value="Post" onClick={()=> this.submit(this.props.userId,this.props.productId,this.state.comment,this.state.numberOfStars)}/>}
                            {this.state.userRating.ratingId !== null && <input type="button" className="btn btn-primary" value="Update" onClick={()=> this.update(this.state.comment,this.state.numberOfStars)}/>}
                            {this.state.userRating.ratingId !== null && <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.delete()}/>}

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
    getRatingsFromApi = (productId,userId) => {

        axios.get('http://localhost:4000/api/users/rating/find?productId=' + productId)
        .then(res => {

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

        if(comment !== null && comment !== '')
        {
            axios.post('http://localhost:4000/api/users/rating?userId='+userId+"&productId="+productId+"&comment="+comment+"&numberOfStars="+numberOfStars )
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
        else {
            alert("Please Enter a comment!")
        }

    };
    update = (comment,numberOfStars) => {

        if(comment !== null && comment !== '')
        {
           axios.patch('http://localhost:4000/api/users/rating?ratingId=' + this.state.userRating.ratingId + "&comment=" + comment + "&numberOfStars=" + numberOfStars)
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
            alert("Cant delete,Rating Id is missing!");
        }
        else
        {
            axios.delete('http://localhost:4000/api/users/rating?ratingId=' + ratingId)
                .then(res => {

                })
                .catch(error => {
                    console.log("Error while deleting the rating " + error);
                });

                this.setState({
                    userRating :
                        {
                            ratingId : null,
                            comment : '',
                            numberOfStars : 1
                        },numberOfStars : 1,comment : ''});

                this.getRatingsFromApi(this.props.productId,this.state.userId);
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