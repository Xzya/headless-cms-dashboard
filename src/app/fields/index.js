import React from 'react';
import {
    BooleanField,
    BooleanInput,
    CheckboxGroupInput,
    ChipField,
    Create,
    Datagrid,
    DateField,
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
    ReferenceField,
    ReferenceInput,
    TextField,
    TextInput,
    TabbedForm,
    FormTab,
    Toolbar,
    minValue,
    number,
    required,
    translate,
} from 'admin-on-rest'; // eslint-disable-line import/no-unresolved
import { DependentField, DependentInput } from 'aor-dependent-input';

import ItemTypeReferenceField from '../itemTypes/ItemTypeReferenceField';
import LengthValidationField from './LengthValidationField';
import FormatValidationField from './FormatValidationField';
import EnumValidationField from './EnumValidationField';
import ToggleInput from '../input/ToggleInput'
import ToggleField from '../field/ToggleField'
import {
    STRING,
    TEXT,
    TYPES,
} from './types';
import {
    TITLE,
    MARKDOWN,
    appearanceTypesForFieldType,
} from './appearanceTypes';

export { FieldIcon } from 'material-ui/svg-icons/action/book';

const FieldCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="field.action.save_and_show"
            redirect="edit"
            submitOnEnter={true}
        />
        <SaveButton
            label="field.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            raised={false}
        />
    </Toolbar>
);

export const FieldCreate = ({ ...props }) => (
    <Create {...props}>
        <TabbedForm
            toolbar={<FieldCreateToolbar />}
            defaultValue={{
                relationships: {
                    itemType: {
                        data: {
                            id: new URLSearchParams(props.location.search).get("itemTypeId")
                        }
                    }
                },
            }}
        >
            <FormTab label="field.form.summary">
                <ReferenceInput source="relationships.itemType.data.id" reference="item-types" validate={required} allowEmpty>
                    <SelectInput optionText="attributes.name" options={{ disabled: true }} />
                </ReferenceInput>
                <TextInput source="attributes.label" validate={required} />
                <SelectInput source="attributes.fieldType" choices={TYPES} defaultValue={STRING} validate={required} />
                <TextInput source="attributes.apiKey" validate={required} />
                <BooleanInput source="attributes.localized" />
            </FormTab>
            <FormTab label="field.form.validations">
                <DependentInput dependsOn="attributes.fieldType" value={STRING}>
                    <ToggleInput source="attributes.validators.required" defaultValue={null} />
                    <ToggleInput source="attributes.validators.unique" defaultValue={null} />
                    <LengthValidationField source="attributes.validators.length" defaultValue={null} />
                    <FormatValidationField source="attributes.validators.format" defaultValue={null} />
                    <EnumValidationField source="attributes.validators.enum" defaultValue={null} />
                </DependentInput>
                <DependentInput dependsOn="attributes.fieldType" value={TEXT}>
                    <ToggleInput source="attributes.validators.required" defaultValue={null} />
                    <LengthValidationField source="attributes.validators.length" defaultValue={null} />
                    <FormatValidationField source="attributes.validators.format" defaultValue={null} />
                </DependentInput>
            </FormTab>
            <FormTab label="field.form.presentation">
                <DependentInput dependsOn="attributes.fieldType" value={STRING}>
                    <SelectInput source="attributes.appearance.type" choices={appearanceTypesForFieldType(STRING)} defaultValue={TITLE} validate={required} />
                </DependentInput>
                <DependentInput dependsOn="attributes.fieldType" value={TEXT}>
                    <SelectInput source="attributes.appearance.type" choices={appearanceTypesForFieldType(TEXT)} defaultValue={MARKDOWN} validate={required} />
                </DependentInput>
                <TextInput source="attributes.hint" />
            </FormTab>
        </TabbedForm>
    </Create>
);

const FieldEditToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            redirect="edit"
            submitOnEnter={true}
        />
    </Toolbar>
);

const FieldTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('field.edit.title', { title: record.attributes.label }) : ''}
    </span>
));

export const FieldEdit = ({ ...props }) => (
    <Edit title={<FieldTitle />} {...props}>
        <TabbedForm defaultValue={{}} toolbar={<FieldEditToolbar />}>
            <FormTab label="field.form.summary">
                <ItemTypeReferenceField />
                <TextInput source="attributes.label" validate={required} />
                <TextField source="attributes.fieldType" />
                <TextInput source="attributes.apiKey" validate={required} />
                <BooleanInput source="attributes.localized" />
            </FormTab>
            <FormTab label="field.form.validations">
                <DependentInput dependsOn="attributes.fieldType" value={STRING}>
                    <ToggleInput source="attributes.validators.required" />
                    <ToggleInput source="attributes.validators.unique" />
                    <LengthValidationField source="attributes.validators.length" />
                    <FormatValidationField source="attributes.validators.format" />
                    <EnumValidationField source="attributes.validators.enum" />
                </DependentInput>
                <DependentInput dependsOn="attributes.fieldType" value={TEXT}>
                    <ToggleInput source="attributes.validators.required" />
                    <LengthValidationField source="attributes.validators.length" />
                    <FormatValidationField source="attributes.validators.format" />
                </DependentInput>
            </FormTab>
            <FormTab label="field.form.presentation">
                <DependentInput dependsOn="attributes.fieldType" value={STRING}>
                    <SelectInput source="attributes.appearance.type" choices={appearanceTypesForFieldType(STRING)} validate={required} />
                </DependentInput>
                <DependentInput dependsOn="attributes.fieldType" value={TEXT}>
                    <SelectInput source="attributes.appearance.type" choices={appearanceTypesForFieldType(TEXT)} validate={required} />
                </DependentInput>
                <TextInput source="attributes.hint" />
            </FormTab>
        </TabbedForm>
    </Edit>
);
