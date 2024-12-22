"use client";

import {
  Box,
  Image,
  Text,
  Badge,
  IconButton,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import { TProduct } from "./types";

const ProductCard = ({
  product,
  index,
}: {
  product: TProduct;
  index: number;
}) => {
  if (product === undefined) return <>상품 정보 오류!</>;
  const {
    itemImgUrl,
    itemNm,
    flucType,
    flucOrdr,
    brandNm,
    displayPrc,
    sellCapaUnitNmWithUnitCapa,
    sellUnitPrc,
    recomRegCnt,
    recompPoint,
    benefitGrp0,
    benefitGrp1,
    benefitGrp2,
    benefitGrp3,
    benefitGrp4,
    itemLnkd,
  } = product;

  const navigateProductDetailHandler = () => {
    window.open(itemLnkd);
  };
  return (
    <Box overflow="hidden" bg="white" maxW="250px">
      {/* 상품 이미지 */}
      <Box position="relative">
        <Image
          src={itemImgUrl}
          alt={itemNm}
          w="100%"
          h="200px"
          objectFit="cover"
          cursor={"pointer"}
          loading="lazy"
          onClick={() => navigateProductDetailHandler()}
        />
        {/* 순위 (변경) 뱃지 */}
        <Box position="absolute" top="0" right="0">
          <Flex>
            {flucType === "up" && (
              <Flex
                bg="#fff"
                color="#f00"
                fontSize="xs"
                px="1"
                py="0.5"
                alignItems={"center"}
              >
                <AiFillCaretUp /> <Text marginLeft={0.5}>{flucOrdr}</Text>
              </Flex>
            )}
            {flucType === "down" && (
              <Flex
                bg="#fff"
                color="#000"
                fontSize="xs"
                px="1"
                py="0.5"
                alignItems={"center"}
              >
                <AiFillCaretDown /> <Text marginLeft={0.5}>{flucOrdr}</Text>
              </Flex>
            )}
            <Box bg="gray.500" color="white" fontSize="sm" px="2" py="0.5">
              {index < 9 ? 0 : null}
              {index + 1}
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* 콘텐츠 섹션 */}
      <Flex flexDirection={"column"} align="start">
        {/* Benefit 배지, 좋아요, 장바구니 */}
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box>
            {benefitGrp0.some((benefit) => {
              return benefit.type === "freshGuarantee";
            }) && (
              <Badge bg="blue.200" color="#000" px={2}>
                신선보장
              </Badge>
            )}
            {benefitGrp1.some((benefit) => {
              return benefit.type === "10";
            }) && (
              <Badge bg="yellow.200" color="#000" px={2}>
                1+1
              </Badge>
            )}
            {benefitGrp2.some((benefit) => {
              return benefit.type === "90";
            }) && (
              <Badge bg="yellow.400" color="#000" px={2}>
                쓱배송
              </Badge>
            )}
            {[...benefitGrp3, ...benefitGrp4].some((benefit) => {
              return benefit.type === "180";
            }) && (
              <Badge bg="gray.200" color="#000" px={2}>
                무료배송
              </Badge>
            )}
          </Box>
          <HStack>
            <IconButton size="md">
              <AiOutlineHeart />
            </IconButton>
            <IconButton size="md">
              <AiOutlineShoppingCart />
            </IconButton>
          </HStack>
        </Flex>

        {/* 브랜드명 & 제품명 */}
        <Box
          fontSize="md"
          cursor={"pointer"}
          onClick={() => navigateProductDetailHandler()}
        >
          <Text display={"inline-block"} fontWeight="bold" marginRight={1}>
            {brandNm}
          </Text>
          {itemNm}
        </Box>

        {/* 가격 & 단위 가격 */}
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          {Number(displayPrc).toLocaleString("en-US")}원
        </Text>
        {sellCapaUnitNmWithUnitCapa !== "" && sellUnitPrc !== "" && (
          <Text fontSize="sm" color="gray.500">
            {sellCapaUnitNmWithUnitCapa}당 {sellUnitPrc}원
          </Text>
        )}

        {/* 별점 및 리뷰 수 */}
        {recomRegCnt !== "" && recompPoint !== "" && (
          <Flex fontSize="sm" color="gray.500">
            <Text marginRight={1}>★ {recompPoint} </Text>|
            <Text marginLeft={1}>
              {Number(recomRegCnt).toLocaleString("en-US")}건
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
