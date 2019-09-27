import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GeolocatedProps, geolocated } from 'react-geolocated';

const AdminPanel = (props: GeolocatedProps) => {
  return (
    <div style={{width: "100%", height: 500}}>
      { props.coords &&
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCv4JBjNV_1b1-oJFCcsnYFG1T7oin86vY',
        }}
        center={{
          lat: props.coords.latitude,
          lng: props.coords.longitude,
        }}
        zoom={20}
      />}
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
