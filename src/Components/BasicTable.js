import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vehicle name with the largest sum</TableCell>
            <TableCell>{props.props.maxSum['name']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Related home planets and their respective population</TableCell>
            <TableCell>
              {
                props.planets.map((planet) => `[${planet[0]}, ${planet[1]}] `)
              }
            </TableCell>

          </TableRow>
          <TableRow>
            <TableCell>Related pilot names</TableCell>
            <TableCell>
              {
                props.people.map((people) => `${people} `)
              }
            </TableCell>

          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}