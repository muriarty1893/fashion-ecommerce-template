"use client";

import { Suspense } from "react";
import StoreLayout from "../../../components/StoreLayout";
import Shop from "../../../views/Shop";

const CategoryShopPage = () => (
  <StoreLayout>
    <Suspense fallback={null}>
      <Shop />
    </Suspense>
  </StoreLayout>
);

export default CategoryShopPage;
