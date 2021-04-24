import React, {useEffect} from 'react'
import UseStorage from '../../hooks/UseStorage';

const ProgressBar = ({file, setFile}) => {
    const { url, progress } = UseStorage(file);
    console.log(progress, url);
    
    useEffect(() => {        
        url ? setFile(null) : setFile(file);     
    }, [url, file, setFile])

    return (
        <div className="progress-bar mb-5" style={{ width: progress + "%" }}>{progress + "%"}</div>
    )
}

export default ProgressBar;