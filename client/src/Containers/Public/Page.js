import React, { useState, useEffect } from "react";
import { PageNumber } from "../../Components";
import { useSelector } from "react-redux";
import icons from "../../Ultils/icon";
import { useSearchParams } from "react-router-dom";
const { TbPlayerTrackNext, TbPlayerTrackPrev } = icons;
const Page = ({ page }) => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHide, setIsHide] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT);

    let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
    let start = currentPage - 1 <= 0 ? 1 : currentPage - 1;

    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage >= maxPage - 1 ? setIsHide(true) : setIsHide(false);
    currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false);
  }, [count, posts, currentPage]);

  return (
    <div className="flex items-center gap-2 justify-center py-5">
      {!isHideStart && (
        <PageNumber
          icon={<TbPlayerTrackPrev />}
          setCurrentPage={setCurrentPage}
          text={1}
        />
      )}
      {!isHideStart && <PageNumber text={"...."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              text={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHide && <PageNumber text={"...."} />}
      {!isHide && (
        <PageNumber
          icon={<TbPlayerTrackNext />}
          text={Math.floor(count / posts.length)}
          type="end"
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Page;
