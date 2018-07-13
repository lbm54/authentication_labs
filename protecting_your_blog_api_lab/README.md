Explore the attached passport-enabled version of the Covalence React Boilerplate
Work on adding back-end authentication to the blog:
Should be able to login by sending a POST request to /api/auth/login that contains "email" and "password"
Should create tokens and respond with a token when you successfully login
Should protect certain routes in your API to require login
Should be able to attach the auth token as a Bearer token in Postman to test that authentication is working
Note that at this time, you do not need to worry about creating a login mechanism on your front-end. (But be advised, once you require login on your API routes, your blog will "stop working" because the requests will fail)