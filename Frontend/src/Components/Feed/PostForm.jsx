import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Feed.css';

const PostForm = ({ onPostCreated, editingPost, onPostUpdated, onCancelEdit }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingPost) {
      setContent(editingPost.content);
    } else {
      setContent('');
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (editingPost) {
        const res = await api.put(`/editpost/${editingPost._id}`, { content });
        onPostUpdated(res.data);
      } else {
        const response = await api.post('/createpost', { content });
        onPostCreated(response.data);
      }
      setContent('');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-card">
      <h3>{editingPost ? 'Edit your post' : 'Share your thoughts'}</h3>
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
          <div className='edit-cancel'>
            {editingPost && (
              <button type="button" className="cancel-button" onClick={onCancelEdit}>
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="post-button"
            >
              {loading ? (editingPost ? 'Updating...' : 'Posting...') : (editingPost ? 'Update' : 'Post')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
