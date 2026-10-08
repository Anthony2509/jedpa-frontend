"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MACROS, useParticipants } from "@/features/participants";
import { FilterBar } from "@/shared/ui/FilterBar";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Select } from "@/shared/ui/Select";
import { DelegationsTable } from "../components/DelegationsTable";
import { buildDelegations, filterDelegations } from "../domain/buildDelegations";

const MACRO_OPTIONS = MACROS.map((macro) => ({ value: macro, label: `Macro ${macro.slice(1)}` }));

export function DelegationsListContainer() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [macro, setMacro] = useState("");
  const delegations = buildDelegations(useParticipants());
  const filtered = filterDelegations(delegations, search, macro);

  return (
    <>
      <PageHeader
        title="Delegaciones"
        description="Cada delegación representa a una macrorregión en una disciplina, categoría y género. Desde aquí se imprime y entrega por grupo."
      />
      <FilterBar>
        <SearchInput value={search} placeholder="Buscar por código, región o disciplina" onChange={setSearch} />
        <Select value={macro} placeholder="Todas las macros" options={MACRO_OPTIONS} onChange={setMacro} />
      </FilterBar>
      <DelegationsTable delegations={filtered} onOpen={(d) => router.push(`/delegations/${d.code}`)} />
    </>
  );
}
