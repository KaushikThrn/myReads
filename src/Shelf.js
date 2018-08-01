import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Shelf extends React.Component{
	state={}
	shelf_type={
		"Currently Reading":"currentlyReading",
		"Want to Read":"wantToRead",
		"Read":"read"
	}
	render(){
		return(
			<div className="bookshelf">
			<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
			<ol className="books-grid">
			{this.props.Books.map((book)=>(
               book.shelf===this.shelf_type[this.props.title]?
               <li>
               <Book Books={book} changeValue={this.props.changeShelf}/>
			   </li>:null
			))}
			 </ol>
            </div>
            </div>

			)
	}

}
export default Shelf;