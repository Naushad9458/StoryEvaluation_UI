import * as React from 'react';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from '@mui/material/Image';
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
          
            
        })}

     // CSS styles for the container div
    const containerStyle = {
      maxHeight: '400px', // Adjust the maximum height as needed
      overflowY: 'auto', // Add vertical scrollbar when content exceeds the container height
    };


  return (
    <div style={containerStyle}>
    <ImageList  cellheight={250} cols={6}>
        
      {imageData.map((item) => (
        <ImageListItem key={item.image}>
          <img
            //Add the image path here new
            //src={`/images_files/${eventDate}/${eventDate}/${item.image}`}
            //alt={`/images_files/${eventDate}/${eventDate}/${item.image}`}
            //src={`${process.env.PUBLIC_URL}/images_files/${eventDate}/${eventDate}/${item.image}`}
            //alt={`${process.env.PUBLIC_URL}/images_files/${eventDate}/${eventDate}/${item.image}`}
            src= {process.env.PUBLIC_URL + 'images_files/' + eventDate + '/' + eventDate + '/'+ item.image} 
            alt={process.env.PUBLIC_URL + 'images_files/' + eventDate + '/' + eventDate + '/'+ item.image}
            //src= {process.env.PUBLIC_URL + '/' + eventDate + '/' + eventDate + '/'+ item.image} 
            //alt={process.env.PUBLIC_URL + '/' + eventDate + '/' + eventDate + '/'+ item.image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>

    <Image src={process.env.PUBLIC_URL + 'logo192.png'} />      
    </div>
  );
}