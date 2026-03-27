import { useState, useEffect } from 'react';
import ArtCard from '../components/ArtCard';

export default function Gallery() {
  const [allArtData, setAllArtData] = useState([]);
  const [displayIds, setDisplayIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(async (data) => {
        const ids = data.objectIDs ? data.objectIDs.slice(0, 12) : [];
        
        try {
          const detailsPromises = ids.map(id => 
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
              .then(r => r.ok ? r.json() : null)
          );
          
          const results = await Promise.all(detailsPromises);
          const validResults = results.filter(item => item !== null);
          
          setAllArtData(validResults);
          setDisplayIds(validResults.map(art => art.objectID));
          setLoading(false);
        } catch {
          throw new Error('Failed to fetch artwork details');
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value === "") {
      setDisplayIds(allArtData.map(art => art.objectID));
      return;
    }

    const filtered = allArtData.filter(art => {
      const titleMatch = art.title ? art.title.toLowerCase().includes(value) : false;
      const artistMatch = art.artistDisplayName ? art.artistDisplayName.toLowerCase().includes(value) : false;
      return titleMatch || artistMatch;
    });
    
    setDisplayIds(filtered.map(art => art.objectID));
  };

  if (loading) return (
    <div className="text-center mt-5 p-5">
      <div className="spinner-border text-primary mb-3"></div>
      <p className="h4">Loading collection...</p>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger shadow-sm">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="mb-4">Metropolitan Museum Collection</h2>
          <input 
            type="text" 
            className="form-control form-control-lg shadow-sm border-primary" 
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="form-text mt-2">
            Showing {displayIds.length} artworks.
          </div>
        </div>
      </div>

      <div className="row g-4">
        {displayIds.length > 0 ? (
          displayIds.map(id => (
            <div key={id} className="col-12 col-md-6 col-lg-4">
              <ArtCard objectId={id} /> 
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <p className="text-muted h5">No results found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}