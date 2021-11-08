import React, { Component } from 'react';
import { render } from 'react-dom';
import Information from '../public/info-json';
class Itemcard extends Component {

  constructor(){
    super();

    this.state={
      search:null
    };
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  render(){
    const styleInfo = {
      paddingRight:'10px'
    }
    const elementStyle ={
      border:'solid',
      borderRadius:'10px',
      position:'relative',
      left:'10vh',
      height:'3vh',
      width:'20vh',
      marginTop:'5vh',
      marginBottom:'10vh'
    }
    const items = Information.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.userID.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    }).map(data=>{
      return(
      <div>
        <ul>
          <li style={{position:'relative',left:'10vh'}}>
            <span style={styleInfo}>{data.thumbnail}</span>
            <span style={styleInfo}> 제목 : {data.title}</span>
            <span style={styleInfo}> 현재 입찰가 : {data.bidPrice}</span>
            <span style={styleInfo}> 즉시 구매가 : {data.buyingItNowPrice}</span>
            <span style={styleInfo}> 마감 시간 : {data.endDate}</span>
            <span style={styleInfo}> 판매자 : {data.userID}</span>
          </li>
        </ul>
      </div>
      )
    })

    return (
      <div>
      <input type="text" placeholder="책제목/판매자 검색" style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
      {items}
      </div>
    )
  }
}

export default Itemcard;