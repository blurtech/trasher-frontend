import React from 'react';
import GoogleMapReact from 'google-map-react';
import Modal, { IPoint } from '../Modal/Modal';
import styles from './Map.module.scss';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import recycleIcon from './Point24.svg';
import nanoid from 'nanoid';
import { ILitterStorage } from '../../classes/models/ILitterStorage';

interface IClickEventValue {
  x: number;
  y: number;
  lat: number;
  lng: number;
  event: object;
}

const Point = (props: any) => <img height={40} width={40} src={recycleIcon} />;

interface IProps {
  points: ILitterStorage[];
  city: string;
}

const Map = (props: GeolocatedProps | IProps | any) => {
  const [points, setPoints] = React.useState<ILitterStorage[]>([]);
  const [currentPoint, setCurrentPoint] = React.useState<IPoint | undefined>();
  const [sortedPoints, setSortedPoints] = React.useState<ILitterStorage[]>([]);
  const [filter, setFilter] = React.useState<number[]>([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
  ]);

  const handleClick = (value: IClickEventValue) => {
    setCurrentPoint({ lat: value.lat, lng: value.lng });
  };

  React.useEffect(() => {
    props.points && setPoints(props.points);
    setSortedPoints(props.points);
  }, [props.points]);

  React.useEffect(() => {
    setSortedPoints(
      points.filter(
        point =>
          point.containers &&
          point.containers.every(cont => filter.includes(cont))
      )
    );
  }, [filter]);

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
          {sortedPoints.length > 0 &&
            sortedPoints.map(point => (
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
