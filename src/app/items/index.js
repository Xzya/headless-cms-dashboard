import React from 'react';
import {
    BooleanField,
    BooleanInput,
    CheckboxGroupInput,
    ChipField,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DateInput,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    ImageField,
    ImageInput,
    List,
    LongTextInput,
    NumberField,
    NumberInput,
    ReferenceArrayField,
    ReferenceManyField,
    ReferenceArrayInput,
    Responsive,
    RefreshButton,
    RichTextField,
    ReferenceInput,
    SaveButton,
    SelectArrayInput,
    SelectField,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleList,
    SingleFieldList,
    SimpleShowLayout,
    ListButton,
    ReferenceField,
    TabbedForm,
    TabbedShowLayout,
    Tab,
    FormTab,
    TextField,
    TextInput,
    Toolbar,
    minValue,
    number,
    required,
    translate,
} from 'admin-on-rest'; // eslint-disable-line import/no-unresolved
import FlatButton from 'material-ui/FlatButton';
import { CardActions } from 'material-ui/Card';

import FieldReferenceManyField from '../fields/FieldReferenceManyField';
import ItemField from './ItemField';

export { ItemIcon } from 'material-ui/svg-icons/action/book';

const titleFieldStyle = {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const ItemList = ({ ...props }) => (
    <List
        {...props}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.attributes.name}
                    secondaryText={record => record.attributes.apiKey}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="attributes.name" style={titleFieldStyle} />
                    <TextField source="attributes.apiKey" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const ItemCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="item-type.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        <SaveButton
            label="item-type.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            raised={false}
        />
    </Toolbar>
);

export const ItemCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm
            toolbar={<ItemCreateToolbar />}
            defaultValue={{
                type: 'item',
                attributes: {},
                relationships: {
                    itemType: {
                        data: {
                            type: 'item_type',
                            id: '',
                        }
                    }
                }
            }}
        >
            <ReferenceInput source="relationships.itemType.data.id" reference="item-types" validate={required} allowEmpty>
                <SelectInput optionText="attributes.name" />
            </ReferenceInput>
            <ItemField />
        </SimpleForm>
    </Create>
);

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ItemEditActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        <RefreshButton />
    </CardActions>
)

const ItemTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('item-type.edit.title', { title: record.attributes.name }) : ''}
    </span>
));

export const ItemEdit = ({ ...props }) => (
    <Edit title={<ItemTitle />} actions={<ItemEditActions />} {...props}>
        <TabbedForm defaultValue={{}}>
            <FormTab label="item-type.form.summary">
                <DisabledInput source="id" />
                <TextInput source="attributes.name" validate={required} />
                <TextInput source="attributes.apiKey" validate={required} />
            </FormTab>
            <FormTab label="item-type.form.fields">
                <FieldReferenceManyField />
            </FormTab>
        </TabbedForm>
    </Edit>
);

const ItemShowActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        <RefreshButton />
    </CardActions>
)

export const ItemShow = ({ ...props }) => (
    <Show title={<ItemTitle />} actions={<ItemShowActions />} {...props}>
        <TabbedShowLayout defaultValue={{}}>
            <Tab label="item-type.form.summary">
                <TextField source="id" />
                <TextField source="attributes.name" />
                <TextField source="attributes.apiKey" />
            </Tab>
            <Tab label="item-type.form.fields">
                <FieldReferenceManyField />
            </Tab>
        </TabbedShowLayout>
    </Show>
);
