import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Details from "../components/Details";
import FileUpload from "../components/FileUpload";
import MultiFileUpload from "../components/MultiFileUpload";
import AddressDetails from "../components/AddressDetails";
import { Basic, addressDetails } from "../common/Data";


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [geolocationCaptureStatus, setGeolocationCaptureStatus] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [submitStatus, setSubmitStatus] = useState("");
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [fileCount, setFileCount] = useState(0);
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const errors: string[] = [];

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
    setSubmitStatus("");
    setFieldErrors([]);
  };

  const handleMultiFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray: File[] = Array.from(selectedFiles);
      const validFiles = fileArray.filter(
        (file) => file.type === "image/png" || file.type === "application/pdf"
      );
      const remainingUploads = 5 - fileCount;
      const allowedFiles = validFiles.slice(0, remainingUploads);

      setMultiFiles((prevFiles) => [...prevFiles, ...allowedFiles]);
      setFieldErrors([]);
      setFileCount((prevCount) => prevCount + allowedFiles.length);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray: File[] = Array.from(selectedFiles);
      setFiles(fileArray);
    }
    setFieldErrors([]);
  };

  const handleGoBack = () => {
    navigate("/"); // Go back to the previous page
  };

  const handleSubmit = async () => {
    // Add API integration logic here to submit the form data
    // You can send the form data to the server using fetch or Axios

    // For demonstration purposes, let's assume the API response returns a boolean value indicating the form submission success
    const submissionSuccess = true;

    if (submissionSuccess) {
      setSubmitStatus("Form submitted successfully");
    } else {
      setSubmitStatus("Form submission failed");
    }
  };

  const captureGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          setGeolocationCaptureStatus("Geolocation captured");
        },
        (error) => {
          setGeolocationCaptureStatus(
            `Geolocation capture failed: ${error.message}`
          );
          setCoordinates({ latitude: 0, longitude: 0 });
        }
      );
    } else {
      setGeolocationCaptureStatus("Geolocation is not supported");
    }
  };

  const handleFileDelete = (file: File) => {
    setMultiFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const validateFields = () => {
    switch (step) {
      case 1:
        if (Basic[0].value.trim() === "") {
          errors.push("Name is required.");
        }
        if (Basic[1].value.trim() === "") {
          errors.push("Email is required.");
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            Basic[1].value.trim()
          )
        ) {
          errors.push("Invalid email format.");
        }
        if (Basic[2].value.trim() === "") {
          errors.push("Phone is required.");
        } else if (!/^\d{10}$/.test(Basic[2].value.trim())) {
          errors.push(
            "Invalid phone number format. Please enter a 10-digit number."
          );
        }
        break;
      case 2:
        if (addressDetails[0].value.trim() === "") {
          errors.push("Address Line 1 is required.");
        }
        if (addressDetails[1].value.trim() === "") {
          errors.push("Address Line 2 is required.");
        }
        if (addressDetails[2].value.trim() === "") {
          errors.push("City is required.");
        }
        if (addressDetails[3].value.trim() === "") {
          errors.push("State is required.");
        }
        if (addressDetails[4].value.trim() === "") {
          errors.push("Pincode is required.");
        } else if (!/^\d{6}$/.test(addressDetails[4].value.trim())) {
          errors.push("Invalid pincode format. Please enter a 6-digit number.");
        }
        if (addressDetails[5].value.trim() === "") {
          errors.push("Country is required.");
        }
        break;
      case 3:
        // Validation rules for Step 3
        if (files.length === 0) {
          errors.push("Please upload a file.");
        }
        break;
      case 4:
        // Validation rules for Step 4
        if (multiFiles.length === 0) {
          errors.push("Please upload a file.");
        }
        break;
      default:
        break;
    }

    setFieldErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Details fields={Basic} />;

      case 2:
        return <AddressDetails fields={addressDetails} />;

      case 3:
        return <FileUpload files={files} handleFileUpload={handleFileUpload} />;

      case 4:
        return (
          <MultiFileUpload
            handleMultipleUpload={handleMultiFileUpload}
            multiFiles={multiFiles}
            captureGeolocation={captureGeolocation}
            geolocationCaptureStatus={geolocationCaptureStatus}
            coordinates={coordinates}
            handleFileDelete={handleFileDelete}
          />
        );

      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <p className="text-green-500">{submitStatus}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progressWidth = `${((step - 1) / 4) * 100}%`;

    return (
      <div className="mb-4">
        <div className="relative h-4 rounded-full bg-gray-200">
          <div
            className="absolute top-0 h-4 bg-blue-500 rounded-full"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md bg-white shadow-md p-8 rounded-md">
        <button onClick={handleGoBack} className="mr-2 text-blue-500">
          &lt; Back
        </button>
        <div className="mb-4">
          {renderProgressBar()}
          {renderStepContent()}
          {fieldErrors.length > 0 && (
            <div className="text-red-500">
              {fieldErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
        {step > 1 && (
          <button
            onClick={handlePrevious}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mr-2"
          >
            Previous
          </button>
        )}
        {step < 5 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
