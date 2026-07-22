import { apiFetch } from './api'

/** Fetch all show (vintage/modern/modified) vehicles from DB */
export async function getShowVehicles() {
  return apiFetch('/vehicles.php?type=show')
}

/** Fetch a single show vehicle by ID */
export async function getShowVehicle(id) {
  return apiFetch(`/vehicles.php?type=show&id=${id}`)
}

/** Fetch all normal (everyday) vehicles from DB */
export async function getNormalVehicles() {
  return apiFetch('/vehicles.php?type=normal')
}

/** Fetch a single normal vehicle by ID */
export async function getNormalVehicle(id) {
  return apiFetch(`/vehicles.php?type=normal&id=${id}`)
}
