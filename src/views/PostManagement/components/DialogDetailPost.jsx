import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useTheme,
} from "@material-ui/core";
import { connectToContext } from "components/ContextWrapper";
import ButtonCommon from "components/ButtonCommon";
import { STATUS_POST } from "general/enum";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSwipeWrapper from "components/PhotoSwipeWrapper";

function DialogDetailPost(props) {
  const {
    open,
    onClose,
    onClickApproved,
    onClickDenied,
    onDeletePost,
    content,
  } = props;
  const theme = useTheme();

  const [openImg, setOpenImg] = useState(false);
  const [indexImg, setIndexImg] = useState(0);

  const imgShows =
    content.images &&
    content.images?.map((i) => {
      return {
        src: i,
        w: 600,
        h: 400,
      };
    });

  const _openImage = (index) => {
    setIndexImg(index);
    setOpenImg(true);
  };
  const _onCloseImg = () => {
    setOpenImg(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Box>{content.title}</Box>
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>Đăng bởi: {content.createdBy}</Box>
        <Box>Loại báo cáo: {content.typeName}</Box>
        <Divider />
        <Box>{content.description}</Box>
        <Box borderBottom="1px solid black">Hình ảnh:</Box>
        <Box textAlign="start" display="flex" marginTop="8px">
          {content.images &&
            content.images.map((image, index) => {
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
          {content.images ? (
            <PhotoSwipeWrapper
              isOpen={openImg ?? []}
              index={indexImg}
              items={imgShows}
              onClose={_onCloseImg}
            />
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" width="100%" justifyContent="space-between">
          <ButtonCommon style={{ backgroundColor: theme.palette.error.main }}>
            Xóa bài
          </ButtonCommon>
          {content.statusId == STATUS_POST.WaitApproved ? (
            <Box display="flex">
              <ButtonCommon color="inherit">Từ chối bài</ButtonCommon>
              <Box width="12px"></Box>
              <ButtonCommon>Duyệt bài</ButtonCommon>
            </Box>
          ) : null}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

DialogDetailPost.propTypes = {};

const mapContextToProps = (context) => ({
  content: context.itemPost,
  open: context.openDetail,
  onClose: context.onCloseDialog,
});

export default connectToContext(mapContextToProps)(DialogDetailPost);
