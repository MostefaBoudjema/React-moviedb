// ColumnsSelect.js (or ColumnsSelect.tsx)

import React from 'react';

interface ColumnsSelectProps {
    value: number;
    onChange: (value: number) => void;
}

const ColumnsSelect: React.FC<ColumnsSelectProps> = ({ value, onChange }) => {
    return (
        <div className="col-md-6 d-none d-md-block">
            <div className="mb-3">
                <select
                    className="form-control"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                >
                    {/* <option value={1}>1 Columns</option> */}
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                    <option value={6}>6 Columns</option>
                </select>
            </div>
        </div>
    );
};

export default ColumnsSelect;
