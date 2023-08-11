// SearchBar.js (or SearchBar.tsx)

import React from 'react';

interface SearchBarProps {
    value: string;
    placeholderValue: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value,placeholderValue, onChange }) => {
    return (
        <div className="col-md-6">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholderValue}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
