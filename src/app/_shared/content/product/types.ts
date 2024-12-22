import { eUnitType } from "@/utils/type";

export type TPages = "allBest" | "department" | "grocery" | "realTime";

type Benefit = {
  type: string;
  txt: string;
};

export type TProduct = {
  itemId: number;
  itemImgUrl: string;
  itemNm: string;
  flucType: "up" | "down";
  flucOrdr: number;
  brandNm: string;
  itemLnkd: string;
  recompPoint: string;
  recomRegCnt: string;
  sellUnitPrc: string;
  sellCapaUnitNmWithUnitCapa: string;
  displayPrc: string;
  benefitGrp0: Benefit[];
  benefitGrp1: Benefit[];
  benefitGrp2: Benefit[];
  benefitGrp3: Benefit[];
  benefitGrp4: Benefit[];
  benefitGrp5: Benefit[];
  siteNm?: string;
};

export type TArea_IMG_ITEM = {
  unitType: eUnitType.IMG_ITEM;
  dispCtgId: number;
  itemList: TProduct[];
};

export type TDisplayCategory = {
  dispCtgId: number;
  dispCtgNm: string; // displayCategoryName
  isActivated: boolean | null;
};

export type TArea_CATEGORY_TAB = {
  unitType: eUnitType.CATEGORY_TAB;
  dispCtgList: TDisplayCategory[];
};

export type TArea = TArea_CATEGORY_TAB | TArea_IMG_ITEM;

export interface ProductApiRes {
  data: {
    areaList: TArea[][];
  };
}
