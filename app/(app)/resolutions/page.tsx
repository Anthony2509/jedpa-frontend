import { RequirePermission } from "@/features/auth";
import { ResolutionsContainer } from "@/features/resolutions";

export default function ResolutionsPage() {
  return (
    <RequirePermission permission="resolutions">
      <ResolutionsContainer />
    </RequirePermission>
  );
}
