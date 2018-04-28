import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Field } from "redux-form";
import {
    FieldTitle,
    translate,
    required,
    minValue,
} from 'admin-on-rest';

import ToggleInput from '../input/ToggleInput';

const styles = {
    block: {
        margin: '1rem 0',
        maxWidth: 250,
    },
    value: {
        maxWidth: 100,
    },
    valuesContainer: {
        display: 'flex',
        alignItems: 'baseline',
    },
    separator: {
        marginLeft: 8,
        marginRight: 8,
    },
};

export const BETWEEN = "between";
export const AT_LEAST = "atLeast";
export const AT_MOST = "atMost";
export const EXACTLY = "exactly";

const renderValueField = ({ input, label, hintText, meta }) => (
    <TextField
        hintText={hintText}
        type="number"
        style={styles.value}
        errorText={meta.touched && meta.error}
        floatingLabelText={
            <FieldTitle
                label={label}
            />
        }
        {...input}
    />
)

const valueValidator = (value, _, props) => {
    return required(value, _, props) || minValue(0)(value, _, props);
}

class LengthValidationField extends Component {
    constructor(props) {
        super(props);

        this.currentLengthType = this.currentLengthType.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            type: this.currentLengthType(),
        };
    }

    currentLengthType() {
        let value = this.props.input.value;

        if (!value) {
            return null;
        }

        let hasMin = !!value.min;
        let hasMax = !!value.max;
        let hasEq = !!value.eq;

        if (hasMin && hasMax) {
            return BETWEEN;
        } else if (hasMin) {
            return AT_LEAST;
        } else if (hasMax) {
            return AT_MOST;
        } else if (hasEq) {
            return EXACTLY;
        }

        return BETWEEN;
    }

    handleToggle(event, value) {
        if (value) {
            this.setState({ type: BETWEEN });
        }
    }

    handleSelect(event, key, type) {
        this.setState({ type });
        this.props.input.onChange({ min: "", max: "", eq: "" });
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
                    defaultValue={{ min: "", max: "", eq: "" }}
                    onChange={this.handleToggle}
                    component={ToggleInput}
                />
                {input.value &&
                    <div>
                        <SelectField
                            value={type}
                            onChange={this.handleSelect}
                        >
                            <MenuItem value={BETWEEN} primaryText={
                                <FieldTitle
                                    label="validator.length.types.between"
                                />
                            } />
                            <MenuItem value={AT_LEAST} primaryText={
                                <FieldTitle
                                    label="validator.length.types.atLeast"
                                />
                            } />
                            <MenuItem value={AT_MOST} primaryText={
                                <FieldTitle
                                    label="validator.length.types.atMost"
                                />
                            } />
                            <MenuItem value={EXACTLY} primaryText={
                                <FieldTitle
                                    label="validator.length.types.exactly"
                                />
                            } />
                        </SelectField>

                        <div style={styles.valuesContainer}>
                            {(type == BETWEEN || type == AT_LEAST) &&
                                <Field
                                    name={source + ".min"}
                                    label="validator.length.values.min"
                                    hintText="min"
                                    component={renderValueField}
                                    validate={valueValidator}
                                />
                            }
                            {(type == BETWEEN) &&
                                <span style={styles.separator}>
                                    <FieldTitle
                                        label="validator.length.values.and"
                                    />
                                </span>
                            }
                            {(type == BETWEEN || type == AT_MOST) &&
                                <Field
                                    name={source + ".max"}
                                    label="validator.length.values.max"
                                    hintText="max"
                                    component={renderValueField}
                                    validate={valueValidator}
                                />
                            }
                            {(type == EXACTLY) &&
                                <Field
                                    name={source + ".eq"}
                                    label="validator.length.values.eq"
                                    hintText="eq"
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

LengthValidationField.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
};

LengthValidationField.defaultProps = {
    addField: true,
    options: {},
};

export default translate(LengthValidationField);
