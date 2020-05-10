import React from "react";
import { Container, Card, ListGroup } from 'react-bootstrap'
class RatingList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({uniqueRates : [1,2,3,4,5]});
    }

    render() {

        var ratingList = [];
        ratingList = this.props.ratings;

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
                <div className="row">
                    {comment}
                    {item}
                </div>

            )
        });


        return(
           <div>
               {list}
           </div>
        )
    }
}
export default RatingList;