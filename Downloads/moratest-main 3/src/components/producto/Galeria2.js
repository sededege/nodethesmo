/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import ImageGallery from 'react-image-gallery'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'
import { motion } from 'framer-motion'

const Galeria = (a) => {
  const [images2, setImages2] = React.useState([])
  React.useEffect(() => {
    if (a.images && a.filtrocolor) {
      const colorgaleria = a.images.filter(d => d.name === a.filtrocolor)
      if (colorgaleria[0].images) {
        setImages2('')
        colorgaleria[0].images.forEach((el, index) => {
          el != null && (setImages2(prevState => [...prevState, { original: el, thumbnail: el }]))
        })
      } if (colorgaleria[0].video != '') {
        colorgaleria[0].video.forEach((la, index) => {
          setImages2(prevState => [...prevState, { thumbnail: colorgaleria[0].miniaturavideo, renderItem: () => renderVideo(colorgaleria[0].video) }])
        })
      }
    }
  }, [a])

  const LeftNav = React.memo(({
    disabled,
    onClick
  }) => {
    return (
            <button
                type="button"
                className="image-gallery-icon image-gallery-left-nav   hover:text-booty  text-white drop-shadow-2lg "
                disabled={disabled}
                onClick={onClick}
                aria-label="Previous Slide"
            >
                <MdOutlineArrowLeft className='text-[3rem]    ' />
            </button>
    )
  })
  const RightNav = React.memo(({
    disabled,
    onClick
  }) => {
    return (
            <button
                type="button"
                className="image-gallery-icon image-gallery-right-nav hover:text-booty  text-white drop-shadow-2lg "
                disabled={disabled}
                onClick={onClick}
                aria-label="Next Slide"
            >
                <MdOutlineArrowRight className='text-[3rem]    ' />
            </button>
    )
  })

  const renderVideo = (item) => {
    return (
            <div className='image-gallery-image video'>
                <video controls width="100%" height='100%'>
                    {
                        a.images[0].video !== '' &&
                        <source className='video' src={a.images[0].video} type="video/mp4" />

                    }
                </video>
            </div>
    )
  }

  return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='md:w-[40vw] w-[100vw] md:items-center flex flex-col justify-center'>
            <ImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                showIndex={false}
                thumbnailPosition='bottom'
                stopPropagation={true}
                lazyLoad={true}
                disableThumbnailScroll={true}
                renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                items={images2}

/*                 renderItem={renderVideo}
 */ />

            {/*  <video controls width="100%">
                <source src={src} type="video/mp4" />
            </video>  */}
        </motion.div>
  )
}

export default Galeria
