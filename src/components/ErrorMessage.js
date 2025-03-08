const ErrorMessage = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className="w-full px-4 py-2 text-sm text-red-500 bg-red-100 border-l-4 border-red-500 rounded-lg">
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;
  