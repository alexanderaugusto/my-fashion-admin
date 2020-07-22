import React, { useState, useEffect } from 'react'
import {
  Grid,
  IconButton,
  Badge
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import api from '../../services/api'

const styles = {
  grid_container: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 25,
    paddingBottom: 50
  },
  inputFile: {
    display: 'none'
  },
  labelFile: {
    backgroundColor: 'rgba(128,128,128, 0.5)',
    width: 76,
    height: 76,
    color: 'white',
    borderRadius: 0
  },
  badgeIcon: {
    color: 'white',
    cursor: 'pointer'
  },
  productImage: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey"
  }
}

export default function ImageUpload({ images, onChange, initialImages, onDeleteInitial }) {
  const [imagesToRender, setImagesToRender] = useState([])

  useEffect(() => initialImages && setImagesToRender(initialImages), [initialImages])

  function onDeleteImage(image, index) {
    let newImagesToRender = imagesToRender
    newImagesToRender.splice(index, 1)
    setImagesToRender(newImagesToRender)

    if (image.id) {
      onDeleteInitial(image)
    } else {
      let newImages = images
      newImages.splice(index, 1)
      onChange(newImages)
    }
  }

  return (
    <Grid container spacing={1} style={styles.grid_container}>
      {imagesToRender.map((image, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Badge badgeContent={<i className="fas fa-times" style={styles.badgeIcon}
              onClick={() => onDeleteImage(image, index)} />} color="secondary">
              <img src={image.id ? api.routes.IMAGE_PATH_PRODUCT + image.name : image} alt="..." width={100} height={100} style={styles.productImage} />
            </Badge>
          </Grid>
        )
      })}
      <Grid item xs={3}>
        <input accept="image/*" style={styles.inputFile} id="icon-button-file" type="file" multiple
          onChange={(e) => {
            const selectedImages = Object.values(e.target.files)
            onChange(images.concat(selectedImages))

            let imagesToSet = imagesToRender
            selectedImages.forEach(file => {
              let reader = new FileReader()
              reader.onloadend = () => {
                imagesToSet = imagesToSet.concat([reader.result])
                setImagesToRender(imagesToSet)
              }
              reader.readAsDataURL(file)
            })
          }} />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span" style={styles.labelFile}>
            <PhotoCamera />
          </IconButton>
        </label>
      </Grid>
    </Grid>
  )
}