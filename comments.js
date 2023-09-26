// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create posts object
const posts = {};

// Handle post requests to /posts
app.post('/posts', async (req, res) => {
  // Get data from request body
  const { title } = req.body;

  // Create id for post
  const id = Math.random().toString(36).substring(2);

  // Add post to posts object
  posts[id] = { id, title, comments: [] };

  // Send data back to client
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  // Send response to client
  res.status(201).send(posts[id]);
});

// Handle get requests to /posts
app.get('/posts', (req, res) => {
  // Send posts object back to client
  res.send(posts);
});

// Handle post requests to /events
app.post('/events', (req, res) => {
  // Get event from request body
  const { type, data } = req.body;

  // Check if event is comment created
  if (type === 'CommentCreated') {
    // Get comment from event data
    const { id, content, postId } = data;

    // Get post from posts object
    const post = posts[postId];

    // Add comment to post
    post.comments.push({ id, content });
  }

  // Send response to client
  res.send({});
});

// Listen on port 4002
app.listen(4002, () => {
  console.log('Listening on 4002');
});