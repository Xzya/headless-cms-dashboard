import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import {
    FieldTitle,
    SelectArrayInput,
    translate,
    required,
} from 'admin-on-rest';
import {
    Field,
} from 'redux-form';

import ToggleInput from '../input/ToggleInput';

const styles = {
    block: {
        margin: '1rem 0',
        maxWidth: 250,
    },
};

const isEmpty = value =>
    typeof value === 'undefined' || value === null || value === '' || value.length === 0;

const valueValidator = (value, _, props) => {
    return isEmpty(value) ? props.translate('aor.validation.required') : undefined;
}

const EnumValidationField = ({ elStyle, label, input, source, resource }) => (
    <div style={elStyle || styles.block}>
        <Field
            name={source}
            source={source}
            label={label}
            resource={resource}
            defaultValue={{ values: [] }}
            component={ToggleInput}
        />
        <div>
            {input.value &&
                <Field
                    name={source + ".values"}
                    label="validator.enum.values.values"
                    component={SelectArrayInput}
                    validate={valueValidator}
                />
            }
        </div>
    </div>
)

EnumValidationField.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
};

EnumValidationField.defaultProps = {
    addField: true,
    options: {},
};

export default translate(EnumValidationField);
