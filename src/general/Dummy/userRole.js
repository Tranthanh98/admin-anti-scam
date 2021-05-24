import { USER_ROLE } from "general/enum";

const userRoles = [
  {
    value: 0,
    label: "Tất cả",
    data: {
      description: "undefined",
    },
  },
  {
    value: USER_ROLE.SystemManage,
    label: "Quản trị hệ thống",
    data: {
      description: "Quyền thêm admin, thêm thể loại",
    },
  },
  {
    value: USER_ROLE.ApprovedPost,
    label: "Duyệt bài",
    data: {
      description: "Quản lý bài đăng",
    },
  },
];

export default userRoles;
