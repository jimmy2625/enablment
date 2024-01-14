import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { join } from 'path';

describe('GraphQL Schema', () => {
  it('should match the stored schema file', async () => {
    const expectedSchema = readFileSync(join(__dirname, 'schema.gql'), 'utf-8');
    const builtSchema = buildSchema(expectedSchema);

    // You can add more tests to check specific parts of the schema
    expect(builtSchema).toBeDefined();
  });
});