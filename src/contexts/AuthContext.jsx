import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkStoredUser = () => {
      const storedUsername = localStorage.getItem('username')
      if (storedUsername) {
        setUsername(storedUsername)
      }
      
      setLoading(false)
    }

    checkStoredUser()
  }, [])

  const signup = async (usernameInput) => {
    setLoading(true)
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const cleanUsername = usernameInput.trim()
    setUsername(cleanUsername)
    localStorage.setItem('username', cleanUsername)
    
    setLoading(false)
    return cleanUsername
  }

  const logout = () => {
    setUsername(null)
    localStorage.removeItem('username')
  }

  const value = {
    username,
    loading,
    signup,
    logout,
    isAuthenticated: !!username
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}