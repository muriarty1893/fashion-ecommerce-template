import {
  ProductGrid,
  ProductGridWrapper,
  ShopFilterAndSort,
  ShowingPagination,
} from "../components";

import { useState } from "react";

const ShopPageContent = ({ category, page} : { category: string; page: number; }) => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [filters, setFilters] = useState<ShopFilters>({
    minPrice: "",
    maxPrice: "",
    color: "",
    size: "",
    availability: "",
  });
  const [ currentPage, setCurrentPage ] = useState(page);
  
  

  return (
    <>
      <ShopFilterAndSort
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        filters={filters}
        setFilters={setFilters}
      />
      <ProductGridWrapper sortCriteria={sortCriteria} filters={filters} category={category} page={currentPage} >
        <ProductGrid />
      </ProductGridWrapper>
      <ShowingPagination page={currentPage} category={category} setCurrentPage={setCurrentPage} />
    </>
  );
};
export default ShopPageContent;
