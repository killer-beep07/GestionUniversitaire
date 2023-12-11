import React from 'react';

const MyPDFViewer = () => {
  const pdfUrl = '/pedagogie_2023_fichiers_isic.pdf';

  return (
    <div>
      <h2>Planning de la Filiere</h2>
      <div style={{ width: '100%', height: '500px' }}>
        <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default MyPDFViewer;
