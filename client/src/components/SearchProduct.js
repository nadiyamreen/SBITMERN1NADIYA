// SearchProduct.js
import React, { useState } from 'react';
import { Box, TextField, Grid, Card, CardContent, Typography } from '@mui/material';

const medcs = [
  { id:"m1", name: "Dolo", category: "all", agegroup:"12-60", price: 10, expirydate:"10-july-2026" },
  { id:"m2", name: "Crocin", category: "kids", agegroup:"0-12", price: 20, expirydate:"10-july-2026" },
  { id:"m3", name: "Vicks", category: "women", agegroup:"15-50", price: 30, expirydate:"10-july-2026" },
  { id:"m4", name: "Coldact", category: "kids", agegroup:"12-18", price: 40, expirydate:"10-july-2026" },
  { id:"m5", name: "Syrup", category: "all", agegroup:"12-60", price: 50, expirydate:"10-july-2026" },
  { id:"m6", name: "Vaccine", category: "old", agegroup:"50-80", price: 70, expirydate:"10-july-2028" },
];

const SearchProduct = () => {
  const [search, setSearch] = useState("");
  const filterProducts = medcs.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Search Medicines</Typography>
      <TextField
        fullWidth
        label="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filterProducts.map((med) => (
          <Grid item xs={12} sm={6} md={4} key={med.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{med.name}</Typography>
                <Typography>Category: {med.category}</Typography>
                <Typography>Age Group: {med.agegroup}</Typography>
                <Typography>Price: ₹{med.price}</Typography>
                <Typography>Expiry: {med.expirydate}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchProduct;