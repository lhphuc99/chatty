import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import StickerAPI from "api/stickerAPI";
import messageAPI from 'api/messageAPI';
import * as constants from 'constants/index';
import {
  GridList,
  GridListTile,
  IconButton,
  Popover,
  Tooltip,
} from "@material-ui/core";
import Loading from "components/Loading";
import { useSelector } from "react-redux";
import './style.scss';

const qooBeeTitle =
  "https://firebasestorage.googleapis.com/v0/b/chatty-app-8b7f5.appspot.com/o/Sticker%2FQooBee%2Ftitle%2FqoobeeTitle.png?alt=media&token=2aef8e57-48c4-40b0-b243-f3ad1f896229";
const meepTitle =
  "https://firebasestorage.googleapis.com/v0/b/chatty-app-8b7f5.appspot.com/o/Sticker%2FMeep%2F17.png?alt=media&token=a6bb69b4-8d45-4ee2-b57e-b4bf818d6e87";
const speedyTitle =
  "https://firebasestorage.googleapis.com/v0/b/chatty-app-8b7f5.appspot.com/o/Sticker%2FSpeedy%2Ftitle%2Fspeedy.png?alt=media&token=2e258254-8728-4935-8f79-fd4f945f6da4";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box key={value} p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflow:'hidden',
  },
}));

export default function Sticker(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [qooBee, setQooBee] = useState([]); 
  const [meep, setMeep] = useState([]);
  const [speedy, setSpeedy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const currentID = useSelector((state)=>state.user.currentUser.uid);
  const currentContact = useSelector((state)=>state.message.currentContact.uid);

  useEffect(() => {
    if (qooBee.length===0&&value === 0){
      setLoading(true);
      StickerAPI.getQooBee()
      .then((data) => {
        setQooBee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    if (meep.length===0&&value === 1){
      setLoading(true);
      StickerAPI.getMeep()
        .then((data) => {
          setMeep(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    };
    if (speedy.length===0&&value === 2) {
      setLoading(true);
      StickerAPI.getSpeedy()
        .then((data) => {
          setSpeedy(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
  },[value]);


  const handleClickSticker=(url)=>{
    messageAPI.sendMessage(url,constants.STICKER,currentID,currentContact);
  }

  const handleClickQooBee = () => {
    return qooBee.map((url) => {
      return (
        <GridListTile cols={1} key={url.url} button onClick={()=>handleClickSticker(url.url)} className="titleA">
          <img
            style={{ width: "34px", height: "34px"}}
            className="stickerItem"
            src={url.url}
            alt="ticker"
          />
        </GridListTile>
      );
    });
  };

  const handleClickMeep = () => {
    if(meep.length===0) return; 
    return meep.map((url) => {
      return (
        <GridListTile cols={1} key={url.url} button onClick={()=>handleClickSticker(url.url)} className="titleA">
          <img
            style={{ width: "34px", height: "34px" }}
            className="stickerItem"
            src={url.url}
            alt="ticker"
          />
        </GridListTile>
      );
    });
  };

  const handleClickSpeedy = () => {
    return speedy.map((url) => {
      return (
        <GridListTile cols={1} key={url.url} button onClick={()=>handleClickSticker(url.url)} className="titleA">
          <img
            style={{ width: "34px", height: "34px" }}
            className="stickerItem"
            src={url.url}
            alt="ticker"
          />
        </GridListTile>
      );
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
       <IconButton onClick={handleClick}>
        <Tooltip title="Choose sticker">
          <span className="fas fa-sticky-note icon btn-color" />
        </Tooltip>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ display: "flex", justifyContent: "space-around" }}
            
          >
            <Tab
              icon={<img src={qooBeeTitle} alt="qooBee title" />}
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <img
                  src={meepTitle}
                  alt="meep title"
                  style={{ width: "34px", height: "34px" }}
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <img
                  src={speedyTitle}
                  alt="speedy title"
                  style={{ width: "34px", height: "34px" }}
                />
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div style={{maxHeight:"340px",maxWidth:"394px",overflowY:"scroll",overflowX:"hidden"}}>
          <GridList
            cellHeight={70}
            cols={4}
          >
            {loading ? (
              <div style={{height:"340px",width:"394px"}}><Loading /></div>
            ) : handleClickQooBee()}
          </GridList>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div  style={{maxHeight:"340px",maxWidth:"394px",overflowY:"scroll",overflowX:"hidden"}}>
          <GridList
              cellHeight={70}
              cols={4}
            >
              {loading ? (
                <div style={{height:"340px",width:"394px"}}><Loading /></div>
              ) : handleClickMeep()}
            </GridList>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style={{maxHeight:"340px",maxWidth:"394px",overflowY:"scroll",overflowX:"hidden"}}>
          <GridList
            cellHeight={70}
            cols={4}
          >
            {loading ? (
              <div style={{height:"340px",width:"394px"}}><Loading /></div>
            ) :handleClickSpeedy()}
          </GridList>
          </div>
        </TabPanel>
      </Popover>
    </div>
  );
}
