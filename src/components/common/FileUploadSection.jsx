import React from "react";
import RequiredLabel from "./RequiredLabel";
import InputField from "./InputField";

const FileUploadSection = ({ section, uploadSection, setUploadSection, handleFileSelection }) => {
    return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
      <InputField
        label="File Name"
        type="text"
        value={uploadSection.name}
        onChange={(e) => setUploadSection({ ...uploadSection, name: e.target.value })}
        required
      />
      <div>
        <RequiredLabel label="Type of File" />
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={uploadSection.type}
          onChange={(e) => setUploadSection({ ...uploadSection, type: e.target.value })}
        >
          <option value="" disabled></option>
          <option value="image">image</option>
          <option value="pdf">pdf</option>
        </select>
      </div>
      <div className="flex items-center">
        <div className="flex-grow">
          <RequiredLabel label="Upload Document" />
          <input
            required
            type="file"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={(e) => handleFileSelection(e, section)}
          />
        </div>
      </div>
    </div>
    )
};
export default FileUploadSection