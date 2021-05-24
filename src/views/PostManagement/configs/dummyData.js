import kindOf from "general/Dummy/kindOf";
import status from "general/Dummy/statusPost";
import { KIND_OF } from "general/enum";
import { STATUS_POST } from "general/enum";
import { formateDateTime } from "general/helper";
import types from "../../../general/Dummy/types";

let i = 1;

function createDataPost(
  id,
  title,
  createdBy,
  createdDate,
  typeName,
  typeId,
  statusId,
  statusName,
  description = null,
  images = null,
  kindOfId = kindOf[1].value,
  kindOfName = kindOf[1].label
) {
  return {
    id,
    title,
    createdBy,
    createdDate,
    typeName,
    typeId,
    statusId,
    statusName,
    description: "có làm thì mới có ăn",
    images: [
      "https://i.pinimg.com/564x/3c/77/16/3c771649b5de0375b045a64599a6acf2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Fq-fvoVqe1_R8hwTatkwtOBj-My42fAOyg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4uDQ2Uomp7076bfVGEi-PWj0jCzJMvFMB8Q&usqp=CAU",
    ],
    kindOfId,
    kindOfName,
    approvedBy: "Thanh.tran",
  };
}

const dummyData = [
  createDataPost(
    i++,
    "Thằng này lừa đảo",
    "me" + i,
    formateDateTime(new Date(), "DD/MM/YYYY HH:mm A"),
    types[1].label,
    types[1].value,
    status[1].value,
    status[1].label
  ),
  createDataPost(
    i++,
    "hihi",
    "me" + i,
    formateDateTime(new Date(), "DD/MM/YYYY HH:mm A"),
    types[1].label,
    types[1].value,
    status[1].value,
    status[1].label
  ),
  createDataPost(
    i++,
    "Lừa đảp",
    "me" + i,
    formateDateTime(new Date(), "DD/MM/YYYY HH:mm A"),
    types[2].label,
    types[2].value,
    status[2].value,
    status[2].label
  ),
];
export default dummyData;
