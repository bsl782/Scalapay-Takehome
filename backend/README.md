# Scalapay Takehome Backend

This document a basic rundown on how to run the project.
## Project setup

```bash
$ pnpm install
```

You will need an environment variable setup to connect to the containerized MySQL database.

The project has a default port number of 3000 unless specified in the environment variables.


## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Usage Examples

### Product API
For detailed API usage examples including sample requests and responses, see [PRODUCT_USAGE_EXAMPLES.md](./PRODUCT_USAGE_EXAMPLES.md).
