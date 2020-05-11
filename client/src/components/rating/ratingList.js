import React from "react";
import { Container, Card, ListGroup } from 'react-bootstrap'
class RatingList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({uniqueRates : [1,2,3,4,5]});
    }

    render() {

        const ratingList = this.props.ratings;

        const userId = this.props.userId;

        const list = ratingList.map(rate => {

            let comment = rate.comment;
            let ratingUserId = rate.userId;

            const item = this.state.uniqueRates.map(value => {
                    return (
                        <div>
                            {rate.numberOfStars >= value && <span className="fa fa-star checked"></span>}
                            {rate.numberOfStars < value &&  <span className="fa fa-star"></span>}
                        </div>
                    )
            });

            if(ratingUserId !== userId)
            {
                return(
                    <div>
                        <div>
                            {comment}
                        </div>
                        <div className="row">
                            {item}
                        </div>
                    </div>





                )
            }

        });


        return(
           <div>
               {list}
           </div>
        )
    }
}
export default RatingList;