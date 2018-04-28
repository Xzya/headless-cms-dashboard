import React from 'react';
import { ReferenceField, TextField } from 'admin-on-rest';

const FieldReferenceField = (props) => (
    <ReferenceField {...props}>
        <TextField source="attributes.label" />
    </ReferenceField>
)
FieldReferenceField.defaultProps = {
    label: 'resources.fields.fields.attributes.label',
    source: 'id',
    reference: 'fields',
    addLabel: true,
};

export default FieldReferenceField;
