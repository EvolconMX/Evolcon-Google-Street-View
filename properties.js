// JavaScript
define( ["qlik", "jquery", "./pp-cl-about"], function (qlik, $) {
	"use strict";


    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 2,
        max: 2,
        items:{
            dynamicLabel: {
                type: "string",
                label: "Dynamic Label",
                ref: "qDef.dynamicLabel",
                expression: "always",
                defaultValue: ""
            }
        }
    };

    //var measures = {
    //    uses: "measures",
    //    min: 1,
    //    max: 1
    //};

    // *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    //var sorting = {
    //    uses: "sorting"
    //};


    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    // Text box definition

    var errorMessage = {
        ref: "props.errorMessage",
        label: "Error Message",
        type: "string",
        expression: "optional",
        defaultValue: "Please select only one route"
    };
	
	var myTextBox = {
		ref: "props.myTextBox",
		label: "My text box",
		
		type: "string"
	};
	
	var i={component:"EvolconAboutGSV",translation:"Common.About",show:!0},j={translation:"Common.About",type:"items",items:{about:i}};

	var header1_item1 = {
		ref: "props.myMedia",
		label: "Section 1 / Item 1",
		type : "items",
		expression: "optional",
		component: "accordion",
		//aboutPanel: e
	};
	
	var myCustomSection = {
		component: "expandable-items",
		label: "Header 1",
		items: {
			header1 :{
				type: "items",
				label: "Header 1",
				items: {
					header1_item1: header1_item1
				}
			}
		}
	};

    var appearanceSection = {
        uses: "settings" ,
        items: {
            myNewHeader: {
                type: "items",
                label: "Error Message",
                items: {
                    errorMessage: errorMessage
                }
            }
        }
    };

    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************


    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            //measures: measures,
            //sorting: sorting,
            appearance: appearanceSection,
			//customSection: myCustomSection,
			aboutPanel:j
			

        }
		/*paint: function ($element, layout) {
			//add your rendering code here
			$element.css("background-size","cover");
			$element.css("background","url("+layout.myMedia+") no-repeat left top fixed");
			$element.html( "props-media "+layout.myMedia );
		}*/
    };

} );
