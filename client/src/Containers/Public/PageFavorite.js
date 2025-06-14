import React, { useState, useEffect } from "react";
import { PageNumber } from "../../Components";
import icons from "../../Ultils/icon";
import { useSearchParams } from "react-router-dom";

const { TbPlayerTrackNext } = icons;

const PageFavorite = ({ count = 0 }) => {
  const [arrPage, setArrPage] = useState([]);
  const [isHide, setIsHide] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = +process.env.REACT_APP_LIMIT || 6;

  useEffect(() => {
    const page = +searchParams.get("page");
    if (page && page !== currentPage) setCurrentPage(page);
    if (!page) setCurrentPage(1);
  }, [searchParams, currentPage]);

  useEffect(() => {
    const maxPage = Math.ceil(count / limit);
    const end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    const start = currentPage - 2 <= 1 ? 1 : currentPage - 2;

    const temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);

    setIsHide(currentPage >= maxPage - 2);
    setIsHideStart(currentPage <= 3);
  }, [count, currentPage, limit]);

  const lastPage = Math.ceil(count / limit);

  return (
    <div className="flex items-center gap-2 justify-center py-5">
      {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
      {!isHideStart && currentPage !== 4 && <PageNumber text={"...."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => (
          <PageNumber
            key={item}
            text={item}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ))}
      {!isHide && <PageNumber text={"...."} />}
      {!isHide && (
        <PageNumber
          icon={<TbPlayerTrackNext />}
          text={lastPage}
          type="end"
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PageFavorite;
