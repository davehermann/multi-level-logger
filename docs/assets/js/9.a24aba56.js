(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{353:function(t,a,e){"use strict";e.r(a);var o=e(42),i=Object(o.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"writing-logs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#writing-logs"}},[t._v("#")]),t._v(" Writing Logs")]),t._v(" "),e("h2",{attrs:{id:"logging-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#logging-functions"}},[t._v("#")]),t._v(" Logging Functions")]),t._v(" "),e("ul",[e("li",[t._v("Logging functions write to "),e("code",[t._v("console.log()")]),t._v(", except for calls to "),e("code",[t._v("Err")]),t._v(" and "),e("code",[t._v("Fatal")]),t._v(" which write to "),e("code",[t._v("console.error()")])]),t._v(" "),e("li",[e("em",[t._v("data")]),t._v(" accepts a string, or any object that converts with JSON.stringify()")]),t._v(" "),e("li",[e("em",[t._v("options")]),t._v(" overrides the "),e("RouterLink",{attrs:{to:"/generated/generated/Configuration.html#outputformatting-options"}},[t._v("OutputFormatting()")]),t._v(" settings for individual calls to a logging function")],1)]),t._v(" "),e("h3",{attrs:{id:"log-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#log-data-options"}},[t._v("#")]),t._v(" Log(data, options)")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Log()")]),t._v(" "),e("p",[t._v("Always write to the log no matter the configured log level")])]),t._v(" "),e("h3",{attrs:{id:"dev-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dev-data-options"}},[t._v("#")]),t._v(" Dev(data, options)")]),t._v(" "),e("h3",{attrs:{id:"trace-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#trace-data-options"}},[t._v("#")]),t._v(" Trace(data, options)")]),t._v(" "),e("h3",{attrs:{id:"debug-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#debug-data-options"}},[t._v("#")]),t._v(" Debug(data, options)")]),t._v(" "),e("h3",{attrs:{id:"info-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#info-data-options"}},[t._v("#")]),t._v(" Info(data, options)")]),t._v(" "),e("h3",{attrs:{id:"warn-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#warn-data-options"}},[t._v("#")]),t._v(" Warn(data, options)")]),t._v(" "),e("h3",{attrs:{id:"err-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#err-data-options"}},[t._v("#")]),t._v(" Err(data, options)")]),t._v(" "),e("h3",{attrs:{id:"fatal-data-options"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#fatal-data-options"}},[t._v("#")]),t._v(" Fatal(data, options)")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Parameter")]),t._v(" "),e("th",[t._v("Required")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Notes")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("data")]),t._v(" "),e("td",[t._v("yes")]),t._v(" "),e("td",[t._v("string | Record<string, unknown>")]),t._v(" "),e("td",[t._v("Data to write to the log")])]),t._v(" "),e("tr",[e("td",[t._v("options")]),t._v(" "),e("td",[t._v("yes")]),t._v(" "),e("td",[e("a",{attrs:{href:"#ilogoptions"}},[t._v("ILogOptions")])]),t._v(" "),e("td",[t._v("Additional options for controlling log output")])])])]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("The configured log level will write any messages at or above that level.")])]),t._v(" "),e("h2",{attrs:{id:"interfaces-for-log-writing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#interfaces-for-log-writing"}},[t._v("#")]),t._v(" Interfaces for Log Writing")]),t._v(" "),e("h3",{attrs:{id:"ilogoptions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ilogoptions"}},[t._v("#")]),t._v(" ILogOptions")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Parameter")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),e("th",[t._v("Notes")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("asIs")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),e("td",[t._v("Override the conversion of a Javascript "),e("em",[t._v("Object")]),t._v(" via "),e("em",[t._v("JSON")]),e("br"),t._v("  - "),e("em",[t._v("When passing in an "),e("strong",[t._v("object")]),t._v(" for the "),e("strong",[t._v("data")]),t._v(" property")])])]),t._v(" "),e("tr",[e("td",[t._v("configuration")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[e("a",{attrs:{href:"#ilogoptionconfiguration"}},[t._v("ILogOptionConfiguration")])]),t._v(" "),e("td",[t._v("Override formatting configuration")])]),t._v(" "),e("tr",[e("td",[t._v("logName")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("string")]),t._v(" "),e("td",[t._v("When multiple named logs are configured, write to this named log")])])])]),t._v(" "),e("h3",{attrs:{id:"ilogoptionconfiguration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ilogoptionconfiguration"}},[t._v("#")]),t._v(" ILogOptionConfiguration")]),t._v(" "),e("p",[e("strong",[t._v("Log writting configuration for the single message")])]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Parameter")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),e("th",[t._v("Notes")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("includeCodeLocation")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),e("td",[t._v("Show the code location when printing to the log")])]),t._v(" "),e("tr",[e("td",[t._v("includeTimestamp")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),e("td",[t._v("Show a timestamp when printing to the log")])]),t._v(" "),e("tr",[e("td",[t._v("jsonFormatter")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("number")]),t._v(" "),e("td",[t._v("Amount of whitespace to include for the JSON.stringify() function")])]),t._v(" "),e("tr",[e("td",[t._v("useColors")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),e("td",[t._v("Display colors in a terminal capable of showing them")])])])])])}),[],!1,null,null,null);a.default=i.exports}}]);