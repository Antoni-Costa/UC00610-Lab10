import { Link } from 'react-router-dom';

export default function Home() {
  const imageUrl = 'https://images.metmuseum.org/CRDImages/ep/web-large/DP130999.jpg';

  return (
    <div className="container-fluid p-0">
      <div 
        className="d-flex align-items-center text-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '85vh', 
          color: 'white',
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h1 className="display-3 fw-bold mb-4 text-uppercase">
                Met Art Explorer
              </h1>
              <p className="lead fs-4 mb-5 px-md-5">
                Discover iconic masterpieces and hidden gems from the Metropolitan Museum of Art's world-class collection.
              </p>
              
              <Link 
                to="/gallery" 
                className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-bold text-uppercase shadow"
                style={{ borderRadius: '50px' }}
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 py-5 text-center">
        <h2 className="mb-4">Experience Fine Art</h2>
        <p className="text-muted fs-5 mb-0 mx-auto" style={{ maxWidth: '700px' }}>
          Access high-quality imagery and detailed historical data directly from the MET Museum's official digital archives.
        </p>
      </div>
    </div>
  );
}