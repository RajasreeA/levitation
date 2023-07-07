import React, { useState } from "react";
import { countryCodes } from "../assets/Data";

type Field = {
  label: string; // Label of the field
  type: string; // Type of the input field
  value: string; // Value of the input field
};

type Props = {
  fields: Field[]; // Array of field objects
};

const Details: React.FC<Props> = ({ fields }) => {
  // State for the fields
  const [Fields, setFields] = useState<Field[]>(fields);
  // State for the selected country code
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].value);

  // Handler for field value change
  const handleFieldChange = (index: number, value: string) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = value;
      return updatedFields;
    });
  };

  // Handler for country code change
  const handleCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Basic Details</h2>
      {Fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}: {/* Label of the field */}
          </label>
          {field.label === "Phone" ? (
            <div className="flex">
              <select
                value={selectedCode}
                onChange={handleCodeChange}
                className="border border-gray-300 py-2 px-4 rounded-md w-1/4 mr-2"
              >
                {countryCodes.map((code) => (
                  <option key={code.value} value={code.value}>
                    {code.label} {/* Country code label */}
                  </option>
                ))}
              </select>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                className="border border-gray-300 py-2 px-4 rounded-md w-3/4"
              />
            </div>
          ) : (
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              className="border border-gray-300 py-2 px-4 rounded-md"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Details;
