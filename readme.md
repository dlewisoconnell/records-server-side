# Danny's Record Collection (Server-Side Version)

This project is a full-stack application that displays and analyzes Danny's record collection. It provides a user interface to browse through the records, view statistics, and see information about the collection.

## Features

- Display of record collection: The web application presents a table that shows the title, artist, release year, and format of each record in Danny's collection. The table is populated dynamically using data from a JSON file.
- Navigation: Users can navigate through the record collection using "Previous" and "Next" buttons. The "Previous" button is disabled when viewing the first record.
- Statistics: The application displays statistics about the record collection. It shows the total number of records and presents a chart that visualizes the distribution of records by year. Additionally, it provides a table with the most frequent artists in the collection, along with the number of records for each artist.

## Technologies Used

- HTML: The project uses HTML for structuring the web page and defining its content.
- CSS: The project includes a separate CSS file (`styles.css`) for applying styles to the HTML elements.
- JavaScript: The project utilizes JavaScript to handle the dynamic behavior of the web page, including record navigation, statistics generation, and chart rendering.
- Node.js: The back-end server is developed using Node.js, which provides a runtime environment for executing JavaScript code on the server-side.
- Express.js: The Express.js framework is used to create the server and handle API requests. It simplifies the process of building robust and scalable web applications.
- Chart.js: The Chart.js library is utilized to generate interactive and visually appealing charts for displaying the distribution of records by release year.
- JSON: The record data is stored in a JSON file and accessed through an API endpoint provided by the server.
- CORS: The server is configured to enable Cross-Origin Resource Sharing (CORS), allowing the web application to request data from different origins.

### Instructions

1. Ensure you have Node.js installed on your system.

2. Install the project dependencies by running the following command in the project directory:
   ```
   npm install
   ```

3. Start the server by running the following command:
   ```
   node server.js
   ```

   The server will start listening on port 3000.

4. Navigate to `index.html` to access the project's front-end.

### Project Structure

- `index.html`: This file contains the HTML structure of the record collection page. It includes various elements such as buttons, tables, and charts.

- `styles.css`: This file contains the CSS styles for the record collection page.

- `server.js`: This file serves as the backend server for the project. It enables CORS and provides an API endpoint `/api/records` to retrieve the record data from the `records.json` file.

- `records.json`: This file contains the record data in JSON format. Modify this file or replace it with your own record data to customize the collection.

### Usage

- Pagination: Click the "Previous" and "Next" buttons to navigate through the records.

- Sorting: Click on the table headers (Title, Artist, Release Year, Format) to sort the records based on the selected column. The sort order is indicated by an arrow (▲ for ascending, ▼ for descending).

- Statistics: The "Total Records" section displays the total number of records in the collection.

- Records By Year: The chart shows the number of records released per year.

- Most Frequent Artists: The table displays the artists with the highest number of records in the collection.
