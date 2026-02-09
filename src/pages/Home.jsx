import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getCareers } from '../components/testimony/testimony'
import Testimony from '../components/testimony/TestimonyCard'
import AddForm from '../components/addForm/AddTestimonyForm'
import './styles/home.css'
import RemoveAlert from '../components/removeAlert/removeAlert'
import EditForm from '../components/editForm/editForm'

const Home = () => {
  const { logout, isAuthenticated } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemEdit, setSelectedItemEdit] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout();
    navigate('/signup')
  }

  const fetchCarrers = async () => {
    try {
      setLoading(true);
      const data = await getCareers()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteClick = (item) => {
    setSelectedItem(item)
  }
  const handleEditItem = (item) => {
    setSelectedItemEdit(item)
  }

  const handleSuccess = () => {    
    closeRemoveAlert()
    fetchCarrers()
  }

  const closeRemoveAlert = () => {    
    setSelectedItem(null)
    setSelectedItemEdit(null)
  }

  useEffect(() => {
    fetchCarrers()
  }, [])

  return (
    <div className="home-container">
      <header className="home-header">        
        <h1 className="home-logo">CodeLeap Network</h1>
        <div className="home-user-info">
          <button onClick={handleLogout} className="home-logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="content-grid">
          <AddForm onTestimonyCreated={fetchCarrers} />
        </div>
        <div className="content-grid grid-testimonies">
            {loading ? (
              <span>Loading Testimonies...</span>
            ) : error ? (
              <span>Was not possible to load testimonies, try again later.</span>
            ) : (
              posts.length === 0 ? (
                <span>No testimonies yet. Be the first to share your experience!</span>
              ) : (
              posts.map(post => (
                <Testimony 
                  key={post.id}
                  testimonyItem={post}
                  onDelete={() => handleDeleteClick(post)}
                  onEdit={() => handleEditItem(post)}
                />
              ))) 
            )}
        </div>
      </main>
      <RemoveAlert
        testimonyItem={selectedItem}
        onClose={closeRemoveAlert}
        onDeleteSuccess={handleSuccess}
      />
      <EditForm
        testimonyItem={selectedItemEdit} 
        onEditSuccess={handleSuccess} 
        onClose={closeRemoveAlert}
      />
    </div>
  );
};

export default Home;