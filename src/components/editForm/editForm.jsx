import { useEffect, useState } from 'react'
import { updateCareer } from '../testimony/testimony'
import GenericOverlay from '../overlay/GenericOverlay'
import GenericForm from '../genericForm/GenericForm'

const EditForm = ({ 
  testimonyItem,
  onClose, 
  onEditSuccess,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  useEffect(() => {    
    if (testimonyItem) {
      setFormData({
        title: testimonyItem.title || '',
        content: testimonyItem.content || ''
      })
    }
  }, [testimonyItem])
  
  const handleSubmit = async () => {
   if (!formData.title.trim()) {
     return
   }
   if (!formData.content.trim()) {
     return
   }   
   if (!testimonyItem?.id) {
     return
   }
    
   setIsEditing(true)

   await updateCareer(testimonyItem.id, formData)
          
    alert('Item updated successfully')
    setIsEditing(false)
    setFormData({ username: '', title: '', content: '' })  
    onEditSuccess()
  }

  const handleCancel = () => {
    onClose?.()
  }

  if (!testimonyItem) {
    return null
  }
  
  const isButtonEnabled = () => {
    const fieldsSetted = formData.title.trim().length > 0 && formData.content.trim().length > 0
    return fieldsSetted && !isEditing
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
  )

  return (
    <GenericOverlay
      isOpen={!!testimonyItem}
      onClose={onClose}
    >
      <GenericForm
        title="Edit Item"
        buttonText={isEditing ? "Saving..." : "Save"}
        onSubmit={handleSubmit}
        isLoading={isEditing}
        isButtonEnabled={isButtonEnabled}
        showCancelButton={true}
        cancelButtonText="Cancel"
        onCancel={handleCancel}
      >
       {formContent}
      </GenericForm>
    </GenericOverlay>
  )
}

export default EditForm