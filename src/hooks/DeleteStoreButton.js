import React from 'react';
import { Button } from 'react-bootstrap';
import { projectFireStore, auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';


const DeleteStoreButton = ({ id }) => {
    const user = auth.currentUser.uid;
    const db = projectFireStore.collection('cards').doc(user).collection('card');

    const deleteCard = (collectionId) => {     
        db.doc(collectionId).delete().then(() => {
            toast.info('Successfully deleted the card!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });                   
        }).catch((err) => {
            console.log(err);            
        })   
    }   

    return (
        <>
            <Button className="btn btn-primary delete-btn" onClick={() => {deleteCard(id)}}>Delete</Button>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                />
        </>
    )
}


export default DeleteStoreButton;