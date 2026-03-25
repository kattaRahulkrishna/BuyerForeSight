import type React from 'react';

interface SortControlProps {
  sortBy: 'name' | 'company';
  sortOrder: 'asc' | 'desc';
  onSortByChange: (val: 'name' | 'company') => void;
  onSortOrderChange: (val: 'asc' | 'desc') => void;
}

const SortControl: React.FC<SortControlProps> = ({ 
  sortBy, 
  sortOrder, 
  onSortByChange, 
  onSortOrderChange 
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Field</span>
        <select 
          className="glass-input"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'name' | 'company')}
          style={{ width: 'auto', borderRadius: '20px', padding: '0.4rem 1rem', cursor: 'pointer' }}
        >
          <option value="name" style={{ background: 'var(--bg-deep)' }}>Name</option>
          <option value="company" style={{ background: 'var(--bg-deep)' }}>Company</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Order</span>
        <select 
          className="glass-input"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
          style={{ width: 'auto', borderRadius: '20px', padding: '0.4rem 1rem', cursor: 'pointer' }}
        >
          <option value="asc" style={{ background: 'var(--bg-deep)' }}>Ascending</option>
          <option value="desc" style={{ background: 'var(--bg-deep)' }}>Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortControl;
