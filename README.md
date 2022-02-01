# Get up and running!

## Clone the git respository

`git init`

`git clone https://github.com/LiteralGoat/fullstack-sandbox.git`

## Install dependencies

`npm run dependencies`

## Start the app

`npm run serve`

# My process

## Tasks finished

- [x] Persist the todo lists on the server. Persisting in a database is not required. (Simple js structures on the server is fine). If you do go for an actual DB (again not required), be sure to include instructions of how to get it up and running. **<a id="main">Main task</a>.**
- [x] Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality) **<a id="autosave">Autosave</a>.**
- [x] Make it possible to indicate that a todo is completed. **<a id="checkbox">Checkbox</a>.**

## Starting off

First I checked out the code given to me after skimming the tasks. One huge pain point was the saving process since I was so used to saving being automated. Another one was that my task list had no way of showing me whether I had finished a task. Therefore the [auto save](#auto-save) and [checkbox](#checkbox) tasks felt appropriate, aside from the main task.

## Solving the [main](#main) task

To connect the backend with the frontend I decided create an api for fecthing and posting the todo data. First however there needed to be a way to store the data. I solved this using `fs.writeFile()` and `fs.readFile()`. For the frontend to be able to get the data I simply created a `fetch()` inside a useEffect hook inside the component where the data was loaded. I had some troubles using fetch to post data to the backend (I'm not 100% sure this is possible) so I decided to use `axios.post()` which significantly simplified the syntax. I did not spend time converting the fetch to axios due to the time constraint and since I felt it worked fine as is.

## Solving the [checkbox](#checkbox) task

According to the task description the important thing was to indicate that the task was completed. Since I'm not too familiar with Material UI I decided to simply use one of their [checkbox components](https://mui.com/components/checkboxes/). To know whether the task had completed or not I decided to make the todo item, inside the array, into an object which had the `name` and `checked` properties, reusing the previous setup and some destructuring.

## Solving the [autosave](#autosave) task

This one was a little more tricky. First I was thinking of using `setInterval`. However, this would save partial messages in the case where the user decides to leave the page before the interval finishes. `onBlur` was also an option, but this would not encapsulate deleting or adding tasks; fundamental parts of the app's CRUD operations. Then I would also have to add more complexity to fix these issues. Finally I decided to update the data at the same frequency that the user types it in. It was the simplest solution. The exclusion of issues like costs per operation or large amounts of data in each update, affecting performance, made this a viable option.

Going with this option, it was implemented using the `useEffect` hook with `todos` as a dependency, which would cause it to fire every time todos is updated.

# Sellpy Sandbox

Welcome to the Sellpy Sandbox environment for fullstack development!

Start by forking the repository.

## Prerequisites

NodeJS - https://nodejs.org/en/download/

## Getting started

### To start the backend:

- Navigate to the backend folder
- Run 'npm ci'
- Run 'npm start'

### To start the frontend:

- Navigate to the frontend folder
- Run 'npm ci'
- Run 'npm start'

A browsertab will automatically open and load the app.

### Development set-up

If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com). We've also had some ESLint rules set up which will help you catch bugs etc. If you're using VSCode, install the regular [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go!

You can open the root folder in one workspace, or `/frontend` and `/backend` in seperate workspaces - both should work fine.

## Assignment

Your assignment is to improve this todo list application. At the moment the application is simple and can only create and remove todos.
As is, nothing is persisted in the server. As a result all state is cleared when refreshing the page!
Below follows one main task and 4 additional tasks. Your assignment is to complete the main task together with at least 2 out of 4 of the additional tasks.
If you feel constrained by time (which is totally fine!), prioritize quality over quantity.

### Main Task

Persist the todo lists on the server. Persisting in a database is not required. (Simple js structures on the server is fine). If you do go for an actual DB (again not required), be sure to include instructions of how to get it up and running.

### Additional tasks

- Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality)
- Make it possible to indicate that a todo is completed.
- Indicate that a todo list is completed if all todo items within are completed.
- Add a date for completion to todo items. Indicate how much time is remaining or overdue.

## Submission

Send a link to your forked repository to your contact person at Sellpy.
