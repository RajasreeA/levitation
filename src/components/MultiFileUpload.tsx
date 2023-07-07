import React from "react";

type FileProps = {
  multiFiles: File[]; // Array of selected files
  handleMultipleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for multiple file upload
  geolocationCaptureStatus: string; // Geolocation capture status
  coordinates: { latitude: number; longitude: number }; // Coordinates object containing latitude and longitude
  captureGeolocation: () => void; // Function to capture geolocation
  handleFileDelete: (file: File) => void; // Event handler for file deletion
};

function MultiFileUpload({
  handleMultipleUpload,
  geolocationCaptureStatus,
  coordinates,
  captureGeolocation,
  handleFileDelete,
  multiFiles,
}: FileProps) {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Multi File Upload</h2>
      <div className="mb-4">
        <label className="block">Upload Multiple Files (PNG or PDF):</label>
        <input
          type="file"
          multiple
          accept=".png,.pdf"
          onChange={handleMultipleUpload}
          className="border border-gray-300 py-2 px-4 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block">Selected Files:</label>
        {multiFiles.map((file, index) => (
          <div key={index} className="mb-2">
            <span>{file.name}</span>
            <button
              onClick={() => handleFileDelete(file)}
              className="ml-2 px-2 py-1 text-white bg-red-500 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Geolocation Status:</h2>
        <div className="mb-4">
          <div
            onClick={captureGeolocation}
            className="bg-blue-500 hover:bg-black-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Capture Geolocation
          </div>
          {geolocationCaptureStatus && (
            <p className="text-blue-500 mt-2">{geolocationCaptureStatus}</p>
          )}
          <p className="mt-2">Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      </div>
    </div>
  );
}

export default MultiFileUpload;
