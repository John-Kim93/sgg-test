"use client";

import { TabCategoryList } from "@/app/_shared/content/category-list";
import useCategoryQuery from "@/app/_shared/content/product/hooks/useCategoryQuery";
import useSearchProductQuery from "@/app/_shared/content/product/hooks/useSearchProductQuery";
import ProductList from "@/app/_shared/content/product/product-list";
import {
  TArea_CATEGORY_TAB,
  TDisplayCategory,
} from "@/app/_shared/content/product/types";
import { Box, For, Tabs } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function AllBestPage() {
  const {
    categoryInfo,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useCategoryQuery("allBest");
  const { imgItemInfo, isLoading, isError, fetchNextPage, hasNextPage } =
    useSearchProductQuery("allBest");

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) observer.observe(currentObserver);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [fetchNextPage, hasNextPage]);

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
        {/* 하단 20%에 스크롤 도착 시 fetchNextPage하기 위한 가상 요소 */}
        <Box
          ref={observerRef}
          position={"absolute"}
          minHeight={"20%"}
          width={"100%"}
          bottom={0}
        ></Box>
      </Tabs.Root>
    </div>
  );
}
