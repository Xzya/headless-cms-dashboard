import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {
    FieldTitle,
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

export const URL = "url";
export const EMAIL = "email";
export const CUSTOM = "custom";

const renderValueField = ({ input, label, hintText, meta }) => (
    <TextField
        hintText={hintText}
        type="text"
        errorText={meta.touched && meta.error}
        floatingLabelText={
            <FieldTitle
                label={label}
            />
        }
        {...input}
    />
);

const valueValidator = (value, _, props) => {
    let regexpError = undefined;
    try {
        new RegExp(value);
    } catch (e) {
        regexpError = props.translate("validator.invalidRegexp");
    }

    return required(value, _, props) || regexpError;
}

class FormatValidationField extends Component {
    constructor(props) {
        super(props);

        this.currentFormatType = this.currentFormatType.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCustomPattern = this.handleCustomPattern.bind(this);

        this.state = {
            type: this.currentFormatType(),
        };
    }

    currentFormatType() {
        let value = this.props.input.value;

        if (!value) {
            return null;
        }

        let hasPredefinedPattern = !!value.predefinedPattern;
        let hasCustomPattern = !!value.customPattern;

        if (hasPredefinedPattern) {
            if (value.predefinedPattern == URL) {
                return URL;
            } else if (value.predefinedPattern == EMAIL) {
                return EMAIL;
            }
        }
        if (hasCustomPattern) {
            return CUSTOM;
        }

        return URL;
    }

    handleToggle(event, toggled) {
        if (toggled) {
            this.setState({ type: URL });
        }
    }

    handleSelect(event, key, type) {
        this.setState({ type });

        switch (type) {
            case URL:
                this.props.input.onChange({ predefinedPattern: URL, customPattern: null });
                break;
            case EMAIL:
                this.props.input.onChange({ predefinedPattern: EMAIL, customPattern: null });
                break;
            case CUSTOM:
                this.props.input.onChange({ predefinedPattern: null, customPattern: null });
                break;
        }
    }

    handleCustomPattern(event, value) {
        this.props.input.onChange({ customPattern: value });
    }

    render() {
        const { elStyle, label, input, source, resource } = this.props;
        const { type } = this.state;
        return (
            <div style={elStyle || styles.block}>
                <Field
                    name={source}
                    source={source}
                    label={label}
                    resource={resource}
                    defaultValue={{ predefinedPattern: URL, customPattern: null }}
                    onChange={this.handleToggle}
                    component={ToggleInput}
                />
                {input.value &&
                    <div>
                        <SelectField
                            value={type}
                            onChange={this.handleSelect}
                        >
                            <MenuItem value={URL} primaryText={
                                <FieldTitle
                                    label="validator.format.types.url"
                                />
                            } />
                            <MenuItem value={EMAIL} primaryText={
                                <FieldTitle
                                    label="validator.format.types.email"
                                />
                            } />
                            <MenuItem value={CUSTOM} primaryText={
                                <FieldTitle
                                    label="validator.format.types.custom"
                                />
                            } />
                        </SelectField>

                        <div>
                            {(type == CUSTOM) &&
                                <Field
                                    name={source + ".customPattern"}
                                    label="validator.format.values.customPattern"
                                    hintText="^(foo|bar)$"
                                    component={renderValueField}
                                    validate={valueValidator}
                                />
                            }
                        </div>

                    </div>
                }
            </div>
        );
    }
}

FormatValidationField.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
};

FormatValidationField.defaultProps = {
    addField: true,
    options: {},
};

export default translate(FormatValidationField);
