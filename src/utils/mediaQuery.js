import { useMediaQuery } from 'react-responsive'
 
const useMedia = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  const isTablet = useMediaQuery({ minWidth: 501, maxWidth: 991 })
  const isMobile = useMediaQuery({ maxWidth: 500 })
 
  return ({
    isDesktop,
    isTablet,
    isMobile
  })
}

export default useMedia;