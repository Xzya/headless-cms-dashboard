import React from 'react';
import {
    ReferenceManyField,
    TextField,
    Datagrid,
    EditButton,
    required,
} from 'admin-on-rest';

import FieldReferenceField from './FieldReferenceField';

const FieldReferenceManyField = (props) => (
    <ReferenceManyField {...props}>
        <Datagrid filter={{}}>
            <FieldReferenceField />
            <TextField source="attributes.fieldType" />
            <TextField source="attributes.apiKey" />
            <EditButton />
        </Datagrid>
    </ReferenceManyField>
)
FieldReferenceManyField.defaultProps = {
    reference: 'fields',
    target: 'itemTypeId',
    addLabel: false,
};

export default FieldReferenceManyField;