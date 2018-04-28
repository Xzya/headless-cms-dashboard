import { englishMessages } from 'admin-on-rest';

import customEnglishMessages from './en';

export default {
    en: { ...englishMessages, ...customEnglishMessages },
};
