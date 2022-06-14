module.exports = {
  client: {
    service: {
      name: 'Grinn',
      localSchemaFile: './data/schema.graphql',
    },
    includes: ['./**/*.graphql'],
  },
};
