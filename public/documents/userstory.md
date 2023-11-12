# 14 Model-View-Controller (MVC): Tech Blog

## User Story

AS A developer who writes about tech

<span style="color:green;">I WANT a CMS-style blog site SO THAT I can publish articles, blog posts, and my thoughts and opinions</span>

## Acceptance Criteria

GIVEN a CMS-style blog site
WHEN I visit the site for the first time
<span style="color:green;">THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in</span>

WHEN I click on the homepage option
<span style="color:green;">THEN I am taken to the homepage</span>

WHEN I click on any other links in the navigation
<span style="color:green;">THEN I am prompted to either sign up or sign in</span>

WHEN I choose to sign up
<span style="color:green;">THEN I am prompted to create a username and password</span>

WHEN I click on the sign-up button
<span style="color:green;">THEN my user credentials are saved and I am logged into the site</span>

WHEN I revisit the site at a later time and choose to sign in
<span style="color:green;">THEN I am prompted to enter my username and password</span>

WHEN I am signed in to the site
<span style="color:green;">THEN I see navigation links for the homepage, the dashboard, and the option to log out</span>

WHEN I click on the homepage option in the navigation
<span style="color:green;">THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created</span>

WHEN I click on an existing blog post
<span style="color:green;">THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment</span>

WHEN I enter a comment and click on the submit button while signed in
<span style="color:green;">THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created</span>

WHEN I click on the dashboard option in the navigation
<span style="color:green;">THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post</span>

WHEN I click on the button to add a new blog post
<span style="color:green;">THEN I am prompted to enter both a title and contents for my blog post</span>

WHEN I click on the button to create a new blog post
<span style="color:green;">THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post</span>

WHEN I click on one of my existing posts in the dashboard
<span style="color:green;">THEN I am able to delete or update my post and taken back to an updated dashboard</span>

WHEN I click on the logout option in the navigation
<span style="color:green;">THEN I am signed out of the site</span>

WHEN I am idle on the site for more than a set time
<span style="color:green;">THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts</span>