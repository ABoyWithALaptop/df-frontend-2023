module.exports = {
  'bookStore-file': {
    input: 'https://develop-api.bookstore.dwarvesf.com/swagger/doc.json',
    output: {
      mode: 'tags-split',
      target: "./src/api/generated/bookStore.ts",
      schemas: "./src/api/generated/modal",
      client: "swr",
    },
    hooks: {
      afterAllFilesWrite: 'eslint ./src/api --ext .ts,.tsx,.js --fix', // run lint fix after all files are written
    }
  }
}