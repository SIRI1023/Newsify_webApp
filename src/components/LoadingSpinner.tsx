export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
    </div>
  );
}