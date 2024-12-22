"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import newStyled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";

const TabBox = newStyled(Box)<{ isSelected: boolean }>`
    margin: 0 6px;
    width: 120px;
    height: 60px;
    background-color: ${(props) => (props.isSelected ? "#fff" : "#f6f6f6")};
    color: #000;
    border: 3px solid ${(props) => (props.isSelected ? "#000" : "transparent")};
    box-shadow: none;
    cursor: pointer;
  `;

export const Nav = () => {
  const pathname = usePathname().substring(1);
  const router = useRouter();

  return (
    <Flex justify={"space-between"}>
      <TabBox
        isSelected={pathname === "allBest"}
        onClick={() => router.push("/allBest")}
      >
        <Flex
          flexDirection={"column"}
          justify={"center"}
          align={"center"}
          h={"100%"}
        >
          <Text>전체</Text>
          <Text>베스트</Text>
        </Flex>
      </TabBox>
      <TabBox
        isSelected={pathname === "realTime"}
        onClick={() => router.push("/realTime")}
      >
        <Flex
          flexDirection={"column"}
          justify={"center"}
          align={"center"}
          h={"100%"}
        >
          <Text>실시간</Text>
          <Text>베스트</Text>
        </Flex>
      </TabBox>
      <TabBox
        isSelected={pathname === "grocery"}
        onClick={() => router.push("/grocery")}
      >
        <Flex
          flexDirection={"column"}
          justify={"center"}
          align={"center"}
          h={"100%"}
        >
          <Text>장보기</Text>
          <Text>상품</Text>
        </Flex>
      </TabBox>
      <TabBox
        isSelected={pathname === "department"}
        onClick={() => router.push("/department")}
      >
        <Flex
          flexDirection={"column"}
          justify={"center"}
          align={"center"}
          h={"100%"}
        >
          <Text>백화점</Text>
          <Text>상품</Text>
        </Flex>
      </TabBox>
    </Flex>
  );
};
