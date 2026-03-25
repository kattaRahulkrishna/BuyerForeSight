import React, { useState, useEffect, useMemo } from 'react';
import type { User } from '../types/user';
import { fetchUsers } from '../services/api';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import UserCard from '../components/UserCard';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'company'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.email.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      let valA = a.name.toLowerCase();
      let valB = b.name.toLowerCase();
      
      if (sortBy === 'company') {
        valA = a.company.name.toLowerCase();
        valB = b.company.name.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p className="loading-text">Syncing with User Nexus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Connection Lost</h2>
        <p>{error}</p>
        <button className="glass-button" onClick={() => window.location.reload()}>Re-establish Connection</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-top-bar">
        <div className="search-wrapper">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="sort-wrapper">
          <SortControl 
            sortBy={sortBy} 
            sortOrder={sortOrder} 
            onSortByChange={setSortBy} 
            onSortOrderChange={setSortOrder} 
          />
        </div>
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="dashboard-empty">
          <p>No entities found matching "{searchQuery}"</p>
          <button className="glass-button" onClick={() => setSearchQuery('')}>Clear Query</button>
        </div>
      ) : (
        <div className="honeycomb-grid">
          {filteredAndSortedUsers.map((user, index) => (
            <UserCard 
              key={user.id} 
              user={user} 
              style={{ animationDelay: `${index * 0.05}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
