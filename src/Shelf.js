import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Shelf extends React.Component{
	constructor(props) {
	    super(props);
	    this.props = props
	    this.changeShelf = this.changeShelf.bind(this)
	}
	state = {}
	shelf_type = {
	    //define each of the shelf types to the shelf values returned in the book object
	    "Currently Reading": "currentlyReading",
	    "Want to Read": "wantToRead",
	    "Read": "read"
	}
	changeShelf = (shelf_name, title) => {
	    //pass the shelf and the book id to the parent component
	    this.props.changeShelfValue(shelf_name, title)
	}
	render(){
		return(
			<div className="bookshelf">
    <h2 className="bookshelf-title">{this.props.title}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {this.props.Books.map((book,index)=>( book.shelf===this.shelf_type[this.props.title]?
            <li key={index}>
                <Book Books={book} changeValueShelf={this.changeShelf}/>
            </li>:null ))}
        </ol>
    </div>
	</div>

			)
	}

}
export default Shelf;