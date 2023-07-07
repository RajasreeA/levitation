import React, { useState } from "react";

type Props = {
  files: File[]; // Array of selected files
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for file upload
};

export default function FileUpload({ files, handleFileUpload }: Props) {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload File (PNG or PDF): {/* Label for file upload */}
        </label>
        <input
          type="file"
          accept=".png,.pdf"
          onChange={handleFileUpload}
          className="border border-gray-300 py-2 px-4 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Selected Files: {/* Label for selected files */}
        </label>
        <ul className="list-disc list-inside">
          {files.map((file, index) => (
            <li key={index} className="text-gray-700">
              {file.name} {/* Display the name of the selected file */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
