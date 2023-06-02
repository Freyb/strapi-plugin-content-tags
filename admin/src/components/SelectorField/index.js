import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldHint,
  Select,
  Option,
  Loader,
  Stack,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import useConfig from '../../hooks/useConfig';

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
  // const { options = {} } = attribute;
  const { config, isLoading: configIsLoading } = useConfig();

  const { formatMessage } = useIntl();

  console.log('Tags', config);

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

        {configIsLoading ? (
          <Loader small>Loading content...</Loader>
        ) : (
          <Select
            placeholder={placeholder && formatMessage(placeholder)}
            aria-label={formatMessage(intlLabel)}
            aria-disabled={disabled}
            disabled={disabled}
            value={value}
            onChange={(newCountry) => {
              onChange({
                target: {
                  name,
                  value: newCountry,
                  type: attribute.type,
                },
              });
            }}
          >
            <Option value="">None</Option>
            {Object.entries(config.tags).map(([tagKey, tagProperties]) => (
              <Option key={tagKey} value={tagKey}>
                {tagProperties.label}
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
