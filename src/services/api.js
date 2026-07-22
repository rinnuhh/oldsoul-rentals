// ── API Base Configuration ────────────────────────────────────
// All API calls go to the WAMP PHP server on port 80
export const API_BASE = 'http://localhost/oldsoul/api'

/**
 * Generic fetch wrapper with JSON response handling and error reporting.
 * @param {string} endpoint  - e.g. '/vehicles.php?type=show'
 * @param {object} options   - fetch options (method, body, etc.)
 * @returns {Promise<any>}   - Parsed JSON response data
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const defaults = {
    headers: { 'Content-Type': 'application/json' },
  }
  const res = await fetch(url, { ...defaults, ...options })
  const json = await res.json()

  if (!res.ok || json.success === false) {
    throw new Error(json.error || `API error ${res.status}`)
  }
  return json.data ?? json
}
