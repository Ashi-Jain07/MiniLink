import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostCard from './PostCard';
import api from '../../services/api';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);

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

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/deletepost/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
    setEditingPost(null);
  };

  if (loading) return <div className="loading">Loading feed...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="feed-container">
      <div className="feed">

        <PostForm
          onPostCreated={handleNewPost}
          editingPost={editingPost}
          onPostUpdated={handlePostUpdated}
          onCancelEdit={() => setEditingPost(null)}
        />

        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;