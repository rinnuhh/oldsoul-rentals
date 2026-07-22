import { apiFetch } from './api'

/** Fetch all bookings (admin) */
export async function getAllBookings(status = null) {
  const query = status ? `?status=${status}` : ''
  return apiFetch(`/bookings.php${query}`)
}

/** Fetch a single booking by code */
export async function getBooking(code) {
  return apiFetch(`/bookings.php?id=${code}`)
}

/**
 * Create a new booking
 * @param {object} data - booking data
 */
export async function createBooking(data) {
  return apiFetch('/bookings.php', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
