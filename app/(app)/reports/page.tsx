import { RequirePermission } from "@/features/auth";
import { ReportsContainer } from "@/features/reports";

export default function ReportsPage() {
  return (
    <RequirePermission permission="reports_basic">
      <ReportsContainer />
    </RequirePermission>
  );
}
