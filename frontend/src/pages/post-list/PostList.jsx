import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import instance from '../../services/instance';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import useForm from '../../hooks/useForm';


export const PostList = () => {
  const [posts, setPost] = useState([]);
  const [input, setInput] = useState({ body: '' });
  // const [form, handleFormChange] = useForm({ body: '' });
  const history = useHistory();

  useEffect(() => {
    const getPosts = () => {
      instance.get('/posts')
        .then(response => {
          console.log(response);
          const { data: posts } = response.data;
          setPost(posts);
        })
        .catch(error => {
          console.log(error);
          history.push('/sign-in');
        })
    }

    getPosts();
  }, []);

  const handleInputChange = event => {
    const { value } = event.target;
    setInput({ body: value });
  }

  const handleInputSubmit = event => {
    instance.post('/posts', { post: input })
      .then(response => {
        console.log(response);
        const post = response.data;
        setPost(posts => [...posts, post]);
        setInput({ body: '' });
      })
      .catch(error => {
        console.log(error);
      })

    event.preventDefault();
  }

  return (
    <div>
      <h1>Posts</h1>
      <ListGroup>
        {posts.map(post => (
          <ListGroup.Item key={post.id}>{post.attributes.body}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleInputSubmit}>
        <Form.Group controlId='formPostBody'>
          <Form.Label>Body</Form.Label>
          <Form.Control
            as='textarea'
            name='body'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type='submit' variant='success'>Submit</Button>
      </Form>
    </div>
  );
}