import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ImageConfig } from './ImageConfig'
import Box from '@mui/material/Box'

import uploadImg from '../../assets/images/cloud-upload-regular-240.png'
import '../../assets/css/drop-file-input.css'

const DropFileInput = (props) => {
  const wrapperRef = useRef(null)

  const [fileList, setFileList] = useState([])

  const onDragEnter = () => wrapperRef.current.classList.add('dragover')

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

  const onDrop = () => wrapperRef.current.classList.remove('dragover')

  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const updatedList = [...fileList, newFile]
      setFileList(updatedList)
      props.onFileChange(updatedList)
    }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
    props.onFileChange(updatedList)
  }

  return (
    <>
      <Box
        ref={wrapperRef}
        className='drop-file-input'
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Box className='drop-file-input__label'>
          <img src={uploadImg} alt='' />
          <p>Drag & Drop your files here</p>
        </Box>
        <input type='file' value='' onChange={onFileDrop} />
      </Box>
      {fileList.length > 0 ? (
        <Box className='drop-file-preview'>
          <p className='drop-file-preview__title'>Ready to upload</p>
          {fileList.map((item, index) => (
            <Box key={index} className='drop-file-preview__item'>
              <img
                src={
                  ImageConfig[item.type.split('/')[1]] || ImageConfig['default']
                }
                alt=''
              />
              <Box className='drop-file-preview__item__info'>
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </Box>
              <span
                className='drop-file-preview__item__del'
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </Box>
          ))}
        </Box>
      ) : null}
    </>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
}

export default DropFileInput
