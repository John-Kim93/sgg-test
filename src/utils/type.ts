// 타입 관련 유틸 함수
export function isNullish(target: unknown) {
  if (target === undefined || target === null) {
    return true;
  }
  return false;
}

export enum eUnitType {
  CATEGORY_TAB = "CATEGORY_TAB",
  IMG_ITEM = "IMG_ITEM",
}

export function findDataByUnitType<T>(
  areaList: T[][],
  targetUnitType: eUnitType
): T | null {
  for (const target of areaList) {
    const res = target.find((t: T) => {
      const unitType: eUnitType = (t as { unitType: eUnitType }).unitType;
      return unitType === targetUnitType;
    });
    if (res) {
      return res;
    }
  }

  return null;
}
