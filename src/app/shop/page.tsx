"use client";

import { Suspense } from "react";
import StoreLayout from "../../components/StoreLayout";
import Shop from "../../views/Shop";

const ShopPage = () => (
  <StoreLayout>
    <Suspense fallback={null}>
      <Shop />
    </Suspense>
  </StoreLayout>
);

export default ShopPage;
