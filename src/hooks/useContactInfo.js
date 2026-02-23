import { contactInfo as fallbackContactInfo } from '../data/contactInfo.js'
import useRemoteJson from './useRemoteJson'

function useContactInfo() {
  const { data, isLoading, isError, reload } = useRemoteJson('/data/contact-info.json', fallbackContactInfo)

  return {
    contactInfo: data ?? fallbackContactInfo,
    isLoading,
    isError,
    reload,
  }
}

export default useContactInfo
