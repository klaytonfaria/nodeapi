const slugfy = require("slug");
const Posts = require("../models/postsModel");

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/posts',
        config: {
            description: 'Get all the posts',
            tags: ['api', 'v1', 'posts']
        },
        handler: () => {
            return Posts.find();
        }
    },
    {
        method: 'POST',
        path: '/api/v1/posts',
        config: {
            description: 'Create a new post',
            tags: ['api', 'v1', 'posts']
        },
        handler: (req, reply) => {
            const { title, content, excerpt, categories, tags } = req.payload;
            const post = new Posts({
                "type": "post",
                "slug": slugfy(title),
                "url": "/posts/" + slugfy(title),
                title,
                content,
                excerpt,
                date: new Date(),
                modified: new Date(),
                categories,
                tags
            });

            return post.save();
        }
    }
];