function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="hero-header">
      <div>
        <div className="hero-badge">
          Inventory Management
        </div>

        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>

      {buttonText && (
        <button
          className="hero-button"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default PageHeader;