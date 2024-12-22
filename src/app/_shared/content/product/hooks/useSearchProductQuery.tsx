import { eUnitType, findDataByUnitType } from "@/utils/type";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { TArea_IMG_ITEM, TPages } from "../types";

const QUERY_KEY: QueryKey = ["searchProducts"];

const useSearchProductQuery = (target: TPages) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
  } = useInfiniteQuery<TArea_IMG_ITEM | null>(
    [...QUERY_KEY, target],
    async ({ pageParam = 1 }) => {
      // 최대 best5까지 제공
      if (pageParam > 5) return null;
      let targetPage: string = target;
      if (target === "allBest") {
        targetPage = pageParam === 1 ? "allBest" : `best${pageParam}`;
      }

      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API + `/api/${targetPage}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const imgItemInfo = findDataByUnitType(
        data.data.areaList as TArea_IMG_ITEM[][],
        eUnitType.IMG_ITEM
      );
      if (imgItemInfo) {
        return imgItemInfo;
      } else {
        return null;
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    imgItemInfo: data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
  };
};

export default useSearchProductQuery;
