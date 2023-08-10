// SearchBar.js (or SearchBar.tsx)

import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="col-md-6">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for TV Serie"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
