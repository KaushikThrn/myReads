import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Book from './Book'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.querySearch = this.querySearch.bind(this)
}
state = {
    books_results: [],
    query: ''
}
querySearch = (query) => {
    //perform a search when the query is changed
    let Books_Shelf = [];
    this.setState({ query: query })
    BooksAPI.search(query, 20)
        .then((books) => {
            if (query === '') { this.setState({ books_results: [] }) } else {
                //if the book has already been added to a shelf, then add the shelf attribute to the book
                BooksAPI.getAll()
                    .then((books_shelf) => {
                        Books_Shelf = books_shelf;
                        for (let i = 0; i <= Books_Shelf.length - 1; i++) {
                            for (let j = 0; j <= books.length - 1; j++) {
                                if (Books_Shelf[i]["id"] === books[j]["id"]) {
                                    books[j]["shelf"] = Books_Shelf[i]["shelf"];
                                    break;
                                }
                            }
                        }

                    })
            }
            this.setState({ books_results: books })

        })
}
changeShelf = (shelf_name, id) => {
    //if the shelf is changed, update the value in the database
    let booksCopy = this.state.books_results
    booksCopy.map((book) => {
        if (book.id === id) {
            BooksAPI.update(book, shelf_name)
                .then((response) => {})
            book.shelf = shelf_name
        }

    })
    this.setState({ books_results: booksCopy })
}

  render(){
    let isLength=this.state.books_results.length > 0;
    let result=!(this.state.books_results.hasOwnProperty("error"));
    return(
      <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" >
              <div className="close-search">Close</div>
              </Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(event)=>{this.querySearch(event.target.value)}}/>
                <div>{this.state.str}</div>
              </div>
            </div>
            {result?
            <div className="search-books-results">
              <ol className="books-grid">
                {isLength? this.state.books_results.map((book)=>(<li><Book Books={book} key={book.id} changeValueShelf={this.changeShelf}/></li>)):null}
              </ol>
            </div>:<div className="search-books-results">No Results found.Please try later</div>}
          </div>
          )
  }


}

export default Search
 