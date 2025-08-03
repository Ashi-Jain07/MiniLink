import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import PostCard from '../Feed/PostCard';
import api from '../../services/api';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/getUser/${userId}`);
      setUser(response.data);
      setEditForm({ name: response.data.name, bio: response.data.bio });
    } catch (error) {
      setError('Failed to fetch user profile');
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/getpost/${userId}`);
      setPosts(response.data);
    } catch (error) {
      setError('Failed to fetch user posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/updateUser/${userId}`, editForm);
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const isOwnProfile = currentUser && currentUser.id === userId;

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="profile-info">
            {editing ? (
              <form onSubmit={handleEdit} className="edit-form">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Bio"
                  rows="3"
                  maxLength="500"
                />
                <div className="edit-buttons">
                  <button type="submit" className="save-button">Save</button>
                  <button 
                    type="button" 
                    onClick={() => setEditing(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1>{user.name}</h1>
                <p className="profile-email">{user.email}</p>
                {user.bio && <p className="profile-bio">{user.bio}</p>}
                <p className="profile-joined">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
                
                {isOwnProfile && (
                  <button 
                    onClick={() => setEditing(true)}
                    className="edit-button"
                  >
                    Edit Profile
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="profile-posts">
          <h2>Posts ({posts.length})</h2>
          
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>{isOwnProfile ? "You haven't posted anything yet." : "No posts to show."}</p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;