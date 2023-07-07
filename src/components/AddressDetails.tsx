import { useState } from "react";

type Field = {
  label: string; // Label for the input field
  type: string; // Type of the input field
  value: string; // Current value of the input field
};

type Props = {
  fields: Field[]; // Array of field objects for rendering the form
};

function AddressDetails({ fields }: Props) {
  const handleFieldChange = (index: number, value: string) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields]; // Create a copy of the fields array
      updatedFields[index].value = value; // Update the value of the field at the given index
      return updatedFields; // Return the updated fields array
    });
  };

  const [Fields, setFields] = useState(fields); // State variable to store the fields array

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Address</h2>

      {Fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}:
          </label>
          <input
            type={field.type} // Set the type of the input field
            value={field.value} // Set the current value of the input field
            onChange={(e) => handleFieldChange(index, e.target.value)} // Call handleFieldChange function on input change
            className="border border-gray-300 py-2 px-4 rounded-md"
          />
        </div>
      ))}
    </div>
  );
}

export default AddressDetails;