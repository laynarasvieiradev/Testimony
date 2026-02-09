import './genericForm.css'

const GenericForm = ({ 
  title, 
  children, 
  buttonText, 
  onSubmit, 
  isLoading, 
  isButtonEnabled,
  buttonType = 'submit',
  onCancel,
  showCancelButton = false,
  cancelButtonText = 'Cancel',
  errors = []
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit()
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    if (onCancel) {
      onCancel()
    }
  }

  const customClass = buttonText === 'Delete' ? 'generic-form-delete' : buttonText === 'Save' ? 'generic-form-save' : ''

  return (
     <div className="generic-form-card">
       {title && (
         <h1 className="generic-form-title">{title}</h1>
       )}

       <form onSubmit={handleSubmit} className="generic-form">
         <div className="generic-form-content">
           {children}
         </div>
         <div className="generic-form-actions">  
            {showCancelButton && (
              <button
                type="button"
                onClick={handleCancel}
                className="generic-form-cancel-button"
                disabled={!isButtonEnabled ||isLoading}
              >
                {cancelButtonText}
              </button>
            )}
                      
           <button
              type={buttonType}
            disabled={!isButtonEnabled || isLoading}
            className={`generic-form-submit-button ${customClass}`}
          >
            {isLoading ? (
              <div className="generic-form-loader-container">
                <div className="generic-form-loader"></div>
                <span>Loading...</span>
              </div>
            ) : (
              buttonText
            )}
          </button>
         </div>
          {errors && errors.length > 0 && (
             <div className="generic-form-errors">
               {errors.map((line, index) => (
                 <p key={index} className="form-error-line">{line}</p>
               ))}
             </div>
           )}
       </form>
     </div>
  )
}

export default GenericForm