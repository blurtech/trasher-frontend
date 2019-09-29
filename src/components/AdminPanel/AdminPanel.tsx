import React from 'react';
import { IUser } from '../../classes/models/IUser';
import Map from '../Map/Map';
import Menu from '../Menu/Menu';
import { ILitterStorage } from '../../classes/models/ILitterStorage';
import LitterStorageStoreService from "../../classes/services/LitterStorageStoreService";

interface IProps {
  currentUser: IUser;
  logout?: any
}

const AdminPanel = (props: IProps | any) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [pointData, setPointData] = React.useState<any>(undefined);
  const [litterStorages, setLitterStorages] = React.useState<ILitterStorage[]>(
    []
  );
  const [litterStorage, setLitterStorage] = React.useState<ILitterStorage | undefined>(undefined)

  React.useEffect(() => {
    props.currentUser && setUser(props.currentUser);
  }, []);

  React.useEffect(() => {
    user &&
      user.address &&
      user.address.city &&
      LitterStorageStoreService.getLitterStoragesByCity(user.address.city).then(data => {
        setLitterStorages(data.items);
      });
  }, [user]);
  return (
    <div style={{
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight-20,
      margin: -8
    }}>
      <Menu pointData={pointData} user={user} litterStorageData={litterStorage} logout={props.logout}/>
      {litterStorages.length > 0 && (
        <Map city={user && user.city} setLitterStorage={(item: any) => {setLitterStorage(item)}} points={litterStorages} setPoint={(data:any) => {setPointData(data)}} />
      )}
    </div>
  );
};

export default AdminPanel;
