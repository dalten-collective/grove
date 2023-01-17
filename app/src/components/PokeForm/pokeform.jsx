import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Container, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import toPairs from 'lodash/toPairs';
// import { RiUploadCloud2Line } from 'react-icons/ri';
// import { useTheme } from 'styled-components';

import { useStore } from '../../state/store';
import { useForm } from '../../state/form';
// import { getLookupTableAtSelectedPath } from '../../state/selectors';
import { useTrove } from '../../urbit/index';
import { formatImplicitExtension } from '../../utils/files';
import { fieldsByAction } from './fieldsByAction';
// import { FolderPlusContainer, SpaceInfoToolbar } from './styles';
import { getLeadingSlash, getActionStructure, getSelectedSpace } from './util';

const HIDE_DISABLED_FIELDS = true;
const INIT_NAME_AS_RELATIVE_PATH = true;

export const PokeForm = ({ selectedPath, handleClose }) => {
  const { urbit, ship, pokes } = useTrove();
  const selectedHostSpace = useStore((state) => state.selectedHostSpace);
  const itemPreviewPath = useStore((state) => state.itemPreviewPath);
  const selectedRelativePath = useStore((state) => state.selectedRelativePath);
  const {
    formAction,
    formData,
    setFormAction,
    setFormData,
    initFormData,
    skipInit,
    setSkipInit,
  } = useForm();
  useEffect(() => {
    if (itemPreviewPath?.length) {
      setFormData(
        'name',
        getImplicitName(itemPreviewPath, selectedRelativePath)
      );
      setFormAction('edit-node');
    }
    if (selectedRelativePath) {
      initFormData(getInitialFormData(selectedRelativePath));
    }
    // if (itemPreviewPath?.length) {
    //   initFormData(getInitialFormData(itemPreviewPath));
    // }
    return () => {
      setSkipInit(true);
    };
  }, [selectedRelativePath, selectedPath, itemPreviewPath]);
  // const lookupTableAtSelectedPath = useStore(getLookupTableAtSelectedPath);
  // const [uploadFileToggled, setUploadFileToggled] = useState(false);
  // const toggleUploadFile = () => {
  //   setUploadFileToggled(!uploadFileToggled);
  // };

  // TODO: move to util
  const withOverrides = (overrides) => ({
    ...formData,
    ...overrides,
  });

  const handleChange = (name, value) => {
    setFormData(name, value);
  };
  const handleSetAction = (action) => {
    setFormAction(action);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const space = getSelectedSpace(selectedPath, selectedHostSpace);
    const toPath = getLeadingSlash(formData.toPath);
    const fromPath = getLeadingSlash(formData.fromPath);
    const [predicate, noun] = getActionStructure(formAction);
    if (selectedPath && space) {
      console.log('selectedPath', selectedPath);
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
  };

  const getImplicitName = (_itemPreviewPath, _selectedRelativePath) => {
    return _itemPreviewPath?.length
      ? _itemPreviewPath.slice().split('/').pop()
      : INIT_NAME_AS_RELATIVE_PATH && _selectedRelativePath?.length
      ? _selectedRelativePath.slice().split('/').pop()
      : '';
  };
  const getImplicitAction = (_itemPreviewPath, _selectedRelativePath) => {
    // return _itemPreviewPath?.length
    //   ?
    if (_itemPreviewPath?.length) {
      setFormData(
        'name',
        getImplicitName(_itemPreviewPath, _selectedRelativePath)
      );
      setFormAction('edit-node');
      // return 'edit-node';
    }
  };

  // TODO: Move to useForm hook
  const getInitialFormData = (_selectedRelativePath) => {
    const initialFormData = {
      fromPath: _selectedRelativePath,
      toPath: _selectedRelativePath,
      name: getImplicitName(itemPreviewPath, _selectedRelativePath),
      description: '',
      permissions: '',
      url: '',
      extension: '',
      from: '',
      by: '',
      // by: window.ship,
      id: '',
    };
    return !skipInit ? initialFormData : { ...initFormData, ...formData };
  };

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
            return HIDE_DISABLED_FIELDS && field.disabled ? null : (
              <TextField
                key={field.name}
                id={`gen-form-action-${action}`}
                label={field.label}
                placeholder={getPathDefaults(field)}
                value={getValue(field, action)}
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    handleSubmit(evt);
                    handleChange(field.name, '');
                  }
                }}
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
    <Container
      sx={{
        m: 1,
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        gap: '2px',
      }}
    >
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="gen-form-action">Action: </InputLabel>
          <Select
            native
            value={formAction}
            onChange={(event) => handleSetAction(event.target.value)}
            input={<OutlinedInput label="Action" id="gen-form-action" />}
          >
            {/* <option aria-label="None" value="" /> */}
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
        <Button
          onClick={(evt) => {
            evt.preventDefault();
            handleSubmit(evt);
          }}
        >
          Submit
        </Button>
        <Button
          onClick={(evt) => {
            evt.preventDefault();
            setSkipInit(true);
            handleClose(evt);
          }}
        >
          Exit
        </Button>
      </Box>
    </Container>
  );
};
