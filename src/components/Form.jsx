import React, { useState } from "react";
import RequiredLabel from "./common/RequiredLabel";
import { submitForm } from "./api/api";
import FileUploadSection from "./common/FileUploadSection";
import InputField from "./common/InputField";


const Form = () => {
  const [uploadSectionA, setUploadSectionA] = useState({ name: "", type: "", file: "" });
  const [uploadSectionB, setUploadSectionB] = useState({ name: "", type: "", file: "" });
  const [resMsg,setResMsg] = useState({type:"",message:""})

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    residentialAddress: { streetOne: "", streetTwo: "" },
    permanetAddress: { streetOne: "", streetTwo: "" },
    file: [{ ...uploadSectionA }, { ...uploadSectionB }],
  });

  const [sameAsRes, setSameAsRes] = useState(true);

  const handleAdressSelection = () => {
    setSameAsRes(!sameAsRes);
    setData({ ...data, permanetAddress: { ...data.residentialAddress } });
  };

  const handleFileSelection = (event, section) => {
    const uploadedFile = event.target.files[0];
    const fileExt = uploadedFile.type.split("/")[1];
    const allowedImageExt = ["jpg", "jpeg", "png"];
    const allowedDoc = "pdf";

    if (section === "sectionA") {
      if (allowedImageExt.includes(fileExt)) {
        setUploadSectionA({ ...uploadSectionA, file: uploadedFile, type: "image" });
      } else if (fileExt === allowedDoc) {
        setUploadSectionA({ ...uploadSectionA, file: uploadedFile, type: "pdf" });
      }
    } else if (section === "sectionB") {
      if (allowedImageExt.includes(fileExt)) {
        setUploadSectionB({ ...uploadSectionB, file: uploadedFile, type: "image" });
      } else if (fileExt === allowedDoc) {
        setUploadSectionB({ ...uploadSectionB, file: uploadedFile, type: "pdf" });
      }
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    submitForm(data)
      .then((response) => console.log(response))
      .catch(() => setResMsg({type:"error", msg:"an error occure while processeing your details, please try again"}));
  };

  return (
    <div>
    <div className="text-center text-black mb-10 font-extrabold text-3xl ">
    <h3> MERN STACK MACHINE TEST</h3>
    </div>
    <form className="space-y-6" onSubmit={handleFormSubmission}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          type="text"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          required
          placeholder="Enter your first name here..."
        />
        <InputField
          label="Last Name"
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          required
          placeholder="Enter your last name here..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="E-mail"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
          placeholder="ex: myname@example.com"
        />
        <InputField
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
          required
        />
        <p className="text-xs text-gray-500">(Min. age should be 18 Years)</p>
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700 mb-2">Residential Address</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Street 1"
            type="text"
            value={data.residentialAddress.streetOne}
            onChange={(e) => setData({ ...data, residentialAddress: { ...data.residentialAddress, streetOne: e.target.value } })}
            required
          />
          <InputField
            label="Street 2"
            type="text"
            value={data.residentialAddress.streetTwo}
            onChange={(e) => setData({ ...data, residentialAddress: { ...data.residentialAddress, streetTwo: e.target.value } })}
            required
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          onChange={handleAdressSelection}
        />
        <label className="ml-2 block text-sm font-medium text-gray-700">Same as Residential Address</label>
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700 mb-2">Permanent Address</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Street 1"
            type="text"
            value={data.permanetAddress.streetOne}
            onChange={(e) => setData({ ...data, permanetAddress: { ...data.permanetAddress, streetOne: e.target.value } })}
            required={sameAsRes}
            disabled={sameAsRes}
          />
          <InputField
            label="Street 2"
            type="text"
            value={data.permanetAddress.streetTwo}
            onChange={(e) => setData({ ...data, permanetAddress: { ...data.permanetAddress, streetTwo: e.target.value } })}
            required={sameAsRes}
            disabled={sameAsRes}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
        <div className="space-y-4">
          <FileUploadSection
            section="sectionA"
            uploadSection={uploadSectionA}
            setUploadSection={setUploadSectionA}
            handleFileSelection={handleFileSelection}
          />
          <FileUploadSection
            section="sectionB"
            uploadSection={uploadSectionB}
            setUploadSection={setUploadSectionB}
            handleFileSelection={handleFileSelection}
          />
        </div>
      </div>
      <div className="flex justify-center items-center text-md">
        <button type="submit" className="p-4 text-xl rounded-md hover:opacity-70 text-gray-100 bg-black">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default Form;
