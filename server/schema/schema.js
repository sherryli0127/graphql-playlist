const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull
} = graphql

//dummy data
// var books = [
//     {name: 'Name of the Wind', genre:'Fantasy', id:'1', authorId:'1'},
//     {name: 'The Final Empire', genre:'Fantasy', id:'2', authorId:'2'},
//     {name: 'The Long Earth', genre:'Sci-Fi', id:'3', authorId:'3'},
//     {name: 'The Hero of Ages', genre:'Fantasy', id:'4', authorId:'2'},
//     {name: 'The Colour of Magic', genre:'Fantasy', id:'5', authorId:'3'},
//     {name: 'The Light Fantastic', genre:'Fantasy', id:'6', authorId:'3'},

// ]

// var authors=[
//     {name: 'Patrick Rothfuss', age: 44, id:'1'},
//     {name: 'Brandon Sanderson', age: 42, id:'2'},
//     {name: 'Terry Pratchett', age: 66, id:'3'},

// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        // id: {type: GraphQLString},
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                // return _.find(authors,{id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        // id: {type: GraphQLString},
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books, {authorId:parent.id})
                return Book.find({authorId: parent.id})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //name matters, is used to query
        //query example: book{...} not books{}
        book:{
            //type is the book type
            type: BookType,
            //args is the pass-in argument when query, eg, id
            //query example: book(id:'123){...}
            // args:{id:{type: GraphQLString}},
            args:{id:{type: GraphQLID}},

            
            //parent related to the relationship between data
            //args related to pass-in parameter, get access to the pass-in args
            resolve(parent, args){
                //code to get data from db/ other resource
                // console.log(typeof(args.id));
                // return _.find(books, {id:args.id});
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({})
            }
        }
    }
})

const Mutaton = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name:{type:new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                //corresponding to the author model that imported
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                //save author instance to the db
                //return means return back the data that have been save to the frontend
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId: {type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutaton
})