import { DEFAULT_ACCESS, type SpecialDraft } from "@/features/participants";

export const EMPTY_SPECIAL_DRAFT: SpecialDraft = {
  idType: "dni",
  idNumber: "",
  firstName: "",
  lastName: "",
  type: "guest",
  institution: "",
  access: DEFAULT_ACCESS.guest,
};
