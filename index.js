require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')


const app = express()

const BlogPost = require('./models/blog.js')

mongoose.connect('mongodb://127.0.0.1:27017/mongooseAssociation');

const db = mongoose.connection;

db.once('open', () => {
    console.log((`Connected to MongoDB on ${db.host}:${db.port}`));
})

db.on('error', (err) => {
    console.log(`Error`, err);
})

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Home Route, Backend')
})

app.get('/blog', (req, res) => {
    // One way to create a blog post
    BlogPost.create({
        title: 'Mongoose for all Mongoose',
        body: 'This a cool blog post.'
    })

    const post1 = new BlogPost({
        title: 'SEI 1019',
        body: 'Software Engineers are cool.'
    })
    post1.save()
    res.send('Post completed')
})

app.get('/comment', (req, res) => {
    const post2 = new BlogPost({
        title: 'Cool Post',
        body: `Let's make a cool post`
    })
    const myComment = { header: 'Cool', content: 'This is cool'}
    post2.comments.push(myComment)

    post2.save()
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})