import React from 'react';
import PropTypes from 'prop-types';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { get } from 'lodash';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldHint,
  Select,
  Option,
  Stack,
  Typography,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import pluginId from '../../pluginId';

const SelectorField = ({
  value,
  onChange,
  name,
  intlLabel,
  labelAction,
  required,
  attribute,
  hint,
  placeholder,
  disabled,
  error,
}) => {
  const { formatMessage } = useIntl();
  const { allLayoutData } = useCMEditViewDataManager();
  const pluginOptions = get(
    allLayoutData,
    `contentType.pluginOptions.${pluginId}`,
  );
  const tagsEnabled = !!pluginOptions;

  return (
    <Field
      name={name}
      id={name}
      error={error}
      required={required}
      hint={hint && formatMessage(hint)}
    >
      <Stack spacing={1}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>

        {!tagsEnabled ? (
          <Typography fontWeight="bold">
            Invalid scheme configuration
          </Typography>
        ) : (
          <Select
            placeholder={placeholder && formatMessage(placeholder)}
            aria-label={formatMessage(intlLabel)}
            aria-disabled={disabled}
            disabled={disabled}
            value={value || pluginOptions.defaultTag}
            onChange={(newValue) => {
              onChange({
                target: {
                  name,
                  value: newValue,
                  type: attribute.type,
                },
              });
            }}
          >
            {Object.keys(pluginOptions.tags).map((tagKey) => (
              <Option key={tagKey} value={tagKey}>
                {tagKey}
              </Option>
            ))}
          </Select>
        )}
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

SelectorField.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
};

SelectorField.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default SelectorField;
