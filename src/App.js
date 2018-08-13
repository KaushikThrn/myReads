import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Bookapp extends React.Component {
  state = {
      books_list: [],
      showSearchPage: false
  }

  componentDidMount() {
      // get books on load
      BooksAPI.getAll()
          .then((books) => {
              this.setState({ books_list: books })
          })
  }

  changeShelf = (shelf_name, id) => {
      //change the shelf the book is on.
      let booksCopy = this.state.books_list
      booksCopy.map((book) => {
          if (book.id === id) {
              BooksAPI.update(book, shelf_name)
                  .then((response) => {})
              book.shelf = shelf_name
          }

      })
      this.setState({ books_list: booksCopy })
  }

  render() {
    const {books_list}=this.state;
    let isLength=this.state.books_list.length > 0;
    return (
      <div className="app">
<div className="list-books">
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div> {isLength ?
    <div>
        <Shelf title="Currently Reading" Books={books_list} changeShelfValue={this.changeShelf}/>
        <Shelf title="Want to Read" Books={books_list} changeShelfValue={this.changeShelf}/>
        <Shelf title="Read" Books={books_list} changeShelfValue={this.changeShelf}/>
    </div>:
    <div>Loading</div>}

    </div>
    <Link to="/search">
    <div className="open-search">
        Add a book
    </div>
    </Link>
    </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
            <Router>
               <div>
               <Route exact path="/" component={Bookapp} />
                <Route exact path="/search" component={Search} />
                </div>
            </Router>
      )
  }
}



export default App
