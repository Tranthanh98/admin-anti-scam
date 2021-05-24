const { getGuid } = require("general/helper");

function createUserData(
  userId,
  userName,
  email,
  createdDate,
  roleList,
  isActive
) {
  return {
    userId,
    userName,
    email,
    createdDate,
    roleList,
    isActive,
  };
}

const dummyUserData = [
  createUserData(
    getGuid(),
    "thanh.tran",
    "thanh@gmail.com",
    new Date(),
    [1, 2],
    true
  ),
  createUserData(
    getGuid(),
    "thinh.nguyen",
    "thinh@gmail.com",
    new Date(),
    [1],
    true
  ),
  createUserData(
    getGuid(),
    "khang.hoai",
    "khang@gmail.com",
    new Date(),
    [2],
    false
  ),
];

export default dummyUserData;
