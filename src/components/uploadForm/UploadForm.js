// import React, {Component} from 'react';
// import { Form } from 'react-bootstrap';

// class UploadForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null
//         }
//     }

//     changeHandler = (e) => {
//         e.preventDefault();
//         let selected = e.target.files[0];
//         console.log(selected);
//     }
//     render() {
//         return (
//             <Form className="mt-5">
//                 <input type = "file" onChange={this.changeHandler} />
//             </Form>
//         )
//     }
    
// }

// export default UploadForm;



import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ProgressBar from './ProgressBar';

const UploadForm = (props) => {
    
    const [file, setFile] = useState(null);
    const [submitFile, setSubmitFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', ' image/jpeg', 'image/jpg'];
    const [formsFields, setFormsFields] = useState({title: "", content: ""});
    const {title, content} = formsFields;

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)) {
            setFile(selected);                        
            setError("");
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg(jpg))');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file && title && content) {
            setSubmitFile(file);  
            props.getFileData(file);       
            setError("");
        } else {
            setSubmitFile(null);
            setError('Please select an image to submit!');
        }
    }

    const updateFieldChanged = e => {
        setFormsFields({ ...formsFields, [e.target.name]: e.target.value });
    } 

    return (
        <Form className="mt-5 cardSubmitForm" onSubmit={handleSubmit}>
            <label>
                <input type = "file" onChange={changeHandler}/>
                <p className="input-btn"><i className="fas fa-plus"></i></p>
            </label>           
            <div className="output">
                { error && <div className="error">{error}</div>}
                { file && <div>{ file.name }</div>}
                { file && <ProgressBar file={submitFile} setFile={setFile} form={formsFields} />}
            </div>
            <Form.Group id="cardTitleControl">
                <Form.Label>Card Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={e => updateFieldChanged(e)}  required />
            </Form.Group>
            <Form.Group id="cardContentControl" className="pb-3">
                <Form.Label>Please put your content here</Form.Label>
                <Form.Control as="textarea" name="content" value={content} type="text" rows={3} onChange={e => updateFieldChanged(e)} />
            </Form.Group>            
            <Button className="btn btn-primary" type="submit">Submit</Button>        
        </Form>
    )
  
    
}

export default UploadForm;