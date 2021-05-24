import { TYPE } from "general/enum";

const types = [
  {
    value: 0,
    label: "Tất cả",
  },
  {
    value: TYPE.Website,
    label: "Trang web",
  },
  {
    value: TYPE.BankAccount,
    label: "Số tài khoản",
  },
  {
    value: TYPE.SocialAccount,
    label: "Tài khoản MXH",
  },
  {
    value: TYPE.NumberPhone,
    label: "Số điện thoại",
  },
];
export default types;
