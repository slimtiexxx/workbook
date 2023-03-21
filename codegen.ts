import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPHQL_URL,
  documents: './src/graphql/**/*.gql',
  generates: {
    'src/generated/graphql.tsx': {
      config: {
        withHooks: true,
        namingConvention: {
          transformUnderscore: true,
        },
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
