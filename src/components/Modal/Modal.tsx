import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './Modal.module.scss';

interface IPoint {
  lat: number;
  lng: number;
}

const Modal = (props: IPoint) => {
  return (
    <div className={styles.ModalWindow}>
    </div>
  )
};

export default Modal;