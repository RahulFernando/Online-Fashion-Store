import React from "react";

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
                        {rate.numberOfStars >= value && <h3>active star</h3>}
                        {rate.numberOfStars < value && <h3>Inactive star</h3>}
                    </div>
                )

            });

            return(
                <div>
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