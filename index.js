import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema.js"
import db from "./_db.js"
import express from 'express';
const app = express();


const resolvers = {
    Query: {
        games(){
            return db.games;
        },
        game(parent, args){
            
            return db.games.find((g) => {
                return g.id === args.id
            })    
        },

        authors(){
            return db.authors;
        },
        author(parent, args){
            
            return db.authors.find((a) => {
                return a.id === args.id
            })   
        },

        reviews(){
            return db.reviews
        },
        review(parent, args){
            
            return db.reviews.find((r) => {
                return r.id === args.id
            })   
        },
    },

    Game: {

        reviews(parent){
            return db.reviews.filter( (r) => {
                return r.game_id === parent.id
            })
        }
    },

    Author: {
        reviews(parent){

            return db.reviews.filter( (r) => {
                return r.author_id === parent.id
            })
        }
    },

    Review: {
        game(parent){
            return db.games.find( (g) => {
                return g.id === parent.game_id
            })
        },
        author(parent){

            return db.authors.find( (a) => {
                return a.id === parent.author_id
            })
        }
    },

    Mutation: {
        addNewGame(parent, args){
            const game = {
                ...args.game,
                id: (Math.floor(Math.random() * 10000)+1).toString()
            }

            db.games.push(game)
            return game;
        },

        deleteGame(parent, args){
            db.games = db.games.filter( (g) => g.id !== args.id)
            return db.games;
        },

        updateGame(parent, args){

            db.games = db.games.map( (g) => {
                if(g.id === args.id){
                    return {...g, ...args.edits}
                } else
                    return g
            })
            return db.games.find( (g) => g.id === args.id)
        },
    }
}
// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

// app.use(express.static(path.join(__dirname, '../client/public')));
app.get("/home", function(req, res){
    res.sendFile("index.html")
})
// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

