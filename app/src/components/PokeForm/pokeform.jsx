import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import toPairs from 'lodash/toPairs';
// import { useTheme } from 'styled-components';

import { useStore } from '../../state/store';
import { useForm } from '../../state/form';
// import { getLookupTableAtSelectedPath } from '../../state/selectors';
import { useTrove } from '../../urbit/index';
import { formatImplicitExtension } from '../../utils/files';
import { fieldsByAction } from './fieldsByAction';

export const PokeForm = ({ selectedPath, handleClose }) => {
  const { urbit, ship, pokes } = useTrove();
  const selectedHostSpace = useStore((state) => state.selectedHostSpace);
  const selectedRelativePath = useStore((state) => state.selectedRelativePath);
  const { formAction, formData, setFormAction, setFormData, initFormData } =
    useForm();
  // const lookupTableAtSelectedPath = useStore(getLookupTableAtSelectedPath);

  // TODO: move to util
  const getSelectedSpace = (path) => {
    if (path.includes(window.ship)) {
      return path.includes('our') ? 'our' : selectedHostSpace;
    }
    return selectedHostSpace;
  };
  const withOverrides = (overrides) => ({
    ...formData,
    ...overrides,
  });
  const getLeadingSlash = (path) => {
    return path.startsWith('/') ? path : `/${path}`;
  };
  const getActionStructure = (action) => {
    const [predicate, noun] = action?.slice().split('-');
    return [predicate, noun];
  };

  const handleChange = (name, value) => {
    setFormData(name, value);
  };

  const handleSetAction = (action) => {
    // const [predicate, noun] = getActionStructure(action);
    setFormAction(action);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const space = getSelectedSpace(selectedPath);
    const toPath = getLeadingSlash(formData.toPath);
    const fromPath = getLeadingSlash(formData.fromPath);
    const [predicate, noun] = getActionStructure(formAction);
    if (selectedPath && space) {
      pokes[noun][predicate](
        urbit,
        selectedHostSpace,
        withOverrides({
          extension: formatImplicitExtension(formData.name),
          from: Date.now(),
          by: ship,
          permissions: null,
          toPath,
          fromPath,
        }),
        ship
      );
    }
    // console.log('formAction', formAction);
    // console.log('formData', formData);
  };

  useEffect(() => {
    if (selectedRelativePath)
      initFormData({
        fromPath: selectedRelativePath,
        toPath: selectedRelativePath,
        name: selectedRelativePath.length
          ? selectedRelativePath.slice().split('/').pop()
          : '',
        description: '',
        permissions: '',
        url: '',
        extension: '',
        from: '',
        by: '',
        // by: window.ship,
        id: '',
      });
  }, [selectedRelativePath]);

  const getPathDefaults = (field) => {
    if (field.name === 'toPath') return selectedPath;
    if (field.name === 'fromPath') return selectedPath;
    return formData[field.name] || '';
  };
  const getValue = (field, action) => {
    const [predicate] = action?.slice().split('-');

    switch (field.name) {
      case 'fromPath':
      case 'toPath':
        return predicate !== 'move' && predicate !== 'rem'
          ? `/${selectedRelativePath}`
          : formData[field.name];
      default:
        return formData[field.name];
    }
  };
  // TODO: Align styling with other components
  const createInputComponents = (fieldsByAction, handleChange) => {
    return (action) => {
      const fields = fieldsByAction[action]?.fields || [];
      return fields.length
        ? fields.map((field) => {
            const addProps = field.disabled ? { disabled: true } : {};
            return (
              <TextField
                key={field.name}
                id={`gen-form-action-${action}`}
                label={field.label}
                placeholder={getPathDefaults(field)}
                value={getValue(field, action)}
                onChange={(evt) => handleChange(field.name, evt.target.value)}
                {...addProps}
                sx={{
                  m: 1,
                  minWidth: 120,
                  fontFamily: 'Rubik',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '14px',
                  gap: '2px',
                }}
              ></TextField>
            );
          })
        : null;
    };
  };
  const generateInputComponents = createInputComponents(
    fieldsByAction,
    handleChange
  );

  return (
    <div
      style={{
        m: 1,
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        gap: '2px',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="gen-form-action">Action: </InputLabel>
        <Select
          native
          value={formAction}
          onChange={(event) => handleSetAction(event.target.value)}
          input={<OutlinedInput label="Action" id="gen-form-action" />}
        >
          <option aria-label="None" value="" />
          {fieldsByAction &&
            toPairs(fieldsByAction).map(([key, val]) => {
              return (
                <option key={key} value={key}>
                  {val.heading}
                </option>
              );
            })}
        </Select>
      </FormControl>

      {formAction &&
        formData &&
        selectedPath &&
        generateInputComponents(formAction)}
      <button
        onClick={(evt) => {
          evt.preventDefault();
          handleSubmit(evt);
        }}
      >
        Submit{' '}
      </button>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          handleClose(evt);
        }}
      >
        Exit{' '}
      </button>
    </div>
  );
};
