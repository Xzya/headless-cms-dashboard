import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextFieldHint from '../components/TextFieldHint';

const RequiredField = () => (
    <TextFieldHint
        key="required"
        label='validator.hints.required'
    />
);

const UniqueField = () => (
    <TextFieldHint
        key="unique"
        label='validator.hints.unique'
    />
);

const LengthBetweenField = ({ min, max }) => (
    <TextFieldHint
        key="length"
        label='validator.hints.length_between'
        labelProps={{ min: min, max: max }}
    />
);
const LengthAtLeastField = ({ min }) => (
    <TextFieldHint
        key="length"
        label='validator.hints.length_at_least'
        labelProps={{ min: min }}
    />
);
const LengthAtMostField = ({ max }) => (
    <TextFieldHint
        key="length"
        label='validator.hints.length_at_most'
        labelProps={{ max: max }}
    />
);
const LengthExactlyField = ({ eq }) => (
    <TextFieldHint
        key="length"
        label='validator.hints.length_exactly'
        labelProps={{ eq: eq }}
    />
);

const FormatEmailField = () => (
    <TextFieldHint
        key="format"
        label='validator.hints.format_email'
    />
);

const FormatURLField = () => (
    <TextFieldHint
        key="format"
        label='validator.hints.format_url'
    />
);

const FormatCustomPatternField = ({ pattern }) => (
    <TextFieldHint
        key="format"
        label='validator.hints.format_custom'
        labelProps={{ pattern: pattern }}
    />
);

const EnumField = ({ values }) => (
    <TextFieldHint
        key="enum"
        label='validator.hints.enum'
        labelProps={{ values: JSON.stringify(values) }}
    />
);

class FieldValidatorHintField extends Component {

    static propTypes = {
        field: PropTypes.object.isRequired,
        elStyle: PropTypes.object,
    };

    static defaultProps = {
        elStyle: {},
    }

    render() {
        const { field, elStyle } = this.props;

        let fields = [];

        const validators = field.attributes.validators;

        const requiredValue = validators.required;
        const uniqueValue = validators.unique;
        const lengthValue = validators.length;
        const formatValue = validators.format;
        const enumValue = validators.enum;

        if (requiredValue != null) {
            fields.push(RequiredField());
        }
        if (uniqueValue != null) {
            fields.push(UniqueField());
        }
        if (lengthValue != null) {
            if (lengthValue.min != null && lengthValue.max != null) {
                fields.push(LengthBetweenField({ min: lengthValue.min, max: lengthValue.max }));
            } else if (lengthValue.min != null) {
                fields.push(LengthAtLeastField({ min: lengthValue.min }));
            } else if (lengthValue.max != null) {
                fields.push(LengthAtMostField({ max: lengthValue.max }));
            } else if (lengthValue.eq != null) {
                fields.push(LengthExactlyField({ eq: lengthValue.eq }));
            }
        }
        if (formatValue != null) {
            if (formatValue.predefinedPattern != null) {
                switch (formatValue.predefinedPattern) {
                    case EMAIL:
                        fields.push(FormatEmailField());
                        break;
                    case URL:
                        fields.push(FormatURLField());
                        break;
                }
            } else if (formatValue.customPattern != null) {
                fields.push(FormatCustomPatternField({ pattern: formatValue.customPattern }));
            }
        }
        if (enumValue != null) {
            fields.push(EnumField({ values: enumValue.values }));
        }

        return (
            <div style={elStyle}>{fields}</div>
        );
    }
}

export default FieldValidatorHintField;