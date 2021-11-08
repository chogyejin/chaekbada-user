
import React, { Component, useState } from "react";
import axios from "axios";
import Listpage from "./lp";


class BookPosts extends Component {
  
  state = {
    loading: false,
    ItemList: [] 
  };

  loadItem = async () => {
    
    axios 
      .get("./SearchJson.json")
      .then(({ data }) => {
        
        this.setState({
          loading: true, 
          ItemList: data.Item 
        });
      })
      .catch(e => {
        
        console.error(e); 
        this.setState({
          loading: false 
        });
      });
  };

  componentDidMount() {
    this.loadItem();
  }


  render() {
    const { ItemList } = this.state;
    console.log(ItemList);
    return (
      <div>
        <Listpage Itemcard={ItemList} />
      </div>
    );
  }
}

export default BookPosts;
