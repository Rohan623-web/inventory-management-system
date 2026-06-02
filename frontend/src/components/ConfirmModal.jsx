function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
  className="delete-btn"
  onClick={onConfirm}
>
  {confirmText}
</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;