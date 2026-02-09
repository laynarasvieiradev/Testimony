import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { createCareer } from './addTertimony'
import GenericForm from '../genericForm/GenericForm'

const AddForm = ({ onTestimonyCreated }) => {
  const { username, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [formData, setFormData] = useState({
    username: username,
    title: '',
    content: ''
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async () => {
     if (!formData.username.trim()) {
      return
    }
    if (!formData.title.trim()) {
      return
    }
    if (!formData.content.trim()) {
      return
    }

    setLoading(true)
    try {
      await createCareer(formData)      
      
      setFormData({ username: '', title: '', content: '' })    
      
      alert('Testimony created successfully!')
    } catch (err) {
      const newError = ['Failed to create testimony']
      setError(newError)
    } finally {
      setLoading(false)
      onTestimonyCreated()
    }
  }

  const isButtonEnabled = () => {
    const fieldsSetted = formData.title.trim().length > 0 && formData.content.trim().length > 0
    return fieldsSetted && !loading
  }
  
  const formContent = (
    <div className="what-form-content">
      <div className="form-input-group mb-large">
        <p className="form-label">Title</p>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Hello World"
          className={`form-input`}
          autoFocus
        />
      </div>        
      <div className="form-input-group">
        <p className="form-label">Content</p>
        <textarea
          type="text"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="Content Here"
          className={`form-textarea`}
          autoFocus
        />
      </div>        
    </div>
  );

  return (
    <GenericForm
      title="What’s on your mind?"
      buttonText="Create"
      onSubmit={handleSubmit}
      isButtonEnabled={isButtonEnabled()}
      isLoading={loading}
      cancelButtonText="Cancel"
      showCancelButton={true}
      errors={error}
      onCancel={() => setFormData({ ...formData, title: '', content: '' })}
    >
      {formContent}
    </GenericForm>
  )
}

export default AddForm