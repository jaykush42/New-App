import React, { useEffect, useRef, useState } from 'react'
import News from './News';
import './NewsApi.css'

function NewsApi() { 
   
    const apiKey = 'Your Api Key';
    
    
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('India');
    
    const apiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${apiKey}`;
  
    const queryInputRef = useRef(null);

    useEffect(()=>{
       fetchData();
    }, [query])  
      
    async function fetchData(){
       try
       { const response = await fetch(apiUrl);
        const jsonData  = await response.json();

        setNewsList(jsonData.articles);
       } catch(e){
        console.log(e,'error occured');
       }
    }

    function handleSubmit(event){
      event.preventDefault();
      let queryValue = queryInputRef.current.value;
      setQuery(queryValue);  
    }

  return (
    <div className='news-app'> 
    <h1> News Daily</h1>
      <form onSubmit={handleSubmit}>
      <input className='query-inp' type="text" ref = {queryInputRef} placeholder='Search here' />
      <input className='btn-submit' onClick={handleSubmit} type='submit' value="Submit" />
      </form>
    <div className='news-block'>
      { newsList ? newsList.map((news) => {  
        return <News key={news.url} news={news} />
      }):null}
    </div> 
    </div>
  );
}

export default NewsApi
