import { apiFetch } from './api'

/** Get dashboard stats (KPIs + recent activities) */
export async function getAdminStats() {
  return apiFetch('/stats.php')
}

/** Get monthly revenue chart data */
export async function getRevenueData(year = new Date().getFullYear()) {
  return apiFetch(`/revenue.php?year=${year}`)
}

/** Get all hosts/owners */
export async function getHosts() {
  return apiFetch('/hosts.php')
}

/** Get single host by ID */
export async function getHost(id) {
  return apiFetch(`/hosts.php?id=${id}`)
}

/** Get all users/customers */
export async function getUsers() {
  return apiFetch('/users.php')
}

/** Get single user by ID */
export async function getUser(id) {
  return apiFetch(`/users.php?id=${id}`)
}
