import moment from "moment";

// Hàm định dạng thời gian
const formatDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;

  let date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;

  let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;

  return `${day}, ${time} ${date}`;
};

const generateVipDate = (vipLevel) => {
  let today = new Date();
  let expireDate;

  if (vipLevel === 1) {
    expireDate = moment(today).add(1, "weeks").toDate();
  } else if (vipLevel === 2) {
    expireDate = moment(today).add(2, "weeks").toDate();
  } else if (vipLevel === 3) {
    expireDate = moment(today).add(1, "month").toDate();
  } else {
    expireDate = moment(today).add(5, "days").toDate();
  }

  return {
    today: formatDate(today),
    expireDate: formatDate(expireDate),
  };
};

export { generateVipDate };
