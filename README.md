![Ironhub logo](https://github.com/user-attachments/assets/b27d8d39-3f79-4c7d-9fae-32a4f89bebab)

# IronHub - Frontend Repository

This repository contains the frontend code for **IronHub**, a single-page application (SPA) built with **React.js**. It serves as the user interface for the platform, allowing Ironhack students to post in the forum, reply to others' posts, and manage their own. **IronHub connects Ironhackers**, enabling them to share and collaborate. **Sign up or log in to start exploring today!**  

                           
![Ironhub HomePage](https://github.com/user-attachments/assets/e330ac2f-8a8f-45d5-99dd-549c478ab72b)  

                               

## Installation
<details>
  <summary>Click to view Frontend Installation Instructions</summary>

  To install and run the **IronHub** frontend web app locally, follow these steps:

  1) Clone the Frontend Repository:
     ``bash
     git clone *frontend-repository-url*

  3) Navigate to the Project Directory:
     cd <frontend-directory>
  
  5) Install the required dependencies:
     npm install react react-router-dom axios cloudinary
  
      Required Dependencies:
         - react - Frontend library for building user interfaces.
         - react-router-dom - For handling navigation between pages.
         - axios - To make HTTP requests to the backend.
         - cloudinary - For image storage and retrieval

  4) Run the development server:
     npm run dev
     
</details>

## Features
- User Authentication: Sign-up, log-in, and log-out.
- Post Management: View, create, edit, and delete posts.
- Replies Management: View, create, edit, and delete replies.
- Filtering and Sorting: Easily browse posts by course, date, or title.
- User Profiles: Update personal details in your profile page.
  
## Technologies Used
- React.js: Frontend library for building user interfaces.
- React Router: For navigation between views.
- CSS: Custom styling for the app.
- Axios: For handling API requests to communicate with the backend.
- Cloudinary: For managing and hosting media files, such as images.


## Pages and Routes
<details>
  <summary>Click to view Pages and Routes</summary>
  
  1. **Homepage**  
     - **Path:** `/`  
     - **Description:** Displays a brief introduction to IronHub. Includes navigation to the "About" page and buttons for login/sign-up actions.  

  2. **About**  
     - **Path:** `/about`  
     - **Description:** Contains information about the platform and its creators. Provides links to sign-up and log-in pages.  

  3. **Sign-Up**  
     - **Path:** `/auth/signup`  
     - **Description:** A public page with a form to create an account.  

  4. **Log-In**  
     - **Path:** `/auth/login`  
     - **Description:** A public page where users can log in to the platform.  

  5. **Posts**  
     - **Path:** `/posts/`  
     - **Description:** Displays all posts with options to filter, sort, and search. Utilizes the **PostCard** component for each post.  

  6. **Create Post**  
     - **Path:** `/newpost`  
     - **Description:** A private page where users can create a new post.  

  7. **Post Details**  
     - **Path:** `/posts/:_id`  
     - **Description:** Displays the full details of a single post, including options for the owner to edit or delete the post. Below, the user can see replies to the post and can reply to them as well. The     owners of the replies can edit them too.
       
  8. **Profile**  
     - **Path:** `/:userId`  
     - **Description:** Shows the user's profile information and allows updates.  

  9. **Error Page**  
     - **Path:** `*`  
     - **Description:** Displays an error page for any undefined routes.  
</details>

## Components
<details>
  <summary>Click to view the components</summary> 

  - **AboutCard**: Displays info about the creators.
  - **Footer**: The bottom section of the app.
  - **Forms**: Handles login, signup, and post and reply creation and edition forms.
  - **IsPrivate**: Ensures access to certain pages for authenticated users.
  - **IsPublic**: Ensures access to certain pages for unauthenticated users.
  - **Navbar**: Navigation bar with links to various sections.
  - **Popups**: Modal dialogs for messages or confirmations.
  - **PostCard**: Displays a post summary.
  - **ProfileCard**: Shows user profile information.
  - **ReplyCard**: Displays a post reply.
  - **Searchbar**: Allows searching posts by title.

  These components are reusable and help maintain a modular structure.
</details>

**Credits**:  

- **IronHub was developed by**:
  - **Dani Di Donato**:
    - Github-link: https://github.com/didonatodani/
    - Linkedin-link: https://www.linkedin.com/in/dani-di-donato-web-dev/
  - **Nigel Ferreres**
    - Github-link: https://github.com/NigelFerrefe
    - Linkedin-link: https://www.linkedin.com/in/nigel-ferreres-felix 
  - **Piet-Hein Schouten**
    - Github-link: https://github.com/phsworks 
    - Linkedin-link: https://www.linkedin.com/in/piet-hein-schouten-4a2b451bb/
    
## Special thanks to:

### Ironhack Instructor: Marcel Bosch.
