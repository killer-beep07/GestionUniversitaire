import React, { CSSProperties } from 'react';

const MyImageViewer = () => {
  const imageUrl = '/calendrier1.png'; // Replace with the actual path to your PNG image

  const containerStyle: CSSProperties = {
    width: '50%', // Set the desired width for the container
    margin: 'auto', // Center the container horizontally
    overflowX: 'auto', // Enable horizontal scrollbar if content overflows
  };

  const imageStyle: CSSProperties = {
    width: '100%', // Adjust the width as needed
    height: 'auto',
    display: 'block', // Ensure the image is centered within the container
    margin: 'auto', // Center the image horizontally
  };

  return (
    <div>
      {/* <h2>Image Viewer</h2> */}
      <div style={containerStyle}>
        <img src={imageUrl} alt="Your Image" style={imageStyle} />
      </div>
    </div>
  );
};

export default MyImageViewer;
