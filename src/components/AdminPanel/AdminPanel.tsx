import React from 'react';
import { IUser } from '../../classes/models/IUser';
import Map from '../Map/Map';
import Menu from '../Menu/Menu';

interface IProps {
  currentUser: IUser;
}

const AdminPanel = (props: IProps | any) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  React.useEffect(() => {
    props.currentUser && setUser(props.currentUser);
  }, [props.currentUser]);

  return (
    <div style={{ width: '100%', height: 500 }}>
      {user && user.username}
      <Menu />
      <Map city={user && user.city} />
    </div>
  );
};

export default AdminPanel;
