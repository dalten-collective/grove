import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import styled from 'styled-components';
import 'react-photo-view/dist/react-photo-view.css';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const StandardImageList = () => {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.colors.ui.secondary,
  // //  === 'dark' ? '#1A2027' : '#fff',
  // // ...theme.typography.body2,
  // // padding: theme.space[1],
  // textAlign: 'center',
  // color: theme.colors.brand.secondary,
  // maxWidth: '80%',
}));

const GridCard = ({ file }) => (
  <Grid item xs={2} sm={4} md={4} key={index}>
    <Item>
      <Card>
        <CardContent></CardContent>
      </Card>
    </Item>
  </Grid>
);
