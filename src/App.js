import axios from 'axios';
import React, { useState, useEffect } from "react";


function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    if (inputValue > 3) {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${inputValue}`
        );
        setSearchResults([response.data]);
      }catch (error) {
        console.error(error?.message);
        setError("no such post available.");
      }finally {
          setLoading(false);
        }
      } else {
      setSearchResults([]);
    }
  };
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      <input type="text" onChange={inputChange} value={inputValue} />
      <button onClick={getData}>Get Post</button>
      <p>{error}</p>
      
      <ul>
        {loading? <p>loading...</p>
        :
        searchResults?.map((result) => (
          <li key={result.id}>{result.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;








