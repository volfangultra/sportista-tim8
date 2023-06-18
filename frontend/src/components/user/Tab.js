import React from 'react';
import { Button } from '@mui/material';

function Tab({ label, active, onClick }) {
    return (
        <Button
            className={`custom-button3 ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}

export default Tab;