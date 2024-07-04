'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const OptionValue = ({ label, value, onChange, menuItems, rowIndex }: any) => {
  return (
    <FormControl
      style={{
        width: '100%',
        marginTop: '35px',
        marginBottom: '10px',
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value[rowIndex]}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        style={{ width: '100%' }}
      >
        {menuItems.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionValue;
