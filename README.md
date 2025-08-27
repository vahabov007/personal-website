Vahab Vahabov | Personal Website
Welcome to the GitHub repository for my personal portfolio website! This project serves as a real-world application to demonstrate my skills in web development, combining both backend and frontend technologies.

About the Project
This personal website is a dynamic platform that showcases my technical journey, skills, and projects. It's a single-page application built to be fully responsive and user-friendly, providing a comprehensive overview of my professional profile. It also features an interactive contact form that allows direct communication.

Website Sections
About Me: Learn about my background, education, and passion for software development.

My Skills: Explore the programming languages, frameworks, and technologies I have experience with, including detailed pop-up modals for each skill.

Language Skills: See the languages I can communicate in and my proficiency level.

Get in Touch: A user-friendly contact form that allows visitors to send messages directly to my email.

What’s New (Latest Updates)
Projects Section: The new "My Projects" section is now live! It features my key projects, complete with brief descriptions and embedded video demos to showcase their functionality.

Technical Stack & Functionality
This project is a testament to my ability to build a full-stack application from the ground up, with a strong focus on clean architecture and robust functionality.

Backend
Core Technology: Java with Spring Boot.

APIs: Developed RESTful APIs for managing contact form submissions.

Architecture: Follows the Model-View-Controller (MVC) design pattern.

Email Integration: Integrated Spring Boot Mail to send messages from the contact form directly to my email address.

Frontend
Markup: HTML5 with Thymeleaf for server-side rendering.

Styling: CSS3 and Tailwind CSS for a modern, responsive design.

Interactivity: JavaScript for dynamic elements, animations (typewriter effect), and form validation.

Database & Hosting
Database: PostgreSQL to store contact form messages and other data.

Hosting: Deployed and managed on Render.com.

Containerization: Docker support for easy, environment-independent deployment.

Domain: Hosted at www.vahabvahabov.site.

Core Features
Responsive Design: The layout is fully responsive and looks great on all devices (mobile, tablet, and desktop).

Smooth Animations: Integrated CSS and JavaScript for smooth transitions, hover effects, and a custom divider line animation.

SEO Optimization: The site is optimized for search engines with a sitemap.xml file and detailed meta tags.

Interactive Modals: Clicking on a skill card triggers a pop-up modal with more information about that skill.

How to Run Locally
If you'd like to run this project on your local machine, follow these steps:

Clone the repository:

Bash

git clone https://github.com/vahabov007/personal-website.git
cd personal-website
Set up the environment:

Ensure you have Java (JDK 17 or higher) and Maven installed.

Configure your PostgreSQL database and update the database connection properties in src/main/resources/application.properties.

Run the application:

Bash

# From the project's root directory
mvn spring-boot:run
The application will start on http://localhost:8080.

Feedback & Contributions
Your feedback is highly valued! If you have any suggestions, bug reports, or ideas for new features, please open an issue in this repository.
