"use client";

import { useState } from "react";

export function usePagination<T>(rows: T[], pageSize = 15) {
  const [requestedPage, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(requestedPage, pageCount);

  return {
    page,
    pageCount,
    total: rows.length,
    pageRows: rows.slice((page - 1) * pageSize, page * pageSize),
    setPage,
  };
}
