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

        const list = ratingList.map(rate => {

            const item = this.state.uniqueRates.map(value => {
                return (
                    <div>
                        {rate.numberOfStars >= value && <span className="fa fa-star checked"></span>}
                        {rate.numberOfStars < value &&  <span className="fa fa-star"></span>}
                    </div>
                )

            });

            // <div className="rating">
            //     <div className="stars">
            //         <span className="fa fa-star checked"></span>
            //         <span className="fa fa-star checked"></span>
            //         <span className="fa fa-star checked"></span>
            //         <span className="fa fa-star"></span>
            //         <span className="fa fa-star"></span>
            //     </div>
            //     <span className="review-no">41 reviews</span>
            // </div>

            return(
                <div className="row">
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