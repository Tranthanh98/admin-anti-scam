import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const formatMoney = (number, unit = "") => {
  return String(number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + unit;
};
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export function random(
  length,
  str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
) {
  let data = "";
  for (let i = 0; i < length; i++) {
    let ran = Math.floor(Math.random() * (str.length - 1));
    data += str[ran];
  }
  return data;
}

export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
function findAutoText(text, dictionary) {
  let findText = dictionary.get(text);
  if (findText != undefined) {
    return findText;
  }
  return null;
}
export const processAutoText = (value, dictionary) => {
  value = value.trim();
  let textNeedReplace = null,
    replaceText;
  if (value.substr(-1) === ";") {
    textNeedReplace = value.split(" ").pop();
    replaceText = findAutoText(textNeedReplace.slice(0, -1), dictionary);
  }

  return {
    textNeedReplace,
    replaceText,
  };
};
export const shallowEqual = (objA, objB, isLog) => {
  if (objA === objB) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  let keysA = Object.keys(objA);
  let keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }
  // Test for A's keys different from B.
  let bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      if (isLog) {
        console.log(objA, objB, keysA[i]);
      }
      return false;
    }
  }
  return true;
};
export const deepCompare = (a, b) => {
  if (typeof a == "object" && a != null && typeof b == "object" && b != null) {
    let count = [0, 0];
    for (let key in a) count[0]++;
    for (let key in b) count[1]++;
    if (count[0] - count[1] != 0) {
      return false;
    }
    for (let key in a) {
      if (!(key in b) || !deepCompare(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
};
export function formateDateTime(date, format = "DD/MM/YYYY") {
  if (date) {
    return moment(date).format(format);
  } else {
    return "-";
  }
}

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
};

export function getGuid() {
  return uuidv4();
}
