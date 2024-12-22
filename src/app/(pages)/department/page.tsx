"use client";

import { TabCategoryList } from "@/app/_shared/content/category-list";
import useCategoryQuery from "@/app/_shared/content/product/hooks/useCategoryQuery";
import useSearchProductQuery from "@/app/_shared/content/product/hooks/useSearchProductQuery";
import ProductList from "@/app/_shared/content/product/product-list";
import {
  TArea_CATEGORY_TAB,
  TDisplayCategory,
} from "@/app/_shared/content/product/types";
import { For, Tabs } from "@chakra-ui/react";

export default function DepartmentPage() {
  const {
    categoryInfo,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useCategoryQuery("department");
  const { imgItemInfo, isLoading, isError } =
    useSearchProductQuery("department");

  if (categoryIsLoading || isLoading) return <div>Loading...</div>;
  if (categoryIsError || isError)
    return <div>There is an error, try again</div>;

  const displayCategories = (categoryInfo as TArea_CATEGORY_TAB).dispCtgList;
  const defaultCategory = displayCategories?.find(
    (category: TDisplayCategory) => {
      return category.isActivated;
    }
  )?.dispCtgNm;
  return (
    <div>
      <Tabs.Root defaultValue={defaultCategory} variant="enclosed">
        <TabCategoryList categories={displayCategories} />
        <br />
        <For each={displayCategories}>
          {(category: TDisplayCategory) => {
            const { dispCtgId, dispCtgNm } = category;
            return (
              <Tabs.Content key={dispCtgId} value={dispCtgNm}>
                <ProductList dispCtgId={dispCtgId} data={imgItemInfo} />
              </Tabs.Content>
            );
          }}
        </For>
      </Tabs.Root>
    </div>
  );
}
