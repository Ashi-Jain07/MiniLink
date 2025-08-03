import React from 'react';
import { Link } from 'react-router-dom';
import './Feed.css';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <Link to={`/profile/${post.author._id}`} className="author-link">
            <div className="author-avatar">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <div className="author-info">
              <h4>{post.author.name}</h4>
              <span className="post-time">{formatDate(post.createdAt)}</span>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;