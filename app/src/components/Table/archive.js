import React from 'react';
import { GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

// const handleAddRow = () => {
//   // setRows((prevRows) => [...prevRows, createRandomRow()]);
//   setRows((prevRows) => [{ name: Yo }, ...prevRows]);
// };
// const handleUpdateRow = () => {
//   setRows((prevRows) => {
//     const rowToUpdateIndex = randomInt(0, rows.length - 1);

//     return prevRows.map((row, index) =>
//       index === rowToUpdateIndex
//         ? { ...row, username: randomUserName() }
//         : row
//     );
//   });
// };
// const handleDeleteRow = () => {
//   setRows((prevRows) => {
//     const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
//     return [
//       ...rows.slice(0, rowToDeleteIndex),
//       ...rows.slice(rowToDeleteIndex + 1),
//     ];
//   });
// };
