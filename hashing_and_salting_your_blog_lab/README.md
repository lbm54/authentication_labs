Transition your blog to use hashing/salting for password storage and authentication.

This will entail making changes to:

The database (users table; need a column for the hash)
The verification callback in the local strategy setup code
Any place where you create a user from code (hash/salt the plain-text password, and store the resulting value in the row in the database)