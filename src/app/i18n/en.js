export default {
    resources: {
        posts: {
            name: 'Post |||| Posts',
            fields: {
                allow_comments: 'Allo comments?',
                average_note: 'Average note',
                body: 'Body',
                comments: 'Comments',
                commentable: 'Commentable',
                commentable_short: 'Com.',
                created_at: 'Created at',
                notifications: 'Notifications recipients',
                nb_view: 'Nb views',
                password: 'Password (if protected post)',
                pictures: 'Related Pictures',
                published_at: 'Published at',
                teaser: 'Teaser',
                tags: 'Tags',
                title: 'Title',
                views: 'Views',
            },
        },
        comments: {
            name: 'Comment |||| Comments',
            fields: {
                body: 'Body',
                created_at: 'Created at',
                post_id: 'Posts',
                author: {
                    name: 'Author',
                },
            },
        },
        users: {
            name: 'User |||| Users',
            fields: {
                name: 'Name',
                role: 'Role',
            },
        },
        'item-types': {
            name: 'Item-Type |||| Item-Types',
            fields: {
                attributes: {
                    id: 'ID',
                    name: 'Name',
                    apiKey: 'Item-Type Key',
                }
            },
        },
        'fields': {
            name: 'Field |||| Fields',
            fields: {
                attributes: {
                    id: 'ID',
                    label: 'Name',
                    apiKey: 'Field ID',
                    fieldType: 'Type',
                    hint: 'Help text',
                    localized: 'Enable localization on this field?',
                    validators: {
                        required: 'Required',
                        unique: 'Unique field',
                        length: 'Limit character count',
                        format: 'Match a specific pattern',
                        enum: 'Accept only specific values',
                    },
                    appearance: {
                        type: 'Presentation mode',
                    },
                },
                relationships: {
                    itemType: {
                        data: {
                            id: 'Item-Type'
                        }
                    }
                }
            },
        },
        'items': {
            name: 'Item |||| Items',
            fields: {
                attributes: {
                },
                relationships: {
                    itemType: {
                        data: {
                            id: 'Item-Type'
                        }
                    }
                }
            },
        },
    },
    post: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            body: 'Body',
            miscellaneous: 'Miscellaneous',
            comments: 'Comments',
        },
        edit: {
            title: 'Post "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
        },
    },
    comment: {
        list: {
            about: 'About',
        },
    },
    user: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            security: 'Security',
        },
        edit: {
            title: 'User "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
        },
    },
    'item-type': {
        form: {
            summary: 'Summary',
            fields: 'Fields',
        },
        edit: {
            title: 'Item-Type "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
            add_field: 'Add field',
        },
    },
    'field': {
        form: {
            summary: 'Summary',
            validations: 'Validations',
            presentation: 'Presentation',
        },
        edit: {
            title: 'Field "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
        },
        types: {
            string: 'Single-line string',
            text: 'Multiple-paragraph text',
        },
    },
    'validator': {
        invalidRegexp: 'Invalid regexp',
        invalid_expression_format: 'Invalid expression format',
        invalid_expression_enum: 'Invalid expression enum',
        hints: {
            required: 'This field is required.',
            unique: 'This field must be unique.',
            length_between: 'This field must be between %{min} and %{max} characters long.',
            length_at_least: 'This field must be at least %{min} characters long.',
            length_at_most: 'This field must be at most %{max} characters long.',
            length_exactly: 'This field must be exactly %{eq} characters long.',
            format_email: 'This field must match an email.',
            format_url: 'This field must match an url.',
            format_custom: 'This field must match the regexp: %{pattern}',
            enum: 'This field must match one of the values: %{values}',
        },
        length: {
            types: {
                between: 'Between',
                atLeast: 'At least',
                atMost: 'No more than',
                exactly: 'Exactly',
            },
            values: {
                min: 'Minimum *',
                max: 'Maximum *',
                eq: 'Exactly *',
                and: 'and',
            },
        },
        format: {
            types: {
                url: 'URL',
                email: 'Email',
                custom: 'Custom format',
            },
            values: {
                customPattern: 'Pattern',
            },
        },
        enum: {
            values: {
                values: 'Values',
            },
        }
    },
    'presentation': {
        types: {
            'title': 'Title',
            'plain': 'Normal string',
            'html': 'HTML Editor',
            'markdown': 'Markdown Editor',
            'no_format': 'No format',
        },
    },
};
