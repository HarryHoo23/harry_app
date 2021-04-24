import {useState, useEffect} from 'react'
import { storage, projectFireStore, timestamp, auth } from '../firebase/firebase';

const UseStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const currentUser = auth.currentUser.uid;

    useEffect(() => {
        //references
        if(file) {
            const storageRef = storage.ref(file.name);
            const collectionRef = projectFireStore.collection('card').doc(currentUser);
           
            storageRef.put(file).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp(); // File Created time in firebase.
                collectionRef.set({ 
                    "images" : {
                        url, 
                        createdAt,
                        "Content": "food"
                    }
                });
                setUrl(url);
            });
        } else {
            console.log('error');
        }

        
    }, [file, currentUser])
 

    return {
        progress,
        url,
        error
    }
    
}

export default UseStorage;