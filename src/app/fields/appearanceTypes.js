import {
    STRING,
    TEXT,
} from './types';

export const TITLE = 'title';
export const PLAIN = 'plain';
export const MARKDOWN = 'markdown';
export const HTML = 'html';
export const NO_FORMAT = 'noFormat';

const TITLE_CHOICE = { id: TITLE, name: 'presentation.types.title' };
const PLAIN_CHOICE = { id: PLAIN, name: 'presentation.types.plain' };
const MARKDOWN_CHOICE = { id: MARKDOWN, name: 'presentation.types.markdown' };
const HTML_CHOICE = { id: HTML, name: 'presentation.types.html' };
const NO_FORMAT_CHOICE = { id: PLAIN, name: 'presentation.types.no_format' };

export const STRING_APPEARANCE_TYPES = [TITLE_CHOICE, PLAIN_CHOICE];
export const TEXT_APPEARANCE_TYPES = [MARKDOWN_CHOICE, HTML_CHOICE, NO_FORMAT_CHOICE];

export const appearanceTypesForFieldType = (type) => {
    switch (type) {
        case STRING:
            return STRING_APPEARANCE_TYPES;
        case TEXT:
            return TEXT_APPEARANCE_TYPES;
    }
    throw new Error(`Unsupported field type ${type}`);
}