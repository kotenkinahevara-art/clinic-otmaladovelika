import { navLinks as fallbackNavLinks } from '../data/navLinks.js'
import useRemoteJson from './useRemoteJson'

function useNavLinks() {
  const { data, isLoading, isError, reload } = useRemoteJson('/data/nav-links.json', fallbackNavLinks)

  return {
    navLinks: Array.isArray(data) ? data : fallbackNavLinks,
    isLoading,
    isError,
    reload,
  }
}

export default useNavLinks
