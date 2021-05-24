/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/admin" className={classes.block}>
                ANTISCAM VIETNAM
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=antiscam.contact@gmail.com"
              target="_blank"
              className={classes.a}
            >
              antiscam.contact@gmail.com
            </a>
            , Chống lừa đảo AntiScam
          </span>
        </p>
      </div>
    </footer>
  );
}
