import { getNumbersArea, getNumbersPrice } from "././getNumber";

export const getCodeArea = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumbersArea(item.value);

    return {
      ...item,
      min:
        arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
      max:
        arrMaxMin.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 9999999
          : arrMaxMin[0],
    };
  });
};
export const getCodePrice = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumbersPrice(item.value);
    return {
      ...item,
      min:
        arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
      max:
        arrMaxMin.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 9999999
          : arrMaxMin[0],
    };
  });
};

export const getCodes = (entry, prices, min, max) => {
  const pricesWithMinMax = getCodePrice(prices, min, max);
  return pricesWithMinMax.filter(
    (item) => item.min <= entry && entry < item.max
  );
};

export const getCodesArea = (entry, areas, min, max) => {
  const areasWithMinMax = getCodeArea(areas, min, max);
  return areasWithMinMax.filter(
    (item) => item.min <= entry && entry < item.max
  );
};
