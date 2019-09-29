import React, { CSSProperties, HTMLAttributes } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
import styles from './Cities.module.scss';
import StatisticsStoreService from '../../classes/services/StatisticsStoreService';

interface OptionType {
  label: string;
  value: string;
}

const NoOptionsMessage = (props: NoticeProps<OptionType>) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> &
  HTMLAttributes<HTMLDivElement>;

const inputComponent = ({ inputRef, ...props }: InputComponentProps) => {
  return <div ref={inputRef} {...props} />;
};

const Control = (props: ControlProps<OptionType>) => {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      className={styles.input}
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
};

const Option = (props: OptionProps<OptionType>) => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
  Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;

const Placeholder = (props: MuiPlaceholderProps) => {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
};

const SingleValue = (props: SingleValueProps<OptionType>) => {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const ValueContainer = (props: ValueContainerProps<OptionType>) => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

const MultiValue = (props: MultiValueProps<OptionType>) => {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
};

const Menu = (props: MenuProps<OptionType>) => {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

interface IProps {
  onChange: (arg0: any) => void;
}

const Cities = (props: IProps) => {
  const { onChange } = props;
  const [single, setSingle] = React.useState<ValueType<OptionType>>(null);
  const [cities, setCities] = React.useState<OptionType[]>([]);

  React.useEffect(() => {
    StatisticsStoreService.getCities().then(results => {
      const citiesArray = results.items.map(suggestion => ({
        value: suggestion,
        label: suggestion,
      }));
      setCities(citiesArray);
    });
  }, []);

  const handleChangeSingle = (value: ValueType<OptionType>) => {
    setSingle(value);
    onChange(value);
  };

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: 'black',
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={styles.root}>
      <NoSsr>
        <div className={styles.divider} />
        <Select
          classes={styles}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Город',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder="Выберите город"
          options={cities}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
      </NoSsr>
    </div>
  );
};
export default Cities;
