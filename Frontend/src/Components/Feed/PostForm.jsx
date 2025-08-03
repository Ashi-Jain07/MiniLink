import React, { useState } from 'react';
import api from '../../services/api';
import './Feed.css';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/createpost', { content });
      onPostCreated(response.data);
      setContent('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-card">
      <h3>Share your thoughts</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          maxLength="500"
          disabled={loading}
        />
        
        <div className="post-form-footer">
          <span className="character-count">
            {content.length}/500 characters
          </span>
          <button 
            type="submit" 
            disabled={loading || !content.trim()}
            className="post-button"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;