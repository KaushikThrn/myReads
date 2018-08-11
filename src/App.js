import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Bookapp extends React.Component {
  Books={
    book_title:'The Hobbit',
    book_authors:'J.R.R. Tolkien',
    backgroundImage: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"

  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books_list:[],
    showSearchPage: false
  }

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then((books) => {
      this.setState({books_list:books})
    })
}

changeShelf=(shelf_name,title)=>{
  let booksCopy=this.state.books_list
   booksCopy.map((book)=>{
     if(book.title===title){
         BooksAPI.update(book,shelf_name).then((response)=>{})
         book.shelf=shelf_name
     }

   })
   this.setState({books_list:booksCopy})
}

  render() {
    const {books_list}=this.state;
    let isLength=this.state.books_list.length > 0;
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
          </div> {isLength ? <div>
           <Shelf title="Currently Reading" Books={books_list} changeShelfValue={this.changeShelf}/> 
           <Shelf title="Want to Read" Books={books_list} changeShelfValue={this.changeShelf}/> 
           <Shelf title="Read" Books={books_list} changeShelfValue={this.changeShelf}/></div>:<div>Loading</div>}
       
      </div>
        <Link to="/search">
            <div className="open-search">
                <a>Add a book</a>
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
