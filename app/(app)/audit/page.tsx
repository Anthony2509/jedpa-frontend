import { RequirePermission } from "@/features/auth";
import { AuditContainer } from "@/features/audit";

export default function AuditPage() {
  return (
    <RequirePermission permission="audit">
      <AuditContainer />
    </RequirePermission>
  );
}
