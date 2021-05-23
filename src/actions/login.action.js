import { sleep } from "../general/helper";
import { addAlert } from "./alertify.action";
import { loadingAct } from "./loading.action";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const loginAct = (userName, password, callback) => async (dispatch) => {
  console.log("loading");
  dispatch(loadingAct(true));
  try {
    dispatch({ type: REQUEST_LOGIN });

    await sleep(1500);

    if (userName == "admin" && password == "1234") {
      let response = {};
      response.data = {
        isSuccess: true,
        data: {
          userName: "Thành trần",
          email: "thanh@gmail.com",
          numberPhone: null,
          imageAvatar: "/fake-image",
          isAuth: true,
          joinedDate: new Date(),
          totalPosts: 4,
        },
      };
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      callback && callback();
    } else {
      throw new Error("tên đăng nhập hoặc mật khẩu không đúng");
    }
  } catch (e) {
    console.error("error login:", String(e));
    dispatch(addAlert(String(e), "error"));
    dispatch({ type: LOGIN_FAIL, payload: String(e) });
  } finally {
    dispatch(loadingAct(false));
  }
};
