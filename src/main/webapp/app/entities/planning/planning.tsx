import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button } from 'react-bootstrap';

const MyPDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('/pedagogie_2023_fichiers_isic.pdf');

  const handleFiliereName = () => {
    const filiereName = prompt('Entrez le nom de la filière :');

    if (filiereName) {
      const lowerCaseFiliereName = filiereName.toLowerCase();

      switch (lowerCaseFiliereName) {
        case 'isic':
          alert('Planning de la filiere isic');
          setPdfUrl('/pedagogie_2023_fichiers_isic.pdf');
          break;
        case '2ite':
          alert('Planning de la filiere 2ite');
          setPdfUrl('/Programme-2ITE.pdf');
          break;
        default:
          alert("Désolé, le planning de cette filière n'existe pas pour le moment !");
          break;
      }
    }
  };

  return (
    <div>
      <h2>Planning de la Filiere</h2>
      <br />
      <Button variant="primary" onClick={handleFiliereName}>
        La filière souhaitée
      </Button>
      <br />
      <br />

      <div style={{ width: '100%', height: '500px' }}>
        <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default MyPDFViewer;
