import React, {useEffect, useRef} from 'react';
const Home = (props) =>{
    useEffect(()=>{
        props.history.push('/contacts')
    },[])
    return(
        <div className="Home">
        </div>
    )
}
export default Home;