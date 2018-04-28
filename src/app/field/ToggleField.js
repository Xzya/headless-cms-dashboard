import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

import FalseIcon from 'material-ui/svg-icons/content/clear';
import TrueIcon from 'material-ui/svg-icons/action/done';

export const ToggleField = ({ source, record = {}, elStyle }) => {
    if (get(record, source) == null) {
        return <FalseIcon style={elStyle} />;
    }

    if (get(record, source) != null) {
        return <TrueIcon style={elStyle} />;
    }

    return <span style={elStyle} />;
};

ToggleField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureToggleField = pure(ToggleField);

PureToggleField.defaultProps = {
    addLabel: true,
    elStyle: {
        display: 'block',
        margin: 'auto',
    },
};

export default PureToggleField;
