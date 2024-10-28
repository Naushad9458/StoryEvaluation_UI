import * as React from 'react';
import { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import config from '../../config.json';
import TextField from '@mui/material/TextField';

export default function ImageDispStepper(props) {

    //const {state} = useLocation();
    //const {id} = state;
    const [imageData, setImageData] = React.useState([])

    
    const {eventID} = props;
    


    //console.log(eventDate, 'ImageDisplay')
    //console.log(eventID, 'ImageDisplay')
    
    

    useEffect(() => {
        fetchData();
      }, []);
    
    const fetchData = () => {
        fetch(config.SERVER_URL+"/fetch_images", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({eventID: eventID})
          
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            setImageData(json)
          
            
        })}

     // CSS styles for the container div
    const containerStyle = {
      maxHeight: '500px', //Adjust the maximum height as needed
      overflowY: 'auto', //Add vertical scrollbar when content exceeds the container height
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

            src= {process.env.PUBLIC_URL + item.image.substring(36)}
            alt={process.env.PUBLIC_URL + item.image.substring(36)}
            //src= {process.env.PUBLIC_URL + '/' + eventDate + '/' + eventDate + '/'+ item.image} 
            //alt={process.env.PUBLIC_URL + '/' + eventDate + '/' + eventDate + '/'+ item.image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>

    

          
    </div>
  );
}