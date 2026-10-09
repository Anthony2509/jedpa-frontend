/**
 * TEMP(backend): during the transition the mock participants (ids "p-1", "p-2"…) still feed the
 * screens that are not connected yet (dashboard, delegations, reports). Real participants have UUIDs.
 * Remove together with the mocks.
 */
export function isMockParticipantId(id: string): boolean {
  return /^p-\d+$/.test(id);
}
