
CREATE TABLE "Volcano_Data" (
	"Volcano_type" varchar(50)   NOT NULL,
	"Volcano_name" varchar(50)   NOT NULL,
	"Explositivity_index" int   NOT NULL,
    "Elevation" int   NOT NULL,
	"Status" varchar(50)   NOT NULL,
	"Deaths" int   NOT NULL,
    "Total_Deaths" int   NOT NULL,
    "Country" varchar(50)   NOT NULL,
	"Coordinates" varchar(50)   NOT NULL,
	"Year" int   NOT NULL,
    "Month" int   NOT NULL,
    "Day" int   NOT NULL,
    "Flag_Tsunami" varchar(10)   ,
    "Flag_Earthquake" varchar(10)
);

SELECT * FROM "Volcano_Data"