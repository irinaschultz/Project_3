#Significant_Volcanic_Eruption_Database_visualisations Project

This project aims to visualise the Significant Volcanic Eruption Database is a global listing of over 500 significant eruptions which includes information on the latitude, longitude, elevation, type of volcano, and last known eruption. A significant eruption is classified as one that meets at least one of the following criteria: caused fatalities, a Volcanic Explosivity Index (VEI) of 6 or larger, caused a tsunami, or was associated with a major earthquake.


#Deployment of site

Landing page is deployed via (https://github.com/MinaliBheda/Project_3.git)

The dashboard can be interacted by clicking the volcano type from the dropdown menu which when done displays visulaizations regarding the selected Volcano type.

#Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


#Installation

Clone the repository to your local machine:
git clone https://github.com/MinaliBheda/Project_3.git



Run the cells in the notebook to load the data into local PostgreSQL database and create cleaned csv files as output.

For visualisation

Final visualisations can be seen from the landing page index.html and linked sites, charts.html and maps.html.

#Hypothesis

There is a spatial correlation between significant volcanic eruptions during the historical period of time and specific geographical features, or volcanic types.

This hypothesis suggests that there may be patterns or clustering of significant volcanic eruptions around certain geological or tectonic regions during the historical period of time. By examining the relationship between deaths and volcano names based on their volcano type, it allows us to explore the impact of different volcano types on fatalities. Additionally, comparing the elevations of different volcanoes based on their types provides insights into the variations in volcanic landforms and their association with specific volcano types.

#Data sources

The data was obtained from the https://public.opendatasoft.com. 
License belongs to U.S. Government Work
Last Data modification - June 18, 2019 9:54 PM
Publisher is the National Centers for Environmental Information
Reference https://www.ngdc.noaa.gov/nndc/struts/form?t=101650&s=1&d=1
Attributions: National Geophysical Data Center / World Data Service (NGDC/WDS): Significant Earthquake Database. National Geophysical Data Center, NOAA. doi:10.7289/V5TD9V7K
Built With


HTML/CSS
charts.js
Leaflet

#Authors

Gulcan 
Irina 
Liam 
Minali  

#Description of repository structure
Resources and  SQL folder:
Database extraction from csv file into the resource folder and loading into PostgreSQL database is done using SQL Tool of which Query is in Volcano_data.sql file in SQL folder.

Static folder contains all coding files:

Code for plotting charts and visualisine map are in logic.js inside 'js' folder.

To convert a CSV file to GEOJSON format, it was used  website: https://www.convertcsv.com. This website offers a straightforward solution for converting CSV data to GEOJSON format. To ensure the accuracy and integrity of data the output GEOJSON file was reviewed after the conversion process.

Database folder contains schema for PostgreSQL database, which is to be created locally.

The landing page index.html is to be deployed through the Python Flask (app.py) by running the command "flask run" in the terminal, which dispaly the interractive dashboard on the webpage.  

