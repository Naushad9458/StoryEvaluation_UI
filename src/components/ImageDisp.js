import * as React from 'react';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useLocation } from 'react-router-dom';

export default function ImageDisplay(props) {

    //const {state} = useLocation();
    //const {id} = state;
    const [storyData, setImageData] = React.useState([])

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        fetch("http://localhost:5000/transition_events_pics?key=" + 2)
        .then((res) => res.json())
        .then((json) => {
            setImageData(json)
            console.log('Pics')
            console.log(json)
        })}


  return (
    <ImageList  cellheight={250} cols={6}>
        
      {storyData.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src= {'http://localhost:5000/20220607/' + item.image} 
            alt={item.id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>      
  );
}