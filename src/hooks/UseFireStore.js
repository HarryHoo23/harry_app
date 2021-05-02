import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';

const UseFireStore = (collection) => {
    const [docs, setDocs] = useState([]);
    const user = useAuth();

    useEffect(() => {                    
            const unsub = projectFireStore.collection(collection).doc(`${user.currentUser.uid}`).collection('card')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(),                                                
                        id: doc.id
                    })
                });
                setDocs(documents);
            });

            return () => unsub();       
    }, [])

    return {docs};
}

export default UseFireStore;