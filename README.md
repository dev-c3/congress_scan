# Congress Data App

## Overview

The **Congress Data App** is a web application built using **Next.js**, **React**, and **Chakra UI**. It allows users to access information about members of the United States Congress, retrieve data from external APIs, and store updates in a **Supabase** database.

## Features

1. **Member Information**:
   - Users can search for specific members of Congress by name, state, or other criteria.
   - The app retrieves data from the **Congress API** to display detailed information about each member.

2. **Data Exchange**:
   - The app communicates with multiple APIs:
     - **Congress API**: Provides member data.
     - **Supabase API**: Handles database operations.
     - **External APIs** (e.g., news, social media): Enhances member profiles.

3. **User Interface**:
   - The UI components are designed using **Chakra UI**, providing a clean and responsive interface.
   - Components include member cards, search forms, and navigation menus.

## Architecture

1. **Frontend**:
   - Built with **Next.js** (a React framework).
   - Utilizes **Chakra UI** for styling and responsive design.
   - Components include:
     - Member search form
     - Member cards (displaying details like name, party, state, etc.)
     - Navigation menu

2. **Backend**:
   - The app communicates with the **Congress API** to fetch member data.
   - It also interacts with the **Supabase API** for data storage and retrieval.
   - Backend logic handles data transformation and validation.

3. **Workflow**:
   - User searches for a member.
   - The app queries the **Congress API** to retrieve member details.
   - If the member is not already in the database, their data is saved to **Supabase**.
   - Updates (e.g., new bills sponsored, committee assignments) trigger additional API calls and database updates.

## Getting Started

1. **Clone the Repository**:
   - Start by cloning the project repository to your local machine.

2. **Install Dependencies**:
   - Run `npm install` to install project dependencies.

3. **Environment Variables**:
   - Set up environment variables for API keys, Supabase credentials, etc.

4. **Run the App**:
   - Execute `npm run dev` to start the development server.
   - Access the app at `http://localhost:3000`.

## Future Enhancements

1. **User Authentication**:
   - Implement user accounts and authentication using **Supabase Auth**.

2. **Real-time Updates**:
   - Use **Supabase Realtime** to keep member data up-to-date.

3. **Additional APIs**:
   - Integrate external APIs (e.g., social media, financial disclosures) to enrich member profiles.

## Conclusion

The **Congress Data App** demonstrates how to build a robust web application that combines data from various sources, communicates with APIs, and leverages modern frontend technologies. Happy coding! 🚀
