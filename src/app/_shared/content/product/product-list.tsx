"use client";

import { For, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./product-card";
import { InfiniteData } from "@tanstack/react-query";
import { TArea_IMG_ITEM, TProduct } from "./types";

export default function ProductList({
  dispCtgId,
  data,
}: {
  dispCtgId?: number;
  data: InfiniteData<TArea_IMG_ITEM | null> | undefined;
}) {
  // 조건부 렌더링
  const products: TProduct[] | undefined = data?.pages
    .filter((imgItemInfo: TArea_IMG_ITEM | null) => {
      // CASE : 카테고리 ID가 없으면 필터x, 전체 데이터 반환
      if (!dispCtgId) {
        return true;
      }
      return imgItemInfo !== null && imgItemInfo.dispCtgId === dispCtgId;
    })
    .map((imgItemInfo) => (imgItemInfo as TArea_IMG_ITEM).itemList)
    .flat(1);
  if (!products || products.length === 0) return <>상품 정보가 없습니다.</>;

  // 정상 렌더링
  return (
    <SimpleGrid columns={[1, 2]} gap={4} p={4}>
      <For each={products}>
        {(product: TProduct, index: number) => {
          return (
            <ProductCard
              key={product.itemId + Math.random()} // 동일 상품이 포함되어 있어 임시 처리
              product={product}
              index={index}
            />
          );
        }}
      </For>
    </SimpleGrid>
  );
}
