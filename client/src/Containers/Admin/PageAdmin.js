import React, { useState, useEffect } from "react";
import { PageNumber } from "../../Components";
import icons from "../../Ultils/icon";

const { TbPlayerTrackNext } = icons;

const PageAdmin = ({ total, perPage = 10, currentPage, setCurrentPage }) => {
  const [arrPage, setArrPage] = useState([]);

  const [isHide, setIsHide] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  useEffect(() => {
    let maxPage = Math.ceil(total / perPage);
    let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    let start = currentPage - 2 <= 1 ? 1 : currentPage - 2;

    let temp = [];

    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage >= maxPage - 2 ? setIsHide(true) : setIsHide(false);
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);
  }, [total, perPage, currentPage]);

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
          text={Math.ceil(total / perPage)}
          setCurrentPage={setCurrentPage}
          type="end"
        />
      )}
    </div>
  );
};

export default React.memo(PageAdmin);
