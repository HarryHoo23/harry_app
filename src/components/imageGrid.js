import React from 'react';
import UseFirestore from '../hooks/UseFireStore';
import Card from '../components/card/NewCard';

const ImageGrid = () => {
    const { docs } = UseFirestore(`cards/`);
    const monthsOfYear = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];    
       
    return(        
        <>  
            { docs && docs.map(doc => {                        
                    if (doc.createdAt == null) {
                        return <Card key={doc.id} id={doc.id} img={doc.image}
                            title={doc.content.title} content={doc.content.body}                         
                        /> 
                    } else {
                        var dataSeconds = doc.createdAt.seconds;
                        const time = new Date(dataSeconds * 1000);
                        var month = time.getMonth();
                        var day = time.getDate();
                        var hour = time.getHours();
                        var minute = time.getMinutes();                               
                        let formattedTime = `${hour} : ${minute}`;                    
                        
                    return <Card key={doc.id} id={doc.id} img={doc.image} time={formattedTime} 
                            title={doc.content.title} content={doc.content.body} 
                        month = {monthsOfYear[month]} date={day}
                        />     
                    }                            
                                                                          
                })
            }
        </>
    )
}
export default ImageGrid;
  