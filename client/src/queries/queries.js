import {gql} from 'apollo-boost'

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

// need to add keyword mutation
//the name should be identical with server side mutation setting
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`


export {getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery};