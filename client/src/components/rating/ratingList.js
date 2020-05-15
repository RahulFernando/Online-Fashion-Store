import React from "react";
import { Container, Card, ListGroup } from 'react-bootstrap'
class RatingList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({uniqueRates : [1,2,3,4,5]});
    }

    render() {

        const ratings = this.props.ratings;
        const userId = this.props.userId;
        var ratingList = [];

        //removing the user added rating since it has been loaded already
        ratings.map(item => {

            if(userId !== item.userId)
            {
                ratingList.push(item);
            }
        });

        const list = ratingList.map(rate => {

            let comment = rate.comment;
            let username = rate.userName;

            const item = this.state.uniqueRates.map(value => {
                    return (
                        <div>
                            {rate.numberOfStars >= value && <span className="fa fa-star checked"/>}
                            {rate.numberOfStars < value &&  <span className="fa fa-star"/>}
                        </div>
                    )
            });



                return(
                    <div className="form-control h-25" aria-describedby="inputGroup-sizing-default" >
                        <div>
                            <strong>{username}</strong>
                        </div>
                        <div className="pl-3">
                            <div className="row">
                                {item}
                            </div>
                        </div>
                        <div>
                            {comment}
                        </div>


                    </div>
                )

        });


        return(
           <div>
               {list.length > 0 &&
               <div className="details">
                   <span className="product-title"><strong>Other Ratings</strong></span>
                   {list}
               </div>
               }
           </div>
        )
    }
}
export default RatingList;