import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'admin-on-rest';
import { Link } from 'react-router-dom';

import AddIcon from 'material-ui/svg-icons/content/add';

const styles = {
    flat: {
        overflow: 'inherit',
    },
};

class AddFieldButton extends Component {
    render() {
        const { record, translate } = this.props;
        const link = record ? `/fields/create?itemTypeId=${record.id}` : `/fields/create`;
        return (
            <FlatButton
                primary
                label={translate("item-type.action.add_field")}
                containerElement={<Link to={link} />}
                icon={<AddIcon />}
                style={styles.flat}
            />
        );
    }
}

AddFieldButton.propTypes = {
    record: PropTypes.object,
    translate: PropTypes.func,
};

export default translate(AddFieldButton);
