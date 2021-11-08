import React, { Component } from "react";
import ItemCard from "../Components/Itemcard";

class Listpage extends Component {
  id = 1;
  state = {};

  render() {
    const { Itemcard } = this.props;
    return (
      <ul className="list__itemview">
        {Itemcard &&
          Itemcard.map((itemdata, insertIndex) => {
            return (
              <ItemCard
                key={insertIndex}
                title={itemdata.title}
                bidprice={itemdata.bidprice}
                buyingItNowPrice={itemdata.buyingItNowPrice}
                endDate={itemdata.endDate}
                userID={itemdata.userID}
                thumbnail={itemdata.thumbnail}
              />
            );
          })}
      </ul>
    );
  }
}
export default Listpage;