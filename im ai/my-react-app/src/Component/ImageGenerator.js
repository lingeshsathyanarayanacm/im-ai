// src/components/ImageGenerator.js
import './ImageGenerator.css';
import React, { useState, useEffect } from 'react';

const ImageGenerator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pixabayImages, setPixabayImages] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchPixabayImages();
  };

  const fetchPixabayImages = async () => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=33250958-8290fe1c85f930af31d24427f&q=${searchQuery}&per_page=3`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPixabayImages(data.hits.map((image) => image.webformatURL));
    } catch (error) {
      console.error('Error fetching Pixabay images:', error);
      setPixabayImages([]);
    }
  };

  useEffect(() => {
    // Fetch an initial set of random images on component mount
    fetchPixabayImages();
  }, []);

  return (
    <div className="container">
      <h1>AI Image Generator App</h1>

      <form onSubmit={handleSearchSubmit}>
        <label>
          Search for images:&nbsp;
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>

      {pixabayImages.length > 0 && (
        <div>
          {pixabayImages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Generated Pixabay Image ${index}`} />
          ))}
        </div>
      )}

      {pixabayImages.length === 0 && <p>No images found.</p>}
    </div>
  );
};

export default ImageGenerator;
