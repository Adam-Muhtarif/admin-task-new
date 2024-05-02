## Tools
- [Nestjs](https://docs.nestjs.com/)
- [Refine](https://refine.dev/)

# Task
Create an Admin Dashboard that manages a person's blog posts :
- They are able to create and list out all the posts
- They are able to create and list Categories of the posts (Optional)

Refine will be used to manage the posts, while nestjs is used to serve the data that is required for the admin dashboard
The communication between the Admin frontend and the backend is [Graphql](https://docs.nestjs.com/graphql/quick-start)

There is no need for any database and you can handle this within the nestjs (fake data in the backend)
But if you want, you can do [Prisma](https://docs.nestjs.com/recipes/prisma#set-up-prisma) with sqlite, very easy to setup

There is no need for deploying this project. Forking and showing the code would suffice.


## Bonus: Notifying Users About the Post
You can potentially add a notification system. Whenever a user has been created, the backend system would send a notification.
Use [Queue](https://docs.bullmq.io/)

Some Flow Inspiration: 
https://swimlanes.io/#fY49DsIwDIX3nMJbYYADZGCAGdTCCSr3gSxFsZQ4PX+r/kiRQIy2P3/vmViAp4eavIV7MY3OuVazvZBGYdDpQtXo6ZbQG5bdF9gVlBnJiMMCbPAwK68lhHu32/Y8E41tUkbOmsjTEwwZQfV9Tfn98U/niTVmDTgH/Ryauk9znAA=


Time Alotted : 2 weeks
