const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
} = graphql;

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        id: { type: GraphQLString },
        type: { type: GraphQLString },
        slug: { type: GraphQLString },
        url: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        excerpt: { type: GraphQLString },
        date: { type: GraphQLString },
        modified: { type: GraphQLString },
        categories: { type: GraphQLList(GraphQLString) },
        tags: { type: GraphQLList(GraphQLString) },
        published: { type: GraphQLBoolean }
    })
});

module.exports = PostsType;