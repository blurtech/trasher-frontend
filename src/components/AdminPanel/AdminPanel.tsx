import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import recycleIcon from '@iconify/icons-mdi/recycle';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import { IUser } from '../../classes/models/IUser';

interface IPoint {
  lat: number;
  lng: number;
}

interface IClickEventValue {
  x: number;
  y: number;
  lat: number;
  lng: number;
  event: object;
}

const Point = (props: any) => (
  <Icon height={40} width={40} icon={recycleIcon} />
);

interface IProps {
  currentUser: IUser;
}

const AdminPanel = (props: GeolocatedProps | IProps | any) => {
  const [points, setPoints] = React.useState<IPoint[] | undefined>([]);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  const handleClick = (value: IClickEventValue) => {
    console.log(value.lat, value.lng);
  };

  React.useEffect(() => {
    props.currentUser && setUser(props.currentUser);
  }, [props.currentUser]);

  React.useEffect(() => {
    props.coords &&
      setPoints([
        {
          lat: props.coords.latitude,
          lng: props.coords.longitude,
        },
      ]);
  }, [props.coords]);

  return (
    <div style={{ width: '100%', height: 500 }}>
      {user && user.username}
      {props.coords && process.env.REACT_APP_API_KEY && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY,
            language: 'ru',
            client: 'ru',
          }}
          center={{
            lat: props.coords.latitude,
            lng: props.coords.longitude,
          }}
          zoom={15}
          yesIWantToUseGoogleMapApiInternals
          onClick={handleClick}
        >
          {points &&
            points.map(point => (
              <Point
                lat={point.lat}
                lng={point.lng}
                key={`${point.lat}${point.lng}`}
              />
            ))}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(AdminPanel);

export { AdminPanel };
