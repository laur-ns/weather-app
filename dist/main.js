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

eval("async function getWeatherData(lat, lon) {\n  try {\n    const response = await fetch(\n      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=11ea4e799d422a52dbd686220ca6b1e9`,\n      { mode: 'cors' }\n    );\n    return response.json();\n  } catch (e) {\n    throw new Error(`Error occurred getting weather data: ${e}`);\n  }\n}\n\nasync function searchPlaces(searchText) {\n  try {\n    const response = await fetch(\n      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=pk.eyJ1IjoibGF1ci1ucyIsImEiOiJja3p6M3V2cjUwNmcyM2JtbHQydzA3NzdoIn0.qAES-URoq1Fe63KU3eCMmQ`,\n      { mode: 'cors' }\n    );\n    return response.json();\n  } catch (e) {\n    throw new Error(`Error occurred searching for place: ${e}`);\n  }\n}\n\ngetWeatherData();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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