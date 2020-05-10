import React from "react";
import { Container, Card, ListGroup } from 'react-bootstrap'
import activeStar from '../../images/activestar.png';
import inactiveStar from '../../images/inactivestar.png';
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
                    <div class="col-sm">
                        {rate.numberOfStars >= value && <img className="" src={activeStar}/>}
                        {rate.numberOfStars < value && <img src={inactiveStar}/>}
                    </div>
                )

            });

            return(
                <div className="row">
                    {item}
                </div>

            )
        });


        return(
           <div classname="container">
               {list}
           </div>
        )
    }
}
export default RatingList;