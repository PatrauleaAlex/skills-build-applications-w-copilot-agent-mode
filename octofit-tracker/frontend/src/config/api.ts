const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

const getFallbackApiOrigin = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return 'http://localhost:8000'
}

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : `${getFallbackApiOrigin()}/api`

export const getCollectionApiUrl = (collection) => `${API_BASE_URL}/${collection}/`

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export const getErrorMessage = (error, fallbackMessage) =>
  error instanceof Error ? error.message : fallbackMessage
