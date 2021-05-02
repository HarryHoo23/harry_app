import React, {useEffect} from 'react'
import UseStorage from '../../hooks/UseStorage';

const ProgressBar = ({file, setFile, form }) => {
    const { url, progress } = UseStorage(file, form);    
    useEffect(() => {     
        if(url) {
           setFile(null) 
        } 
    }, [url, setFile])

    return (
        <div className="progress-bar mb-3" style={{ width: progress + "%" }}>{progress + "%"}</div>
    )
}

export default ProgressBar;