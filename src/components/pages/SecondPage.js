import React, {useState} from 'react';
import { Button, CardColumns, Container } from 'react-bootstrap';
import UploadForm from '../uploadForm/UploadForm';
import ImageGrid from '../imageGrid';


const SecondPage = () => {
    const [file, setFile] = useState(null);

    const getFileHandler = (uploadedFile) => {
        setFile(uploadedFile);
    }

    return (
        <Container fluid className="mt-5 board-container">
            <div className="cardboard-left">
                <CardColumns>                                                                                        
                    <ImageGrid imageUploaded={file} />
                </CardColumns>                
            </div>
                <div className="fixed-right">
                    <h2>Upload your card here:</h2>
                    <UploadForm getFileData={getFileHandler} />
                    <div className="add-box">
                    </div>
                </div>    
                
            
        </Container>
        
    );
}

export default SecondPage;