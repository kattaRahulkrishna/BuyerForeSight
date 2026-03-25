import type React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      <Search 
        size={20} 
        style={{ 
          position: 'absolute', 
          left: '1rem', 
          color: 'var(--neon-cyan)',
          filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.5))'
        }} 
      />
      <input
        type="text"
        className="glass-input"
        style={{ 
          paddingLeft: '3rem', 
          borderRadius: '30px', 
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          background: 'rgba(26, 16, 60, 0.6)'
        }}
        placeholder="Search Matrix..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
