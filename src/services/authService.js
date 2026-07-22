import { API_BASE } from './api'

/**
 * Authenticate a user against the database with offline fallback support
 * @param {string} email
 * @param {string} password
 * @param {string} role  - 'user' | 'host' | 'admin'
 * @returns {Promise<{success: boolean, role: string, user: object}>}
 */
export async function login(email, password, role = 'user') {
  try {
    const url = `${API_BASE}/auth.php`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    })
    
    if (res.ok) {
      const json = await res.json()
      if (json.success !== false) {
        return json
      } else if (json.error) {
        throw new Error(json.error)
      }
    }
  } catch (err) {
    // If it's an explicit invalid credentials error from backend, rethrow it
    if (err.message && (err.message.includes('Invalid') || err.message.includes('required'))) {
      throw err
    }
    console.warn('Backend API connection failed, checking fallback credentials:', err)
  }

  // ── Fallback authentication if backend/WAMP API connection fails ──
  if (role === 'admin') {
    if (email === 'admin@oldsoul.in' && password === 'admin123') {
      return { success: true, role: 'admin', user: { id: 1, name: 'Super Admin', email: 'admin@oldsoul.in', role: 'admin' } }
    }
    throw new Error('Invalid admin credentials. Use admin@oldsoul.in / admin123')
  }

  if (role === 'host') {
    if (email === 'rajan.nair@gmail.com' && password === 'owner123') {
      return { success: true, role: 'host', user: { id: 1, name: 'Rajan Nair', email: 'rajan.nair@gmail.com', status: 'active', verified: true } }
    }
    throw new Error('Invalid host credentials. Use rajan.nair@gmail.com / owner123')
  }

  // Default User / Customer
  if (email === 'ananya.roy@gmail.com' && password === 'user123') {
    return { success: true, role: 'user', user: { id: 1, name: 'Ananya Roy', email: 'ananya.roy@gmail.com', status: 'active' } }
  }

  throw new Error('Invalid email or password')
}
