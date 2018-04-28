import React from 'react';
import PropTypes from 'prop-types';
import {
    required,
    minLength,
    maxLength,
    regex,
    email,
    choices,
    translate,
} from 'admin-on-rest';
import { EMAIL, URL } from './FormatValidationField';
import TextFieldHint from '../components/TextFieldHint';

export const requiredValidator = (_) => {
    return required;
};

// TODO: - replace with server side validate
export const uniqueValidator = (_) => (value, _, props) => undefined;

export const lengthValidator = (validator) => {
    const { min, max, eq } = validator;
    return (value, _, props) => {
        let error = undefined;
        if (min != null) {
            error = error || minLength(min)(value, _, props);
        }
        if (max != null) {
            error = error || maxLength(max)(value, _, props);
        }
        if (eq != null) {
            error = error || minLength(eq)(value, _, props) || maxLength(eq)(value, _, props);
        }
        return error;
    };
};

// TODO: - replace with server side validate
const urlRe = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
export const formatValidator = (validator) => {
    const { predefinedPattern, customPattern } = validator;
    return (value, _, props) => {
        if (predefinedPattern != null) {
            switch (predefinedPattern) {
                case URL:
                    try {
                        return regex(new RegExp(urlRe), "validator.invalid_expression_format")(value, _, props);
                    } catch (e) {
                        return e;
                    }
                case EMAIL:
                    return email(value, _, props);
            }
        }
        if (customPattern != null) {
            try {
                return regex(new RegExp(customPattern), "validator.invalid_expression_format")(value, _, props);
            } catch (e) {
                return e;
            }
        }
        return undefined;
    };
};

export const enumValidator = (validator) => {
    const { values } = validator;
    return (value, _, props) => {
        return choices(values, "validator.invalid_expression_enum")(value, _, props);
    };
};
