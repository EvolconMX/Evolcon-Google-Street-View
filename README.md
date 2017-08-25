# Evolcon Google Street View

This is an extension based on the Google Maps API. It displays two locations with Google Street functionality and the fastest bike route between them.

![alt text](https://user-images.githubusercontent.com/30984355/29733767-6d13e388-89b4-11e7-9193-e37c6474ed85.png)


## Installation

1. Download the latest version of Qlik Sense.
2. Download the extension ZIP file.
3. Qlik Sense Desktop - Unzip and copy the new folder here: C:\Users\XXXXX\Documents\Qlik\Sense\Extensions\
Qlik Sense Server - http://bit.ly/2voPCX2


## Configuration
This extension receives two dimensions: the origin and destination coordinates. In order to create these fields you can use the GeoMakePoint() function.

```
Origin:
LOAD 
	 Origin,
	 GeoMakePoint(Latitude, Longitude) AS Origin_GeoPoint;
LOAD * INLINE [
	Origin, Longitude, Latitude
    AAA,    -99.16164, 19.44111 
];
```

After creating the object, just add the two fields and configure the labels for each panel. You can use plain text or Qlik formulas.

![alt text](https://user-images.githubusercontent.com/30984355/29734694-609cb062-89b9-11e7-83bd-72b815ae3218.png)

By the way, there's a QVF in the ZIP package with a practical example!


## Author

Karl W. Pover (@karlpover)

Director - Evolcon

www.evolcon.com

![alt text](https://user-images.githubusercontent.com/30984355/29734838-2993985a-89ba-11e7-8967-67b05472a57c.png)
