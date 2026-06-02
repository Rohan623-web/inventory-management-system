import { FiPackage } from "react-icons/fi";

function EmptyState({
  title,
  message,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FiPackage size={70} />
      </div>

      <h3 className="empty-title">
        {title}
      </h3>

      <p className="empty-message">
        {message}
      </p>

      {buttonText && (
        <button
          className="empty-action-btn"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;