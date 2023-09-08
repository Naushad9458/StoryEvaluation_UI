import * as React from 'react';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useLocation } from 'react-router-dom';

export default function ImageDisplay(props) {

    //const {state} = useLocation();
    //const {id} = state;
    const [imageData, setImageData] = React.useState([])

    const {eventDate} = props;
    const {eventID} = props;


    console.log(eventDate, 'ImageDisplay')
    console.log(eventID, 'ImageDisplay')
    
    

    useEffect(() => {
        fetchData();
      }, []);
    
    const fetchData = () => {
        fetch("https://4b97-136-206-48-13.ngrok-free.app/fetch_images", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({eventID: eventID, eventDate: eventDate})
          
        })
        .then((res) => res.json())
        .then((json) => {
            setImageData(json)
          
            console.log(json)
        })}


  return (
    <ImageList  cellheight={250} cols={6}>
        
      {imageData.map((item) => (
        <ImageListItem key={item}>
          <img
            src= {process.env.PUBLIC_URL + 'images/20220605/' + item} 
            alt={item.id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>      
  );
}