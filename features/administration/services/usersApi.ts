import { createStore } from "@/shared/lib/createStore";
import type { User } from "@/features/auth";
import { MOCK_USERS } from "../mocks/users";
import type { UserDraft } from "../types";

export const usersStore = createStore<User[]>(MOCK_USERS);

export function saveUser(draft: UserDraft, id?: string): void {
  usersStore.update((users) =>
    id
      ? users.map((user) => (user.id === id ? { ...draft, id } : user))
      : [...users, { ...draft, id: `u-${Date.now()}` }],
  );
}

export function toggleUserActive(id: string): void {
  usersStore.update((users) => users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
}
