import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostCard from './PostCard';
import api from '../../services/api';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/getallpost');
      setPosts(response.data);
    } catch (error) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) return <div className="loading">Loading feed...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="feed-container">
      <div className="feed">
        <PostForm onPostCreated={handleNewPost} />
        
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed