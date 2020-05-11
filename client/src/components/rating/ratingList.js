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

            const item = this.state.uniqueRates.map(value => {
                    return (
                        <div>
                            {rate.numberOfStars >= value && <span className="fa fa-star checked"></span>}
                            {rate.numberOfStars < value &&  <span className="fa fa-star"></span>}
                        </div>
                    )
            });


                return(
                    <div className="mt-1">
                        <div>
                            {comment}
                        </div>
                        <div className="pl-3">
                            <div className="row">
                                {item}
                            </div>
                        </div>

                    </div>
                )

        });


        return(
           <div>
               {userId !== null && ratingList.length > 0 &&
                   <div>
                       <span><strong>Other Ratings</strong></span>
                       {list}
                   </div>
               }

               {userId === null && ratingList.length > 0 &&
               <div>
                   <span><strong>Ratings</strong></span>
                   {list}
               </div>
               }


           </div>
        )
    }
}
export default RatingList;