import React from 'react';
import { IUser } from '../../classes/models/IUser';
import Map from '../Map/Map';
import Menu from '../Menu/Menu';
import { fetchLitterStoragesByCity } from '../../classes/services/api/LitteStorageApi';
import { ILitterStorage } from '../../classes/models/ILitterStorage';
import { appUpdateState } from '../../store';

interface IProps {
  currentUser: IUser;
}

const AdminPanel = (props: IProps | any) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [litterStorages, setLitterStorages] = React.useState<ILitterStorage[]>(
    []
  );

  React.useEffect(() => {
    props.currentUser && setUser(props.currentUser);
  }, []);

  React.useEffect(() => {
    user &&
      user.address &&
      user.address.city &&
      fetchLitterStoragesByCity(user.address.city).then(data => {
        setLitterStorages(data.items);
        appUpdateState(s => {
          s.litterStorages = data.items;
        });
      });
  }, [user]);

  return (
    <div style={{ width: '100%', height: 500 }}>
      {user && user.username}
      <Menu />
      {litterStorages.length > 0 && (
        <Map city={user && user.city} points={litterStorages} />
      )}
    </div>
  );
};

export default AdminPanel;
