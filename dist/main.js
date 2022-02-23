/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("async function getWeatherData(lat, lon) {\n  try {\n    const response = await fetch(\n      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=11ea4e799d422a52dbd686220ca6b1e9`,\n      { mode: 'cors' }\n    );\n    if (!response.ok) {\n      throw new Error(\n        `${response.status} ${response.statusText} \\n Try a different search string`\n      );\n    }\n    return response.json();\n  } catch (e) {\n    console.log(e);\n    return null;\n  }\n}\n\nasync function searchPlaces(searchText) {\n  try {\n    const response = await fetch(\n      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?limit=5&autocomplete=true&types=country,place,address,region,postcode&access_token=pk.eyJ1IjoibGF1ci1ucyIsImEiOiJja3p6M3V2cjUwNmcyM2JtbHQydzA3NzdoIn0.qAES-URoq1Fe63KU3eCMmQ`,\n      { mode: 'cors' }\n    );\n    console.log(await response.json());\n    return response.json();\n  } catch (e) {\n    throw new Error('An error occured searching for a place.');\n  }\n}\n\nsearchPlaces('palmerston');\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;