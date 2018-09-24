const graphql = require('graphql');
const PostsType = require('../types/posts-types');
const Posts = require("../../models/postsModel");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            posts: {
                type: PostsType,
                args: {
                    id: { type: GraphQLString }
                },
                resolve(parent, args) {
                    return Posts.findById(args.id)
                }
            }
        },
    }),
});