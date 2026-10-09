import type { SpecialDraft } from "@/features/participants";

export const EMPTY_SPECIAL_DRAFT: SpecialDraft = {
  idType: "dni",
  idNumber: "",
  firstName: "",
  paternalLastName: "",
  maternalLastName: "",
  type: "guest",
  institution: "",
};
