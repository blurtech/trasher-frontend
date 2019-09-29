import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button
} from '@material-ui/core';
import styles from './Menu.module.scss';
import Icon from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import { clearUser } from '../../classes/helpers/StorageHelper';
import nanoid from 'nanoid';
import { appUpdateState} from '../../store';
import SearchIcon from '@material-ui/icons/Search';
import { IUser } from '../../classes/models/IUser';

interface IProps {
    user?: IUser
    pointData?: any
    logout?: any
    open: boolean
}

const Menu = (props: IProps) => {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  React.useEffect(() => {
    setOpen(true)
  }, [props.open]);

  const handleOpen = (where:boolean) => setOpen(where);

  return (
    <div>
       
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
            <div className={styles.headerMenu}>
            <Paper className={styles.root}>
              <InputBase
                className={styles.input}
                placeholder="Поиск в Trasher"
                inputProps={{ 'aria-label': 'Поиск в Trasher' }}
              />
              <IconButton className={styles.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Button
              variant="outlined"
              onClick={() => {
                clearUser();
                props.logout();
                appUpdateState(s => {
                  s.currentUser = {};
                });
              }}
              >
                Log out
              </Button>
            </Paper>
            <div className={styles.backBTN} onClick={()=>handleOpen(false)}><Icon icon={chevronLeft} /></div>
            </div>
            

          </div>
          <Divider />
          <List>
          <ListItem
            >
              <ListItemText secondary={user && user.address && `Вы вошли как ${user.username}, вы оператор города ${user.address.city}`} />
            </ListItem>
            <ListItem
            >
              <ListItemText primary={props.pointData && <span>{`${props.pointData.lat} ${props.pointData.lng}`}</span> } />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
