import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import GenericForm from '../components/genericForm/GenericForm'

const Signup = () => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [errorsLines, setErrorsLines] = useState([])
  const { signup, loading } = useAuth()
  const navigate = useNavigate();
 
  const isButtonEnabled = () => {
    return inputValue.trim().length > 0 && errorsLines.length === 0 && !loading
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    
    const { errors } = validateUsername(value);
    setErrorsLines(errors);
  }
 
  const validateUsername = (username) => {
    if (username.length === 0) return

    const newErrors = []
    if (username.trim().length < 3) {
      newErrors.push('Username must have at least 3 characters')
    }
    if (username.trim().length > 20) {
      newErrors.push('Username must have a maximum of 20 characters')
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      newErrors.push('Use only letters, numbers and underscore (_)')
    } 

    return { 
      errors: newErrors, 
      isValid: newErrors.length === 0 
    }
  } 

  const handleSubmit = async (e) => {
    const { errors, isValid } = validateUsername(inputValue)
     
    if (!isValid) {
      setErrorsLines(errors)
      return
    }

    try {
      await signup(inputValue)
      navigate('/home')
    } catch (err) {
      setError('Error creating user. Please try again.')
    }
  }

  const formContent = (
    <div className="signup-form-content">
      <div className="form-input-group">
        <p className="form-label">Please enter your username</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Jhon Doe"
          className={`form-input ${errorsLines.length > 0 ? 'form-input form-input-error' : ''}`}
          disabled={loading}
          autoFocus
        />
      </div>        
    </div>
  );

  return (
    <GenericForm
      title="Welcome to CodeLeap network!"
      subtitle="Please enter your username"
      buttonText="ENTER"
      onSubmit={handleSubmit}
      isLoading={loading}
      errors={errorsLines}
      isButtonEnabled={isButtonEnabled()}
    >
      {formContent}
    </GenericForm>
  )
}

export default Signup