# Evolcon Google Street View

This is an extension based on the Google Maps API. It displays two locations with the traditional Google Street functionality and the fastest bike route between them.

![alt text](https://user-images.githubusercontent.com/30984355/29733767-6d13e388-89b4-11e7-9193-e37c6474ed85.png)

### Installation

1. Download the latest version of Qlik Sense.
2. Download the extension ZIP file.
3. Qlik Sense Desktop - Unzip and copy the new folder here: C:\Users\XXXXX\Documents\Qlik\Sense\Extensions\
Qlik Sense Server - http://bit.ly/2voPCX2

### Configuration
This extension receives two

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

### Author

Karl W. Pover (@karlpover)

Director - Evolcon

www.evolcon.com
![alt text](https://user-images.githubusercontent.com/30984355/29734694-609cb062-89b9-11e7-83bd-72b815ae3218.png)
