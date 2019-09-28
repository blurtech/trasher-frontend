import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import styles from './Menu.module.scss';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@iconify/react';
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';

const Menu = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleOpen = () => setOpen(prevState => !prevState);

  return (
    <div className={styles.fullMenu}>
      <div className={open ? styles.collapseButtonOpen : styles.collapseButton}>
        <div
          className={styles.button}
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
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
