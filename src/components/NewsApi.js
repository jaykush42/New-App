import React, { useEffect, useRef, useState } from 'react'
import News from './News';
import './NewsApi.css'

function NewsApi() { 
    const apiKey = '97aabfb35bb74a37bdfd13238bee1470';
    
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('India');
    
   // const apiURL = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-03&sortBy=publishedAt&apiKey=${apiKey}`
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-08-03&sortBy=publishedAt&apiKey=${apiKey}`;
  
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
      <input className='query-inp' type="text" ref = {queryInputRef} />
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