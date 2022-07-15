\echo 'Delete and recreate browser_app db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE browser_app;
CREATE DATABASE browser_app;
\connect browser_app

\i browser_app-schema.sql
\i browser_app-seed.sql

\echo 'Delete and recreate browser_app_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE browser_app_test;
CREATE DATABASE browser_app_test;
\connect browser_app_test

\i browser_app-schema.sql