import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ReferenceInput,
    SelectInput,
    GET_LIST,
    required,
} from 'admin-on-rest';
import get from 'lodash.get';

import { STRING, TEXT } from '../fields/types';
import restClient from '../apiClient';
import StringInput from '../fields/StringInput';
import { Field } from 'redux-form';

const itemTypeIdSource = "relationships.itemType.data.id";

class ItemField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [],
        };

        this.getItemTypeFields = this.getItemTypeFields.bind(this);
        this.handleItemTypeId = this.handleItemTypeId.bind(this);
    }

    componentDidMount() {
        this.getItemTypeFields();
    }

    componentDidUpdate() {
        console.log("did update")
    }

    getItemTypeFields = () => {
        const { record } = this.props;
        console.log(record)

        const itemTypeId = get(record, itemTypeIdSource);
        if (itemTypeId == null) {
            return;
        }

        const props = { target: 'itemTypeId', id: itemTypeId };
        restClient(GET_LIST, 'fields', props)
            .then((response) => {
                this.setState({ fields: response.data });
                console.log("got response", response);
            })
            .catch((e) => {
                console.error(e);
            })
    }

    inputForField(field) {
        if (field == null || field.attributes == null) {
            return null;
        }
        switch (field.attributes.fieldType) {
            case STRING: {
                return <StringInput key={field.attributes.apiKey} field={field} />;
            }
        }
        return null;
    }

    handleItemTypeId() {
        this.getItemTypeFields();
    }

    render() {
        const {
            record,
            source,
            elStyle,
            resource,
        } = this.props;
        const { fields } = this.state;

        const renderItemTypeField = (props) => (
            <ReferenceInput source={itemTypeIdSource} record={record} reference="item-types" resource={resource} validate={required} {...props} allowEmpty>
                <SelectInput optionText="attributes.name" />
            </ReferenceInput>
        )

        const renderFields = fields.map((field) => this.inputForField(field))
        return (
            <div>
                <Field name={itemTypeIdSource} onChange={this.handleItemTypeId} component={renderItemTypeField} />
                {renderFields}
            </div>
        );
    }
}

ItemField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    record: PropTypes.object,
};

ItemField.defaultProps = {
    record: {
        type: 'item',
        attributes: {},
    },
};

export default ItemField;