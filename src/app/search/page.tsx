"use client";

import { Suspense } from "react";
import StoreLayout from "../../components/StoreLayout";
import Search from "../../views/Search";

const SearchPage = () => (
  <StoreLayout>
    <Suspense fallback={null}>
      <Search />
    </Suspense>
  </StoreLayout>
);

export default SearchPage;
