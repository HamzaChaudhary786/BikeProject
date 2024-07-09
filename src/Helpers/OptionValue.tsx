'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const OptionValue = ({ label, value, onChange, menuItems }: any) => {
  return (
    <FormControl
      style={{
        width: "48%",
        marginTop: "35px",
        marginBottom: "10px",
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Is Active"
        style={{ width: "100%" }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionValue;
