---
tags: AJAX, OO-JS
languages: JavaScript, Rails, Ruby
type: lab
---

# Task Lister
This lab is going to follow a different format from your others.  Instead of being about passing all the tests provided and submitting a pull request when you've passed them, this lab will have series of MVP's (Minimal Viable Product).  Each MVP will have a list of criteria you need to complete before moving on to the next one.  ___There is no requirement for how many you need to complete to finish the lab.___  They're meant to serve as a guide onto how this project __should__ progress, and to you give a sense of how projects in general should progress incrementally.

##MVP 1 (Integrating your front end app with Rails.)
So you've made your front end version of the todo list. You're now going to incorporate that app into a Rails app.  The goal is to have a fully functioning, persitable app.  

That means you need to...
- Make a Rails App.
- Create Rails models with the correct associations.
- Integrate your HTML and CSS from the [JS-OO-Task-List](https://github.com/flatiron-school-students/js-oo-task-list-ruby-005) into your Rails app.
- Integrate your JS models and controllers into `app/assets/javascripts`
- Come up with a way to integrate your AJAX actions from your JS to rails with whatever type of response you want, JSON or rendered HTML.

##MVP 2 (Expanding your app from a one page app to a multiple page app.)
The goal is to have something along the lines of [Trello](https://trello.com/), but without users.  That means creating a Board model that will have many lists.

That means you need to...
- Create your Rails model, views, and controller.
- Create a new JS model and controller.
- Create a view that list of all the boards.
- Create a show page for each board that you can make and view a new list from. (Don't forget about the Tasks that need to be made on the page too).

##MVP 3 (Getting users on board.)
Now that you have an awesome version of your app its time to let users get in on it.  This part of the lab is more Rails heavy than JS.  You'll need to make a User model.  In Trello a user has many boards and many tasks.

That means you need to...
- Create a User class.
- Set up the correct associations.
- Create a view that displays all of a user's boards.
- Create or use an authentication and authorization system.