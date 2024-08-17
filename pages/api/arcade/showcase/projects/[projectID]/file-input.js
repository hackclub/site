import { useState } from "react"

async function fileToLink(file) {
  const fileHost = '/api/bucky/'
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(fileHost, {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

const FileInput = ({
  onUpload = () => {},
}) => {
  const [ status, setStatus ] = useState('')

  return (
    <>
      <input
        type="file"
        onChange={async event => {
          event.preventDefault()
 
          const formData = new FormData()

          if (event.target.files.length === 0) {
            setStatus('No file selected')
            return
          }
          setStatus('Uploading...')
          formData.append('file', event.target.files[0])
          const response = await fetch('/api/bucky/', {
            method: 'POST',
            body: formData,
          })
  
          // Handle response if necessary
          const data = await response.json()
          console.log({data})
          if (data.result) {
            setStatus('Uploaded!')
            onUpload(data.result)
          }
        }}
      />
      <p>{status}</p>
    </>
  )
}

export default FileInput