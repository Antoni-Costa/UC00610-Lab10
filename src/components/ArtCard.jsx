import { useState, useEffect } from 'react';

export default function ArtCard({ objectId }) {
  const [art, setArt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error loading artwork');
        return res.json();
      })
      .then(data => {
        setArt(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching artwork " + objectId, err);
        setLoading(false);
      });
  }, [objectId]);

  if (loading) return (
    <div className="card h-100 shadow-sm border-0 d-flex align-items-center justify-content-center" style={{ minHeight: '350px' }}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading ...</span>
      </div>
    </div>
  );

  if (!art) return null;

  return (
    <>
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={art.primaryImageSmall || 'https://placehold.co/400x300?text=Imagem+Indisponivel'} 
          className="card-img-top" 
          alt={art.title} 
          style={{ height: '250px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Erro+ao+Carregar'; }}
        />
        
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate" title={art.title}>{art.title}</h6>
          <p className="card-text small text-muted">{art.artistDisplayName || 'Artist Unknown'}</p>
          
          <button 
            className="btn btn-dark btn-sm mt-auto w-100" 
            onClick={() => setShowModal(true)}
          >
            See Details
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title h6">{art.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center p-4">
                <img 
                  src={art.primaryImage || 'https://placehold.co/800x600?text=Imagem+Indisponivel'} 
                  className="img-fluid rounded mb-4 shadow" 
                  alt={art.title} 
                  style={{ maxHeight: '500px' }}
                />
                <div className="text-start bg-light p-3 rounded">
                  <p className="mb-2"><strong>Artist:</strong> {art.artistDisplayName || "Artist Unknown"}</p>
                  <p className="mb-2"><strong>Date:</strong> {art.objectDate || "Date not available"}</p>
                  <p className="mb-2"><strong>Style Used:</strong> {art.medium || "Not specified"}</p>
                  <p className="mb-0 text-muted small"><strong>Departamento:</strong> {art.department}</p>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}