import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spiner from './Spiner';
import PropTypes from 'prop-types'

export default class News extends Component {
  
 static propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
 }
  constructor(props){
    super(props);
    this.state={
      data : null,
      loading : false,
      page:1,
      progress:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

setProgress = (progress)=>{
this.setState({progress:progress})
}
  componentDidMount(){

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2b853034f414b67ba41017f928414fe&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    fetch(url).then((res)=>{
        res.json().then((result)=>{
            console.log(result.articles)
        
            this.setState({
              data:result.articles,
              totalResults: result.totalResults,
              loading:false
            })
        })
    })
    
}
handlePrevClick = async ()=>{
  console.log("Previous");

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2b853034f414b67ba41017f928414fe&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  fetch(url).then((res)=>{
    res.json().then((result)=>{
        console.log(result.articles)
      
        this.setState({
          page: this.state.page - 1,
          data:result.articles,
        loading:false
        })
    })
})

}

  handleNextClick = async ()=>{
    console.log("Next"); 
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2b853034f414b67ba41017f928414fe&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
     
        this.setState({loading:true});
        fetch(url).then((res)=>{
          res.json().then((result)=>{
            
              console.log(result.articles)
             
              this.setState({
                page: this.state.page + 1,
                data:result.articles,
                loading:false
              
              })
          })
      })
     
}
  }

  render() {
    return (
      <>
      
    <div className="container my-3">
      <h1 className='text-center ' style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
      {this.state.loading&&<Spiner/>}
 
      <div className='row'>
        {!this.state.loading&&this.state.data ?
        this.state.data.map((element)=>
           <div className="col-md-4" key={element.url} >
        <Newsitems title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}
        autor={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        )
        : null
        }
        
      </div>
      <div className='container d-flex justify-content-between'>
      <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </div>
      </>
    )
  }
}
