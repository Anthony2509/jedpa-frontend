import { RequirePermission } from "@/features/auth";
import { UsersContainer } from "@/features/administration";

export default function UsersPage() {
  return (
    <RequirePermission permission="administration">
      <UsersContainer />
    </RequirePermission>
  );
}
