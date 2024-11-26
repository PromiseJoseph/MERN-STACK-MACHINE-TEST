import React from "react";

const RequiredLabel =( props) =>{
    return(
    <label className="block text-sm font-medium text-gray-700">
    {props.label}
    <span className="text-red-500">*</span>
  </label>
    )
}

export default RequiredLabel