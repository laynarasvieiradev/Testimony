import { useState } from 'react'
import { deleteCareer } from '../testimony/testimony'
import GenericForm from '../genericForm/GenericForm'
import GenericOverlay from '../overlay/GenericOverlay'

const RemoveAlert = ({ 
  testimonyItem,
  onClose, 
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSubmit = async () => {
    if (!testimonyItem?.id) {
      alert('Invalid item ID')
      onClose?.()
      return
    }
    
    setIsDeleting(true)
    console.log('passou daqui')

    await deleteCareer(testimonyItem.id)
          
    alert('Item deleted successfully')
    setIsDeleting(false)
    onDeleteSuccess()
  }

  const handleCancel = () => {
    onClose?.()
  }

  if (!testimonyItem) {
    return null
  }

  return (
    <GenericOverlay
      isOpen={!!testimonyItem}
      onClose={onClose}
    >
      <GenericForm
        title="Are you sure you want to delete this item?"
        buttonText={isDeleting ? "Deleting..." : "Delete"}
        onSubmit={handleSubmit}
        isLoading={isDeleting}
        isButtonEnabled={!isDeleting}
        showCancelButton={true}
        cancelButtonText="Cancel"
        onCancel={handleCancel}
      />
    </GenericOverlay>
  )
}

export default RemoveAlert