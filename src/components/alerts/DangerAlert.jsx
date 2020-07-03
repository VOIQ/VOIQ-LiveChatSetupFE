import React from 'react'

const DangerAlert = (props) => {
  const [visibility, setVisibility] = React.useState(true);

  return (
    visibility && (
      <div className="alert alert-danger alert-dismissible">
        <button
          type="button"
          className="close"
          aria-label={props.aria}
          onClick={() => setVisibility(false)}
        >
          <span aria-hidden="true">{props.closeIcon}</span>
        </button>
        {props.children}
      </div>
    )
  )
}

export default DangerAlert
