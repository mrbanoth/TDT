
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
