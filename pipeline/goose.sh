#!/bin/sh
set -e

echo "Running schema migrations..."
goose -dir ./pgdb/schema postgres $POSTGRES_URL up
echo "Schema migrations complete."