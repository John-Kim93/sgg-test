"use client";

import useSearchProductQuery from "@/app/_shared/content/product/hooks/useSearchProductQuery";
import ProductList from "@/app/_shared/content/product/product-list";

export default function RealTimePage() {
  const { imgItemInfo, isLoading, isError } = useSearchProductQuery("realTime");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There is an error, try again</div>;

  return (
    <div>
      <ProductList data={imgItemInfo} />
    </div>
  );
}
