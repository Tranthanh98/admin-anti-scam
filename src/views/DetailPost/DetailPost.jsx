import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Icon,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { addAlert } from "actions/alertify.action";
import { loadingAct } from "actions/loading.action";
import ButtonCommon from "components/ButtonCommon";
import PhotoSwipeWrapper from "components/PhotoSwipeWrapper";
import { STATUS_POST } from "general/enum";
import { formateDateTime } from "general/helper";
import * as httpClient from "general/HttpClient";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  titleCss: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.dark,
    padding: theme.spacing(1),
  },
  imageTitleCss: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.dark,
  },
}));

function DetailPost(props) {
  const [post, setPost] = useState();
  const classes = useStyles();
  const [openImg, setOpenImg] = useState(false);
  const [indexImg, setIndexImg] = useState(0);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isHighLight, setHighLight] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [imageShow, setImageShow] = useState([]);
  const _getPost = async () => {
    const { id } = params;
    setLoading(true);
    try {
      let res = await httpClient.sendGet("/PostManager/DetailPost/" + id);
      if (res.data.isSuccess) {
        setPost(res.data.data);
        setHighLight(res.data.data.isHighlight);
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    _getPost();
  }, []);

  useEffect(() => {
    const imgShows =
      post?.imageList &&
      post?.imageList?.map((i) => {
        return {
          src: i,
          w: 0,
          h: 0,
        };
      });
    setImageShow(imgShows ?? []);
  }, [post]);

  const _openImage = (index) => {
    setIndexImg(index);
    setOpenImg(true);
  };
  const _onCloseImg = () => {
    setOpenImg(false);
  };

  const _onClickAccept = async () => {
    const { id } = params;
    dispatch(loadingAct(true));
    try {
      let res = await httpClient.sendGet("/PostManager/Accept/" + id);
      if (!res.data.isSuccess) {
        throw new Error(res.data.messages);
      }
      await _getPost();
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  const _disablePost = async () => {
    const { id } = params;

    dispatch(loadingAct(true));
    try {
      let res = await httpClient.sendGet("/PostManager/Disabled/" + id);
      if (!res.data.isSuccess) {
        throw new Error(res.data.messages);
      }
      await _getPost();
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  const _goBack = () => {
    console.log("back");
    history.goBack();
  };

  const _setHighLightPost = async (e) => {
    const { checked } = e.target;
    dispatch(loadingAct(true));
    try {
      let postModel = {
        postId: post.id,
        isHighLight: checked,
      };
      let res = await httpClient.sendPost(
        "/postmanager/SetHighlight",
        postModel
      );
      if (res.data.isSuccess) {
        setHighLight(checked);
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  const theme = useTheme();
  console.log("post:", post);
  return (
    <>
      <Box
        margin=" 0 0 12px 0"
        fontSize="18px"
        display="flex"
        justifyContent="center"
      >
        Nội dung chi tiết bài báo cáo
      </Box>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box
          position="absolute"
          top="-130px"
          left="0"
          display="flex"
          alignItems="center"
          zIndex={9999}
        >
          <IconButton onClick={_goBack}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5">Trở về</Typography>
        </Box>

        {loading ? (
          <Box>
            <Box margin="16px 0">Đang tải bài viết</Box>
            <CircularProgress />
          </Box>
        ) : post ? (
          <>
            <Box width={"70%"}>
              <Card>
                <Box
                  textAlign="start"
                  margin="8px 0 0 0"
                  className={classes.titleCss}
                >
                  <Box color="primary.main" fontSize={theme.spacing(2.5)}>
                    {post.title}
                  </Box>
                  <Box textAlign="start" margin="8px 0">
                    {post.typePosts.map((type, index) => {
                      return (
                        <Box display="flex" key={index}>
                          {type.type.name}:{" "}
                          <Box
                            textOverflow="ellipsis"
                            overflow="hidden"
                            marginLeft="4px"
                            color="error.main"
                            style={{ wordBreak: "break-all" }}
                          >
                            {type.object}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                <CardContent>
                  <Box textAlign="start" margin="0 0 8px 0" fontWeight="500">
                    Nội dung:
                  </Box>
                  <Box margin="0 16px" textAlign="start">
                    <div
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                    {/* {post.description} */}
                  </Box>
                  <Box textAlign="start" margin="8px 0" fontWeight="500">
                    Hình ảnh:
                  </Box>
                  <Box textAlign="start" display="flex" marginTop="8px">
                    {!post.imageList ||
                      (post.imageList.length === 0 ? (
                        <Box>Không có hình ảnh nào được cung cấp</Box>
                      ) : (
                        post.imageList.map((image, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="150px"
                              height="170px"
                              margin="8px"
                              onClick={() => _openImage(index)}
                            >
                              <img
                                src={image}
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
                          );
                        })
                      ))}
                    <PhotoSwipeWrapper
                      isOpen={openImg}
                      index={indexImg}
                      items={imageShow}
                      onClose={_onCloseImg}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box marginLeft="12px" width="30%">
              <Card>
                <CardContent>
                  <Box
                    color={post.kindOf == 2 ? "#f44336" : "#4caf50"}
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    {post.kindOfName}
                  </Box>
                  <Box display="flex" margin="8px 0">
                    <Icon style={{ marginRight: "8px" }}>person</Icon>
                    <Box
                      color="primary.main"
                      fontWeight="bold"
                      marginLeft="4px"
                      style={{ wordBreak: "break-all" }}
                    >
                      {post.writer}
                    </Box>
                  </Box>
                  <Box display="flex" margin="8px 0">
                    <CalendarTodayIcon style={{ marginRight: "8px" }} />
                    <Box fontStyle="italic" marginLeft="4px">
                      {formateDateTime(post.createdDate)}
                    </Box>
                  </Box>
                  <Box display="flex" margin="8px 0">
                    {post.status == STATUS_POST.WaitApproved ? (
                      <Icon color="waring">pending</Icon>
                    ) : post.status == STATUS_POST.Approved ? (
                      <Icon color="success">done</Icon>
                    ) : (
                      <Icon color="error">close</Icon>
                    )}
                    <Box fontStyle="italic" marginLeft="4px">
                      {post.statusName}
                    </Box>
                  </Box>
                  {post.status !== STATUS_POST.WaitApproved ? (
                    <Box display="flex">
                      <Icon>verified_user</Icon>
                      <Box marginLeft="4px" style={{ wordBreak: "break-all" }}>
                        {post.acceptedByName}
                      </Box>
                    </Box>
                  ) : null}
                  <Box display="flex" margin="8px 0">
                    {post.status == STATUS_POST.Approved ? (
                      <ButtonCommon
                        style={{
                          backgroundColor: theme.palette.error.main,
                          width: "100%",
                        }}
                        onClick={_disablePost}
                      >
                        Vô hiệu hóa bài
                      </ButtonCommon>
                    ) : null}
                  </Box>
                  <Box
                    display="flex"
                    margin="8px 0"
                    justifyContent="space-between"
                  >
                    {post.status == STATUS_POST.WaitApproved ? (
                      <>
                        <ButtonCommon onClick={_disablePost} color="inherit">
                          Từ chối duyệt
                        </ButtonCommon>
                        <ButtonCommon onClick={_onClickAccept}>
                          Duyệt bài
                        </ButtonCommon>
                      </>
                    ) : null}
                  </Box>
                  <Box
                    display="flex"
                    margin="8px 0"
                    justifyContent="space-between"
                  >
                    {post.status == STATUS_POST.Denied ? (
                      <>
                        <ButtonCommon onClick={_onClickAccept}>
                          Duyệt bài
                        </ButtonCommon>
                      </>
                    ) : null}
                  </Box>
                  <Box display="flex" margin="8px 0" alignItems="center">
                    <Checkbox
                      checked={isHighLight}
                      onChange={_setHighLightPost}
                    />
                    <Box marginLeft="8px">Đặt bài viết nổi bật</Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        ) : (
          <Box>Bài viết không tồn tại</Box>
        )}
      </Box>
    </>
  );
}

DetailPost.propTypes = {};

export default DetailPost;
