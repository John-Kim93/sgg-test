"use client";

import { isNullish } from "@/utils/type";
import { For, Tabs } from "@chakra-ui/react";
import newStyled from "@emotion/styled";
import { TDisplayCategory } from "./product/types";

const TabTrigger = newStyled(Tabs.Trigger)`
  margin: 0 6px;
  border: 2px solid #f6f6f6;
  padding: 8px;
  box-shadow: none;
`;

export const TabCategoryList = ({
  categories,
}: {
  categories: TDisplayCategory[] | undefined;
}) => {
  if (isNullish(categories)) return <>선택 가능한 카테고리가 없습니다.</>;

  return (
    <Tabs.List display={"flex"} flexWrap="wrap" backgroundColor={"#fff"}>
      <For each={categories}>
        {(category: TDisplayCategory) => {
          const { dispCtgId, dispCtgNm } = category;
          return (
            <TabTrigger key={dispCtgId} value={dispCtgNm}>
              {dispCtgNm}
            </TabTrigger>
          );
        }}
      </For>
    </Tabs.List>
  );
};
