import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['_graphql/schema.gql'],
    documents: 'apps/randem-frames/src/graphql/**/*.gql',
    generates: {
        'apps/randem-frames/src/graphql/_generated/types.ts': {
            plugins: ['typescript'],
        },
        'apps/randem-frames/src/graphql/_generated/': {
            plugins: ['typescript-operations', 'typescript-apollo-angular'],
            config: {
                addExplicitOverride: true,
                skipTypename: true,
            },
            preset: 'near-operation-file',
            presetConfig: {
                baseTypesPath: 'types',
            },
        },

        '_graphql/introspection.json': {
            plugins: ['introspection'],
            config: {
                // minify: true
                schemaDescription: false,
            },
        },
    },
};

export default config;
