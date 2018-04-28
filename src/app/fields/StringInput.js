import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
    TextInput,
    translate,
} from 'admin-on-rest';

import {
    requiredValidator,
    uniqueValidator,
    lengthValidator,
    formatValidator,
    enumValidator,
} from './validate';
import FieldValidatorHintField from './FieldValidatorHintField';

/**
 * An Input component for a string
 *
 * @example
 * <StringInput source="first_name" />
 *
 * You can customize the `type` props (which defaults to "text").
 * Note that, due to a React bug, you should use `<NumberField>` instead of using type="number".
 * @example
 * <StringInput source="email" type="email" />
 * <NumberInput source="nb_views" />
 *
 * The object passed as `options` props is passed to the material-ui <TextField> component
 */
export class StringInput extends Component {
    constructor(props) {
        super(props);

        this.validators = this.validators.bind(this);

        this.state = {
            validators: this.validators(),
        };
    }

    validators() {
        const { field } = this.props;
        const validators = field.attributes.validators;

        const requiredValue = validators.required;
        const uniqueValue = validators.unique;
        const lengthValue = validators.length;
        const formatValue = validators.format;
        const enumValue = validators.enum;

        let v = [];

        if (requiredValue != null) {
            v.push(requiredValidator(requiredValue));
        }
        if (uniqueValue != null) {
            v.push(uniqueValidator(uniqueValue));
        }
        if (lengthValue != null) {
            v.push(lengthValidator(lengthValue));
        }
        if (formatValue != null) {
            v.push(formatValidator(formatValue));
        }
        if (enumValue != null) {
            v.push(enumValidator(enumValue));
        }

        return v;
    }

    render() {
        const { field, source } = this.props;
        const { validators } = this.state;
        return (
            <div>
                <Field
                    name={`${source}.${field.attributes.apiKey}`}
                    label={field.attributes.label}
                    component={TextInput}
                    options={{ fullWidth: true }}
                    validate={validators}
                />
                <FieldValidatorHintField field={field} />
            </div>
        );
    }
}

StringInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    field: PropTypes.object,
};

StringInput.defaultProps = {
    addField: true,
    source: "attributes",
    onChange: () => { },
    options: {},
};

export default StringInput;
