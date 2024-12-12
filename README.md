
![Ironhub logo](https://github.com/user-attachments/assets/724f186e-4735-4111-93c1-f33143e4ffe3)

# IronHub - Frontend

This repository contains the frontend code for **IronHub**, a single-page application (SPA) built with **React.js**. It serves as the user interface for the platform, allowing students to post in the forum, reply to others' posts, and manage their own. **IronHub connects Ironhackers**, enabling them to share and collaborate. **Sign up or log in to start exploring today!**

![Ironhub HomePage](https://github.com/user-attachments/assets/e330ac2f-8a8f-45d5-99dd-549c478ab72b)


## Features
- User Authentication: Sign-up, log-in, and log-out.
- Post Management: View, create, edit, and delete posts.
- Replies Management: View, create, edit, and delete replies.
- Filtering and Sorting: Easily browse posts by course, date, or title.
- User Profiles: Update personal details and manage user-specific posts.
  
## Technologies Used
- React.js: Frontend library for building user interfaces.
- React Router: For navigation between views.
- CSS: Custom styling for the app.
  
## Pages and Components:

### Pages
1. Homepage
   - Displays a brief introduction to IronHub.
   - Includes navigation to the "About" page and buttons for login/sign-up.
2. About
   - Contains information about the platform and its creators.
   - Provides links to sign-up and log-in pages.
3. Posts
   - Lists all posts with pagination or infinite scroll for better user experience.
   - Includes options to filter posts by course, sort by date, and search by title.
   - Each post is displayed using the **PostCard** component.
4. PostDetails
   - Displays the full details of a single post, including title, content, author, date, and comments (if applicable).
   - Includes "Edit" and "Delete" buttons for the post owner.
5. Profile
   - Displays the user's information (name, email, profile picture).
   - Allows users to update their details.
   - Includes links to view posts created by the user.
6. Create Post
   - A form for users to add new posts to the forum.
   - Includes fields such as title, description, course, and tags.
     
### Components
1. Navbar
   - Without logging in: Displays the logo, "About Us," and buttons for "Login" and "Sign-Up."
   - When logged in:
     - Displays the logo.
     - Includes a "Create Post" button.
     - Shows a dropdown menu with the user's name and profile picture.
       - Dropdown options:
         - **Profile**: Navigate to the user’s profile.
         - **Your Posts**: Navigate to the user’s posts.
         - **Log Out**: Log out the user.
2. PostCard
   - A reusable component to display individual posts.
   - Displays the post's title, description (truncated), author, and date.
   - Includes a button to view the full post.
3. Filters
   - Component for filtering and sorting posts on the "All Posts" page.
   - Includes radio buttons for course selection, sorting options, and a search bar for titles.
4. Forms
   - Used for both creating and editing posts.
   - Includes validation to ensure required fields are completed.
5. UserMenu
   - A dropdown menu in the navbar for profile access, user posts, and logging out.
   - Displays the user's name and profile picture when logged in.
