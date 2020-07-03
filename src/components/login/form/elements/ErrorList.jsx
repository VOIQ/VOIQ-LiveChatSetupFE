import React from 'react';

const ErrorList = ({ errors }) => {
  if (typeof errors === 'string') {
    return (
      <ul>
        <li>{errors}</li>
      </ul>
    )
  }

  console.log(errors);
  return (
    <ul>
      { errors.map( (error, index) => <li key={index}>{error}</li>) }
    </ul>
  )
}

export default ErrorList;
