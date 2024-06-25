export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
    graphqlUrl: 'http://localhost:3000/graphql', // local database
    // graphqlUrl: 'https://rafaelrandem.xyz/graphql', // VPS database
    logs: true,
    useLanguagePrefix: false,
    languages: {
        pl: 'http://localhost:4200',
        en: 'http://localhost:4201',
    },
};
