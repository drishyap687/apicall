import React, { useState } from 'react';
import axios from 'axios';
import './UrlForm.css';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    const apiUrl = 'https://inportant.farmseller.in/youtube-info';

    try {
      const response = await axios.post(apiUrl, { url });
      setResponseData(response.data);
      setError(''); // Clear error if request is successful
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching data');
    }
  };

  return (
    <div className="url-form">
      <h1>Submit URL to API</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter YouTube URL"
        />
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div className="response-data">
          <h2>Video Information</h2>
          <p><strong>Duration:</strong> {responseData.duration}</p>
          <p><strong>Thumbnail:</strong></p>
          <img src={responseData.thumbnail} alt="Video Thumbnail" />
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;