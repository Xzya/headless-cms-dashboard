import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transitions from 'material-ui/styles/transitions';
import {
    translate,
} from 'admin-on-rest';

const styles = {
    text: {
        position: 'relative',
        bottom: 2,
        fontSize: 12,
        lineHeight: '12px',
        color: 'rgba(0, 0, 0, 0.298039)',
        transition: transitions.easeOut(),
    },
};

class TextFieldHint extends Component {
    static propTypes = {
        text: PropTypes.node,
        label: PropTypes.string,
        labelProps: PropTypes.object,
        elStyle: PropTypes.object,
    };

    static defaultProps = {
        text: null,
        label: null,
        labelProps: null,
        elStyle: {},
    }

    render() {
        const { text, label, labelProps, elStyle, translate } = this.props;
        return (
            <div style={Object.assign(styles.text, elStyle)}>
                {!!label ? translate(label, labelProps) : text}
            </div>
        );
    }
}

export default translate(TextFieldHint);