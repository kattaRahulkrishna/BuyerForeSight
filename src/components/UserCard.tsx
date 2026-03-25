import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import './UserCard.css';

interface UserCardProps {
  user: User;
  style?: React.CSSProperties;
}

const UserCard: React.FC<UserCardProps> = ({ user, style }) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div 
      className="hex-card-wrapper animate-fade-in" 
      style={style}
      onClick={() => navigate(`/user/${user.id}`)}
    >
      <div className="hex-border"></div>
      <div className="hex-inner">
        <div className="hex-avatar-border">
          <div className="hex-avatar">
            {getInitials(user.name)}
          </div>
        </div>
        
        <h3 className="hex-name">Name: {user.name.split(' ')[0]}</h3>
        
        <div className="hex-details">
          <p>Email: <span title={user.email}>{user.email.length > 15 ? user.email.substring(0,12)+'...' : user.email}</span></p>
          <p>Phone: {user.phone.split(' ')[0]}</p>
          <p>Company: {user.company.name.length > 12 ? user.company.name.substring(0,12)+'...' : user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
