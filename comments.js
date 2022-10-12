const Comment = require('./model/Comment');
const News = require("./model/news");

module.exports = (app) => {

    app.post('/news/:newsId/comments', (req, res) => {
        const comment = new Comment(req.body);

        comment
            .save()
            .then(() => News.findById(req.params.newsId))
            .then((post) => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(() => res.status(201).send({ success: "true", msg: "Comment added" }))
            .catch((err) => {
                console.log(err);
            });
    });
};