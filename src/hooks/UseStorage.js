import {useState, useEffect} from 'react'
import { storage, projectFireStore, timestamp, auth } from '../firebase/firebase';

const UseStorage = (file, form) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [time, setTime] = useState(null);
    const currentUser = auth.currentUser.uid;

    useEffect(() => {
        //references
        if(file) {
            const storageRef = storage.ref(file.name);
            const collectionRef = projectFireStore.collection('cards').doc(currentUser).collection("card");
           
            storageRef.put(file).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                let roundPercentage = Math.round(percentage * 100)/100;
                setProgress(roundPercentage);
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp(); // File Created time in firebase.                
                collectionRef.add({ 
                    "image": url, 
                    createdAt,
                    "content": {                     
                        "title": form.title,
                        "body": form.content
                    }                
                });
                setTime(createdAt);
                setUrl(url);
            });
        } else {
            console.log('error');
        }
        
    }, [file, currentUser])

    return {
        progress,
        url,
        form,
        time,
        error
    }
    
}

export default UseStorage;