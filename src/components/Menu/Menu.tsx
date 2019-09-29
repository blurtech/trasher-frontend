import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import styles from './Menu.module.scss';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import { clearUser } from '../../classes/helpers/StorageHelper';
import nanoid from 'nanoid';
import { appUpdateState } from '../../store';
import SearchIcon from '@material-ui/icons/Search';

const Menu = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleOpen = () => setOpen(prevState => !prevState);

  return (
    <div className={styles.fullMenu}>
      <div className={open ? styles.collapseButtonOpen : styles.collapseButton}>
        <div
          className={open ? styles.buttonOpen : styles.button}
          onClick={handleOpen}
        >
          {open ? <Icon icon={chevronLeft} /> : <Icon icon={chevronRight} />}
        </div>
      </div>
      <div className={open ? styles.menuOpen : styles.menu}>
        <Drawer
          className={styles.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: styles.drawerPaper,
          }}
        >
          <div className={styles.drawerHeader}>
            <Paper className={styles.root}>
              <InputBase
                className={styles.input}
                placeholder="Поиск"
                inputProps={{ 'aria-label': 'Поиск' }}
              />
              <IconButton className={styles.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              key={nanoid(8)}
              onClick={() => {
                clearUser();
                appUpdateState(s => {
                  s.currentUser = {};
                });
              }}
            >
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
