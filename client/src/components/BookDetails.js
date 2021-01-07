import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// importing queries
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>
            <i>Genre</i>: {book.genre}
          </p>
          <p>
            <i>Author</i>: {book.author.name}
          </p>
          <p>
            All books by <u>{book.author.name}</u>:
          </p>
          <ul className='other-books'>
            {book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected!</div>;
    }
  }
  render() {
    return <div id='book-details'>{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
