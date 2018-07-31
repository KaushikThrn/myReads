import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class BooksApp extends React.Component {
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
  
  render() {
    const {books_list}=this.state
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
          </div> {this.state.books_list.length > 0 &&
             <Shelf title="Currently Reading" Books={books_list}/>}
      </div>
    </div>
    )
  }
}



export default BooksApp
