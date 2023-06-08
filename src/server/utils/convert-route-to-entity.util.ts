const mapping: Record<string, string> = {
  organizations: 'organization',
  reservations: 'reservation',
  restaurants: 'restaurant',
  'table-availabilities': 'table_availability',
  users: 'user',
  waiters: 'waiter',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
