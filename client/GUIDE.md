# Github project management guide

## Preconditions

### 1. GIT

You'll need git so make sure to install it from [here](https://git-scm.com/downloads)

### 2. NodeJS

Install nodejs from [here](https://nodejs.org/uk/) if you don't have it installed yet

### 3. Angular

If you don't have Angular CLI installed globally, please consider installing it by running command `npm install -g @angular/cli`

## Workflow

### 1. Clone the repository

* Open terminal. Type following command to change the directory to the one you want the project to be in: 

```bash
cd <path>
```

For example:
```bash
cd C:\Users\User\Desktop
```

* Clone repository using following command:
```bash
git clone https://github.com/BlakkBerry/rank-boosting-website.git
```

### 2. Open project in your IDE/Text editor

You might see a branch name `main` somewhere in your IDE. For example in WebStorm it is in right bottom corner

* We will write frontend in this branch, server will be in the `server` branch

> Remark: You have to run next command __every time you start working on new feature__ to update your local repo
> ```shell
> git pull --all
> ```

* After changing the branch you should see our project structure
Don't forget to install required packages from __package.json__ by running command `npm install`

### 3. Preparation for work

* You have to make tasks in the future in the [issues](https://github.com/BlakkBerry/rank-boosting-website/issues) tab
To do so, click on the __New Issue__ button

There are some fields required to fill

1. Title - must shortly describe the issue, for example: `Create home-page component`
2. Description - shortly describe task in some details
3. Assignees - assign yourself if you are doing this task, otherwise leave it blank
4. Labels - add some labels which describe your task in a proper way
5. Projects - select the project for this task. __Never skip this field!!!__

* Before your hot codding proccess, please follow next steps

* You have to create your personal branch for each issue you are doing

* You have to use a branch prefix like `add/`, `update/`, `feature/`, `doc/` or `fix/` that represents the type of work you're doing + TaskID. For example: `fix/15`

* As soon as you came up with the name of your branch, you have to create and push your branch into repository
```bash
git checkout -b <branch name>

git push origin <branch name>
```

* Then check if you are inside your branch by running `git branch` and if you are not, do it by running `git checkout <branch name>`

* Now you can start writing code (and please, don't push thousands lines of code per one commit)

### 4. Push your code into your branch

* Once you finished your task, you can add changed files to the repository by running `git add .`

* Than you have to commit changes `git commit -m "<commit message>"`

* Push your code to your branch `git push origin <branch name>`

### 5. Making a pull request

* After you pushed your code, go to [branches page](https://github.com/BlakkBerry/rank-boosting-website/branches) and click on __New pull request__ button to the right of your task branch name

* Make sure to choose __base__: `main`/`server` and __compare__: `<your branch>`(arrow on top of the form)

There are some fields required to fill in the form

1. Title can be a full copy of your issue
2. __IMPORTANT!!!__ In description, link the pull request with an issue by simply __typing one of this words `close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved` and number of the issue. For example: `close #15`__
3. Reviewers - add a person(-s) who are going to review your code, in most of the cases it have to be a team lead, but it's not a big deal
4. Assignees - assign it to yourself 
5. Projects - select the project for this task. __Never skip this field!!!__

* Then press the button __Create pull request__

* In the [project board](https://github.com/BlakkBerry/rank-boosting-website/projects/1) you might see your issue and the pull request in a proper columns

* Wait for a code reviewer to check and test your code

* After code review, fortunately, your pull request will be merged and issue - closed. If something went wrong and issue was closed, it will be reopened for for further code processing

* Also, the your branch will be removed, so make sure you deleted it from your local repo by 'checkouting' main and running command `git branch -D <branch name>`, though it's not required

