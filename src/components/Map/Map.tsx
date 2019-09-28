import React from 'react';
import GoogleMapReact from 'google-map-react';
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

  const handleClick = (value: IClickEventValue) => {
    console.log(value.lat, value.lng);
  };

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
    </>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Map);
