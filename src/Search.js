import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Book from './Book'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Search extends React.Component {
  constructor(props){
    super(props);
    this.props=props
    this.querySearch=this.querySearch.bind(this)
  }
  state={
    books_results:[]
  }
  querySearch=(query)=>{
    let Books_Shelf=[];
     BooksAPI.search(query,5).then((books) => {
      if(query==''){this.setState({books_results:[]})}
      else{

         BooksAPI.getAll().then((books_shelf) => {
          Books_Shelf=books_shelf;
          for(let i=0;i<=Books_Shelf.length-1;i++){
            for(let j=0;j<=books.length-1;j++){
              if(Books_Shelf[i]["id"]===books[j]["id"]){
                  books[j]["shelf"]=Books_Shelf[i]["shelf"];
                  break;
                }
            }
          }
          this.setState({books_results:books})
         })
        }
      
    })
  }
  changeShelf=(shelf_name,id)=>{
  let booksCopy=this.state.books_results
   booksCopy.map((book)=>{
     if(book.id===id){
         BooksAPI.update(book,shelf_name).then((response)=>{})
         book.shelf=shelf_name
     }

   })
   this.setState({books_results:booksCopy})
}
  render(){
    let isLength=this.state.books_results.length > 0;
    return(
      <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" >
              <a className="close-search">Close</a>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event)=>{this.querySearch(event.target.value)}}/>
                <div>{this.state.str}</div>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {isLength? this.state.books_results.map((book)=>(<li><Book Books={book} changeValueShelf={this.changeShelf}/></li>)):null}
              </ol>
            </div>
          </div>
          )
  }


}

export default Search
 