import React from 'react';
import GoogleMapReact from 'google-map-react';
import Modal, {IPoint} from '../Modal/Modal';
import styles from './Map.module.scss';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { Icon } from '@iconify/react';
import recycleIcon from '@iconify/icons-mdi/recycle';
import nanoid from 'nanoid';
import { ILitterStorage } from '../../classes/models/ILitterStorage';

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
  points: ILitterStorage[];
  city: string;
}

const Map = (props: GeolocatedProps | IProps | any) => {
  const [points, setPoints] = React.useState<ILitterStorage[]>([]);
  const [currentPoint, setCurrentPoint] = React.useState<IPoint | undefined>();

  const handleClick = (value: IClickEventValue) => {
    setCurrentPoint({ lat: value.lat, lng: value.lng });
  };

  React.useEffect(() => {
    console.log(currentPoint);
  }, [currentPoint]);

  React.useEffect(() => {
    props.points && setPoints(props.points);
  }, [props.points]);

  console.log(points.length > 0, points);
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
          zoom={10}
          yesIWantToUseGoogleMapApiInternals
          onClick={handleClick}
        >
          {points.length > 0 &&
            points.map(point => (
              <Point
                lat={point.latlng && point.latlng.latitude}
                lng={point.latlng && point.latlng.longitude}
                key={nanoid(8)}
              />
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
