import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down("md")]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: '0.70em'  // Tutorial put it as 1.25em
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down("md")]: {
      height: '7em' 
    },
    [theme.breakpoints.down("sm")]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px"
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: '0px'
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    color: "white"
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const menuOptions = [
    {name: 'Services', link: '/services'},
    {name: 'Custom Software development ', link: '/customsoftware'},
    {name: 'Mobile Apps Development', link: '/mobileapps'},
    {name: 'Website Development', link: '/websites'}
  ];

  const handleMenuItemClick = (e, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(index);
  }

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0)
        }
        break;
      case '/services':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(0)
        }
        break;
      case '/customsoftware':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(1)
        }
        break;
      case '/mobileapps':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(2)
        }
        break;
      case '/websites':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break;
      case '/revolution':
        if (value !== 2) {
          setValue(2)
        }
        break;
      case '/about':
        if (value !== 3) {
          setValue(3)
        }
        break;
      case '/contact':
        if (value !== 4) {
          setValue(4)
        }
        break;
      default:
        break;
    }
  }, [value])

  const tabs = (
    <React.Fragment>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" className={classes.tabContainer}>
        <Tab className={classes.tab} component={Link} to="/" label='Home' />
        <Tab 
          className={classes.tab} 
          component={Link} 
          to="/services" 
          aria-haspopup={anchorEl ? "true" : undefined} 
          aria-owns={anchorEl ? "simple-menu" : undefined} 
          onMouseOver={event => handleClick(event)} 
          label='Services' 
        />
        <Tab className={classes.tab} component={Link} to="/revolution"  label='The Revolution' />
        <Tab className={classes.tab} component={Link} to="/about"  label='About Us' />
        <Tab className={classes.tab} component={Link} to="/contact"  label='Contact Us' />
      </Tabs>
      <Button 
        variant="contained" 
        color="secondary" 
        component={Link} 
        className={classes.button} 
        to="/estimate"
      >
        Free Estimate
      </Button>
      <Menu 
        id='simple-menu' 
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleClose} 
        MenuListProps={{onMouseLeave: handleClose}} 
        classes={{paper: classes.menu}}
        elevation={0}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.name}
            component={Link}
            to={option.link}
            classes={{root: classes.menuItem}}
            onClick={event => {handleMenuItemClick(event, index); setValue(1); handleClose();}}
            selected={index === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} 
        open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}
        classes={{paper: classes.drawer}}>
          <List disablePadding>
            <ListItem divider button 
              component={Link} to="/" 
              onClick={() => {setOpenDrawer(false); setValue(0);}}
              selected={value === 0}>
              <ListItemText disableTypography
                className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  Home
              </ListItemText>
            </ListItem>
            <ListItem divider button 
              component={Link} to="/services" 
              onClick={() => {setOpenDrawer(false); setValue(1)}}
              selected={value === 1}>
              <ListItemText disableTypography
                className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  Services
              </ListItemText>
            </ListItem>
            <ListItem divider button 
              component={Link} to="/revolution" 
              onClick={() => {setOpenDrawer(false); setValue(2)}}
              selected={value === 2}>
              <ListItemText disableTypography
                className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  The Revolution
              </ListItemText>
            </ListItem>
            <ListItem divider button 
              component={Link} to="/about" 
              onClick={() => {setOpenDrawer(false); setValue(3)}}
              selected={value === 3}>
              <ListItemText disableTypography
                className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  About Us
              </ListItemText>
            </ListItem>
            <ListItem divider button 
              component={Link} to="/contact" 
              onClick={() => {setOpenDrawer(false); setValue(4)}}
              selected={value === 4}>
              <ListItemText disableTypography
                className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  Contact Us
              </ListItemText>
            </ListItem>
            <ListItem divider button 
              className={classes.drawerItemEstimate} 
              component={Link} to="/estimate" 
              onClick={() => {setOpenDrawer(false); setValue(5)}}
              selected={value === 5}>
              <ListItemText disableTypography
                className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>
                  Free Estimates
              </ListItemText>
            </ListItem>
          </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
              <img className={classes.logo} alt="company logo" src={logo}/>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}/>
    </React.Fragment>
  )
}