import RemoveAlert from '../removeAlert/removeAlert'
import './testimony.css'
import { formatRelativeTime } from './utils/timeFormatter'

const Testimony = ({ 
  onDelete,
  onEdit, 
  testimonyItem
}) => {

  return (
     <div className="generic-form-card pa-none">
      <div className="generic-title-container">
       {testimonyItem.title && (
         <h1 className="generic-form-title">{testimonyItem.title}</h1>
       )}
       <div className="generic-card-actions">
         <button
           className="generic-button-icon"
           onClick={(e) => {
              e.preventDefault()
              onDelete(testimonyItem.id)
            }}
          >
            <img src="../icons/remove.svg" alt="Remove button" />
          </button>
         <button
           className="generic-button-icon"
           onClick={(e) => {
              e.preventDefault()
              onEdit(testimonyItem)
            }}
          >
            <img  src="../icons/edit.svg" alt="Edit button" />
          </button>
       </div>
       </div>
       <div className="generic-content-testimony">
        <div className="generic-content-header">
            <span className="generic-content-username">@{testimonyItem.username}</span>
            <span className="generic-content-time">{formatRelativeTime(testimonyItem.created_datetime)}</span>
        </div>
            {testimonyItem.content}
      </div>       
     </div>
  )
}

export default Testimony