import { RequirePermission } from "@/features/auth";
import { SpecialCredentialsContainer } from "@/features/special-credentials";

export default function SpecialCredentialsPage() {
  return (
    <RequirePermission permission="special_credentials">
      <SpecialCredentialsContainer />
    </RequirePermission>
  );
}
