import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import dummyData from "views/PostManagement/configs/dummyData";
import PhotoSwipeWrapper from "components/PhotoSwipeWrapper";
import { formateDateTime } from "general/helper";
import ButtonCommon from "components/ButtonCommon";
import { STATUS_POST } from "general/enum";

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
  const [imageShow, setImageShow] = useState([]);
  const _getPost = () => {
    const { id } = params;
    const post = dummyData.find((i) => i.id == id);
    if (post) {
      setPost(post);
    }
  };
  useEffect(() => {
    _getPost();
  }, []);

  useEffect(() => {
    const imgShows =
      post?.images &&
      post?.images?.map((i) => {
        return {
          src: i,
          w: 600,
          h: 400,
        };
      });
    setImageShow(imgShows);
  }, [post]);

  const _openImage = (index) => {
    setIndexImg(index);
    setOpenImg(true);
  };
  const _onCloseImg = () => {
    setOpenImg(false);
  };
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh">
      {post ? (
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
                <Box marginTop="8px">
                  <Box marginLeft="8px" style={{ wordBreak: "break-all" }}>
                    Loại báo cáo : {post.typeName}
                  </Box>
                </Box>
                <Box marginTop="8px" padding="0 8px">
                  Người báo: {post.createdBy}
                </Box>
              </Box>
              <CardContent>
                <Box textAlign="start">{post.description}</Box>
                <Box
                  className={classes.imageTitleCss}
                  textAlign="start"
                  margin="8px 0"
                  fontWeight="500"
                >
                  Hình ảnh:
                </Box>
                <Box textAlign="start" display="flex" marginTop="8px">
                  {post.images &&
                    post.images.map((image, index) => {
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
                    })}
                  {imageShow ? (
                    <PhotoSwipeWrapper
                      isOpen={openImg}
                      index={indexImg}
                      items={imageShow}
                      onClose={_onCloseImg}
                    />
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box marginLeft="12px" width="30%">
            <Card>
              <CardContent>
                <Box display="flex" margin="8px 0">
                  Người báo:{" "}
                  <Box color="primary.main" fontWeight="bold" marginLeft="4px">
                    {post.createdBy}
                  </Box>
                </Box>
                <Box display="flex" margin="8px 4px">
                  Ngày báo:{" "}
                  <Box fontStyle="italic" marginLeft="4px">
                    {post.createdDate}
                  </Box>
                </Box>
                <Box display="flex" margin="8px 0">
                  <ButtonCommon
                    style={{
                      backgroundColor: theme.palette.error.main,
                      width: "100%",
                    }}
                  >
                    Xóa bài
                  </ButtonCommon>
                </Box>
                <Box
                  display="flex"
                  margin="8px 0"
                  justifyContent="space-between"
                >
                  {post.statusId == STATUS_POST.WaitApproved ? (
                    <>
                      <ButtonCommon color="inherit">Từ chối bài</ButtonCommon>
                      <ButtonCommon>Duyệt bài</ButtonCommon>
                    </>
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <Box>Bài viết không tồn tại</Box>
      )}
    </Box>
  );
}

DetailPost.propTypes = {};

export default DetailPost;
