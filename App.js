import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [updatedItem, setUpdatedItem] = useState('');
  const [updateItemId, setUpdateItemId] = useState(null); // Track the id of the item being updated

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setData([...data, { id: Date.now(), item: newItem }]);
      setNewItem('');
    }
  };

  const handleShowUpdateField = (id) => {
    setUpdateItemId(id); // Set the id of the item being updated
  };

  const handleUpdateItem = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, item: updatedItem };
      }
      return item;
    });
    setData(updatedData);
    setUpdatedItem('');
    setUpdateItemId(null); // Reset the update item id after update
  };

  const handleDeleteItem = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    setUpdateItemId(null); // Reset the update item id if the deleted item was being updated
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#333', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
        <h1 style={{ color: '#333' }}>CRUD Operations</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>
                    {updateItemId === item.id ? (
                      <>
                        <TextField 
                          value={updatedItem} 
                          onChange={e => setUpdatedItem(e.target.value)} 
                          placeholder="Update item" 
                          variant="outlined" 
                        />
                        <Button onClick={() => handleUpdateItem(item.id)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>Save</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleShowUpdateField(item.id)} variant="contained" color="secondary" style={{ marginRight: '10px' }}>Update</Button>
                        <Button onClick={() => handleDeleteItem(item.id)} variant="contained" color="error" style={{ marginRight: '10px' }}>Delete</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <TextField 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            placeholder="Add new item" 
            variant="outlined" 
            style={{ marginRight: '10px' }}
          />
          <Button onClick={handleAddItem} variant="contained" color="primary">Add Item</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
