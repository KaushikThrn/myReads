import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Shelf extends React.Component{
	constructor(props){
		super(props);
		this.props=props
		this.changeShelf=this.changeShelf.bind(this)
	}
	state={}
	shelf_type={
		"Currently Reading":"currentlyReading",
		"Want to Read":"wantToRead",
		"Read":"read"
	}
	changeShelf=(shelf_name,title)=>{
         this.props.changeShelfValue(shelf_name,title)
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
               <Book Books={book} changeValueShelf={this.changeShelf}/>
			   </li>:null
			))}
			 </ol>
            </div>
            </div>

			)
	}

}
export default Shelf;