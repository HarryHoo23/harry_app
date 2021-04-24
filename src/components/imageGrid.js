import React from 'react';
import UseFirestore from '../hooks/UseFireStore';
import Card from '../components/card/NewCard';
import { auth } from '../firebase/firebase';

const ImageGrid = () => {
    
    const user = auth.currentUser.uid;
    const { docs } = UseFirestore('card/');

    console.log(docs);

    return(        
        <>
            { docs && docs.map(doc => (            
                <Card key={doc.id} img={doc.url} title="random card" content="no content" />
            )) }
        </>
    )
}

export default ImageGrid;

/* <div className="img-wrap" key={doc.id}>
    <img src={doc.url} alt="firebase pic" />
</div> */