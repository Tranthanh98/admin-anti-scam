import moment from "moment";

export const formatMoney = (number, unit = "")=>{
    return String(number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + unit; 
}
export function sleep(time){
    return new Promise(resolve => setTimeout((resolve), time));
}
export function random(length, str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"){
    let data = "";
    for(let i=0; i< length; i++){
        let ran = Math.floor(Math.random() * (str.length-1));
        data += str[ran];
    }
    return data;
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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
export function formateDateTime(date, format="DD/MM/YYYY") {
    if (date) {
        return moment(date).format(format);
    } else {
        return "-";
    }
}