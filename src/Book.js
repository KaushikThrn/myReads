import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component{
  constructor(props){
    super(props);
    this.props=props;
    this.changeTypeShelf=this.changeTypeShelf.bind(this);
  }

	changeTypeShelf=(event,id)=>{
       this.props.changeValueShelf(event.target.value,id)
	}
	render(){
		const {Books}=this.props
		return(  
             <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${Books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e)=>{this.changeTypeShelf(e,Books.id)}} value={Books.hasOwnProperty("shelf")? Books.shelf:"none"}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" >None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{Books.title}</div>
                          <div className="book-authors">{Books.hasOwnProperty("authors")?Books.authors[0]:"No author"}</div>
                        </div>
			)
	}

}
export default Book;