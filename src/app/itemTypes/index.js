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
import AddFieldButton from './AddFieldButton';

export { ItemTypeIcon } from 'material-ui/svg-icons/action/book';

const titleFieldStyle = {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const ItemTypeList = ({ ...props }) => (
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

const ItemTypeCreateToolbar = props => (
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

export const ItemTypeCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm
            toolbar={<ItemTypeCreateToolbar />}
            defaultValue={{}}
        >
            <TextInput source="attributes.name" validate={required} />
            <TextInput source="attributes.apiKey" validate={required} />
        </SimpleForm>
    </Create>
);

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ItemTypeEditActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <AddFieldButton record={data} />
        <ShowButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        <RefreshButton />
    </CardActions>
)

const ItemTypeTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('item-type.edit.title', { title: record.attributes.name }) : ''}
    </span>
));

export const ItemTypeEdit = ({ ...props }) => (
    <Edit title={<ItemTypeTitle />} actions={<ItemTypeEditActions />} {...props}>
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

const ItemTypeShowActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <AddFieldButton record={data} />
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        <RefreshButton />
    </CardActions>
)

export const ItemTypeShow = ({ ...props }) => (
    <Show title={<ItemTypeTitle />} actions={<ItemTypeShowActions />} {...props}>
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
