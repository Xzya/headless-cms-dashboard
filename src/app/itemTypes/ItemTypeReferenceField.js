import React from 'react';
import { ReferenceField, TextField } from 'admin-on-rest';

const ItemTypeReferenceField = (props) => (
    <ReferenceField {...props}>
        <TextField source="attributes.name" />
    </ReferenceField>
)
ItemTypeReferenceField.defaultProps = {
    source: 'relationships.itemType.data.id',
    reference: 'item-types',
    addLabel: true,
};

export default ItemTypeReferenceField;