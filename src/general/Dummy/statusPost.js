const { STATUS_POST } = require("general/enum");

const status = [
  {
    value: STATUS_POST.WaitApproved,
    label: "Chờ duyệt",
  },
  {
    value: STATUS_POST.Approved,
    label: "Đã duyệt",
  },
  {
    value: STATUS_POST.Denied,
    label: "Từ chối duyệt",
  },
];
export default status;
