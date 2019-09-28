import React from 'react';
import GoogleMapReact from 'google-map-react';
import Modal from '../Modal/Modal';
import styles from './Map.module.scss';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { Icon } from '@iconify/react';
import recycleIcon from '@iconify/icons-mdi/recycle';
import nanoid from 'nanoid';

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

const Map = (props: GeolocatedProps | any) => {
  const [points, setPoints] = React.useState<IPoint[] | undefined>([]);
  const [currentPoint, setCurrentPoint] = React.useState<IPoint | undefined>();

  const handleClick = (value: IClickEventValue) => {
    setCurrentPoint({ lat: value.lat, lng: value.lng });
  };

  React.useEffect(() => {
    console.log(currentPoint);
  }, [currentPoint]);

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
    <>
      {props.coords && process.env.REACT_APP_API_KEY && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_KEY,
            language: 'ru',
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
              <Point lat={point.lat} lng={point.lng} key={nanoid(8)} />
            ))}
        </GoogleMapReact>
      )}
      {currentPoint ? (
        <>
          <div
            className={styles.ModalBackground}
            style={{
              height: document.documentElement.clientHeight,
              width: document.documentElement.clientWidth,
            }}
            onClick={() => setCurrentPoint(undefined)}
          />
          <Modal {...currentPoint} />
        </>
      ) : null}
    </>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Map);
