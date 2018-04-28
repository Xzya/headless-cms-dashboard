/* eslint react/jsx-key: off */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Admin, Resource, Delete } from 'admin-on-rest'; // eslint-disable-line import/no-unresolved

import addUploadFeature from './addUploadFeature';

import { UserList, UserEdit, UserCreate, UserIcon, UserShow } from './users';

import { ItemTypeList, ItemTypeCreate, ItemTypeEdit, ItemTypeShow, ItemTypeIcon } from './itemTypes';
import { ItemList, ItemCreate, ItemEdit, ItemShow, ItemIcon } from './items';
import { FieldList, FieldCreate, FieldEdit, FieldIcon } from './fields';

import data from './data';
import messages from './i18n';
import authClient from './authClient';
import apiClient from './apiClient';

render(
    <Admin
        authClient={authClient}
        restClient={apiClient}
        title="Headless CMS"
        locale="en"
        messages={messages}
    >
        {permissions => [
            <Resource
                name="item-types"
                list={ItemTypeList}
                create={ItemTypeCreate}
                edit={ItemTypeEdit}
                remove={Delete}
                icon={ItemTypeIcon}
                show={ItemTypeShow}
            />,
            <Resource
                name="fields"
                create={FieldCreate}
                edit={FieldEdit}
                remove={Delete}
                icon={FieldIcon}
            />,
            <Resource
                name="items"
                list={ItemList}
                create={ItemCreate}
                edit={ItemEdit}
                remove={Delete}
                icon={ItemIcon}
                show={ItemShow}
            />,
            permissions ? (
                <Resource
                    name="users"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                    remove={Delete}
                    icon={UserIcon}
                    show={UserShow}
                />
            ) : null,
            <Resource name="tags" />,
        ]}
    </Admin>,
    document.getElementById('root')
);
