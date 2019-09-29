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
  Button,
} from '@material-ui/core';
import styles from './Menu.module.scss';
import Icon from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import { clearUser } from '../../classes/helpers/StorageHelper';
import { appUpdateState } from '../../store';
import SearchIcon from '@material-ui/icons/Search';
import { IUser } from '../../classes/models/IUser';

interface IProps {
  user?: IUser;
  pointData?: any;
  logout?: any;
  litterStorageData?: any;
}

const Menu = (props: IProps) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleOpen = () => setOpen(prevState => !prevState);

  console.log(props.litterStorageData);
  return (
    <div className={open ? styles.fullMenu : styles['fullMenu--closed']}>
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
          </div>
          <Divider />
          <List>
            <ListItem>
              <ListItemText
                secondary={
                  user &&
                  user.address &&
                  `Вы вошли как ${user.username}, вы оператор города ${user.address.city}`
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  props.litterStorageData && (
                    <>
                      <span>{`${props.litterStorageData.title}`}</span>
                    </>
                  )
                }
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
