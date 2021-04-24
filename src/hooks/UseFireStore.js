import {useState, useEffect} from 'react'
import { projectFireStore } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';

const UseFireStore = (collection) => {
    const [docs, setDocs] = useState([]);
    const user = useAuth();

    useEffect(() => {
        const unsub = projectFireStore.collection(collection).doc(`${user.currentUser.uid}`).get()
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            });

        return () => unsub();
    }, [collection])
    
    // useEffect(() => {
    //     projectFireStore.collection('card').doc(`${user.currentUser.uid}`).get().then((doc) => {
    //         console.log(doc.data());
    //     })

    // }, [collection])

    return {docs};
}

export default UseFireStore;