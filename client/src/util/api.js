export const post = async(endPoint, dataObj) =>{ 
    let data, result = null;   
    try {
        const url = `http://localhost:5000/api/v1/${endPoint}`;
        result = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials:'include',
            body:JSON.stringify({
                ...dataObj
            })
        }); 
        data = await result.json();
        return [result, data];
    } catch (error) {
    }   
}


export const get = async(endPoint) =>{ 
    let data, result = null;   
    try {
        const url = `http://localhost:5000/api/v1/${endPoint}`;
        result = await fetch(url,{
            method:'GET',
            credentials:'include'
        }); 
        data = await result.json();
        return [result, data];
    } catch (error) {
        console.log(error);
    }   
}


export const del = async(endPoint, contactId) =>{ 
    let data, result = null;   
    try {
        const url = `http://localhost:5000/api/v1/${endPoint}/${contactId}`;
        result = await fetch(url,{
            method:'DELETE',
            credentials:'include'
        }); 
        data = await result.json();
        return [result, data];
    } catch (error) {
        console.log(error);
    }   
}



export const patch = async(endPoint, dataObj) =>{ 
    let data, result = null;   
    try {
        const url = `http://localhost:5000/api/v1/${endPoint}`;
        result = await fetch(url,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials:'include',
            body:JSON.stringify({
                ...dataObj
            })
        }); 
        data = await result.json();
        return [result, data];
    } catch (error) {
        console.log(error);
    }   
}




