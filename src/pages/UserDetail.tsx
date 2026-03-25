import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { fetchUsers } from '../services/api';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Briefcase, 
  Building2, 
  Hash,
  Compass
} from 'lucide-react';
import './UserDetail.css';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        const foundUser = users.find(u => u.id === Number(id));
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="detail-error glass-panel">
        <h2>{error || 'User not found'}</h2>
        <button className="glass-button" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="user-detail-container animate-fade-in">
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeft size={18} />
        <span>Back to Directory</span>
      </button>

      <div className="detail-header glass-panel staggered-fade-in stagger-1">
        <div className="profile-hero">
          <div className="profile-avatar">
            <span className="avatar-initials">
              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div className="profile-title">
            <h1 className="name">{user.name}</h1>
            <p className="username">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        {/* Contact Info */}
        <div className="detail-section glass-panel staggered-fade-in stagger-2">
          <div className="section-header">
            <div className="section-icon-wrapper"><Phone size={20} /></div>
            <h2>Contact Information</h2>
          </div>
          <div className="section-content">
            <div className="info-group">
              <label><Mail size={14} className="label-icon"/> Email Address</label>
              <a href={`mailto:${user.email}`} className="info-value highlight-link">{user.email}</a>
            </div>
            <div className="info-group">
              <label><Phone size={14} className="label-icon"/> Phone Number</label>
              <a href={`tel:${user.phone.split(' ')[0]}`} className="info-value highlight-link">{user.phone}</a>
            </div>
            <div className="info-group">
              <label><Globe size={14} className="label-icon"/> Website</label>
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="info-value highlight-link">
                {user.website}
              </a>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="detail-section glass-panel staggered-fade-in stagger-3">
          <div className="section-header">
            <div className="section-icon-wrapper"><Building2 size={20} /></div>
            <h2>Company Details</h2>
          </div>
          <div className="section-content">
            <div className="info-group">
              <label><Briefcase size={14} className="label-icon"/> Company Name</label>
              <span className="info-value company-name-large">{user.company.name}</span>
            </div>
            <div className="info-group">
              <label>Catchphrase</label>
              <span className="info-value italic">"{user.company.catchPhrase}"</span>
            </div>
            <div className="info-group">
              <label>Business Strategy</label>
              <span className="info-value">{user.company.bs}</span>
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="detail-section glass-panel staggered-fade-in stagger-4 full-width">
          <div className="section-header">
            <div className="section-icon-wrapper"><MapPin size={20} /></div>
            <h2>Address & Location</h2>
          </div>
          <div className="section-content address-grid">
            <div className="info-group">
              <label>Street</label>
              <span className="info-value">{user.address.street}</span>
            </div>
            <div className="info-group">
              <label>Suite/Apt</label>
              <span className="info-value">{user.address.suite}</span>
            </div>
            <div className="info-group">
              <label>City</label>
              <span className="info-value">{user.address.city}</span>
            </div>
            <div className="info-group">
              <label><Hash size={14} className="label-icon"/> Zipcode</label>
              <span className="info-value">{user.address.zipcode}</span>
            </div>
            <div className="info-group geo-group">
              <label><Compass size={14} className="label-icon"/> Coordinates</label>
              <span className="info-value geo-value">Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
