import React from 'react';

const CustomTooltip = ({ children, event }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '0',
      backgroundColor: '#3498DB', // Couleur de fond
      color: 'white', // Couleur du texte
      padding: '10px',
      border: '1px solid #3498DB', // Couleur de la bordure
      borderRadius: '5px', // Coins arrondis
      zIndex: 1000, // Pour s'assurer que le tooltip apparaît au-dessus des autres éléments
    }}
  >
    {children}
  </div>
);

export default CustomTooltip;
