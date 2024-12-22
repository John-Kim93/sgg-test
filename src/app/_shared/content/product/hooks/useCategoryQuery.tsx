"use client";

import { eUnitType, findDataByUnitType } from "@/utils/type";
import axios from "axios";
import { ProductApiRes, TArea, TPages } from "../types";
import { QueryKey, useQuery } from "@tanstack/react-query";

const QUERY_KEY: QueryKey = ["category"];

const useCategoryQuery = (target: TPages) => {
  const { data, isLoading, isError } = useQuery<TArea | null>(
    [...QUERY_KEY, target],
    async () => {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API + `/api/${target}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const categoryTabData: TArea | null = findDataByUnitType(
        (data as ProductApiRes).data.areaList,
        eUnitType.CATEGORY_TAB
      );
      return categoryTabData;
    }
  );

  return {
    categoryInfo: data,
    isLoading,
    isError,
  };
};

export default useCategoryQuery;
