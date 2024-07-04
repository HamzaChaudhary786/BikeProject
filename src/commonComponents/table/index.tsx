'use client';
import {
  Button,
  CircularProgress,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import React, { useState } from 'react';

interface Columns {
  Heading: string;
  width?: string;
  Cell?: (row: any, index: number) => JSX.Element;
  accessor?: string;
  onClick?: (row: any) => void;
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify' | undefined;
  info?: string;
}

interface TableProps {
  data: any[];
  columns: Columns[];
  isLoading: boolean;
  rowsToShow?: number;
}

export const TableComp: React.FC<TableProps> = ({ columns, data, isLoading, rowsToShow = 8 }) => {
  const [Page, setPage] = useState(0);

  const [PopOverBaseElement, setPopOverBaseElement] = React.useState<HTMLElement | null>(null);
  const [PopoverText, setPopoverText] = React.useState<string>('');

  return (
    <div className="table" style={{ width: '100%' }}>
      <TableContainer
        className="px-5"
        style={{
          width: '100%',
          borderTop: '1px solid rgba(178, 180, 209, 0.31)',
          backgroundColor: 'white',
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns?.map((col, index) => {
                return (
                  <TableCell style={{ width: col.width || '' }} key={index} align={col.align || 'left'}>
                    {col.Heading && (
                      <p
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: '600',
                          width: '100%',
                          fontSize: '12px',
                        }}
                      >
                        {col.Heading}{' '}
                        {col.info && (
                          <span
                            className="ml-3"
                            onMouseEnter={(e) => {
                              setPopoverText(col?.info || '');
                              setPopOverBaseElement(e.currentTarget);
                            }}
                            onMouseLeave={(e) => {
                              setPopOverBaseElement(null);
                            }}
                          >
                            <HelpIcon color="action" fontSize="small" />
                          </span>
                        )}
                      </p>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody style={{ fontWeight: '400', fontSize: '14px' }}>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns?.length || 0} align="center" style={{ padding: '20px' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns?.length || 0} align="center" style={{ padding: '20px' }}>
                  <p style={{ fontWeight: '400', fontSize: '14px' }}>No data found</p>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data?.slice(Page * rowsToShow, Page * rowsToShow + rowsToShow).map((row, index) => {
                return (
                  <TableRow
                    key={row.id || index}
                    style={{
                      background: index % 2 === 0 ? 'rgba(245, 247, 249, 1)' : '',
                    }}
                  >
                    {columns?.map((col, index2) => {
                      return (
                        <TableCell key={index2} align={col.align || 'left'}>
                          {col.Cell
                            ? col.Cell(row, index)
                            : col.accessor?.includes('.')
                              ? col.accessor.split('.').reduce((acc, cur) => acc && acc[cur], row)
                              : row[col.accessor || '']}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mx-5 my-10 flex" style={{ justifyContent: 'space-between', alignItems: 'start' }}>
        <Button
          disabled={Page === 0}
          onClick={() => {
            setPage(Page - 1);
          }}
          startIcon={<p>Add icon here</p>}
          variant="outlined"
          color="secondary"
          style={{
            fontWeight: '400',
            fontSize: '14px',
            marginRight: '20px',
            backgroundColor: 'white',
            color: Page === 0 ? 'grey' : 'rgba(45, 45, 45, 1)',
          }}
        >
          Previous page
        </Button>
        <p
          style={{
            fontWeight: '400',
            fontSize: '14px',
            color: 'rgba(45, 45, 45, 1)',
          }}
        >
          Page {Page + 1} of {Math.ceil(data.length / rowsToShow) || 1}
        </p>
        <Button
          disabled={Page === Math.ceil(data.length / rowsToShow) - 1 || data.length <= rowsToShow}
          onClick={() => {
            setPage(Page + 1);
          }}
          endIcon={<p>Add icon here</p>}
          variant="outlined"
          color="secondary"
          style={{
            fontWeight: '400',
            fontSize: '14px',
            marginRight: '20px',
            backgroundColor: 'white',
            color: Page === Math.ceil(data.length / rowsToShow) - 1 ? 'grey' : 'rgba(45, 45, 45, 1)',
          }}
        >
          Next page
        </Button>
      </div>

      <Popover
        disableRestoreFocus
        disableEnforceFocus
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(PopOverBaseElement)}
        anchorEl={PopOverBaseElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setPopOverBaseElement(null)}
      >
        <Typography sx={{ p: 2, width: '400px' }}>{PopoverText}</Typography>
      </Popover>
    </div>
  );
};
