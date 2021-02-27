(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{373:function(t,e,a){"use strict";a.r(e);var n=a(40),s=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[t._v("#")]),t._v(" Configuration")]),t._v(" "),a("h2",{attrs:{id:"default-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#default-configuration"}},[t._v("#")]),t._v(" Default Configuration")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("Out-of-the-box Configuration")]),t._v(" "),a("p",[a("strong",[t._v("multi-level-logger")]),t._v(" is ready out-of-the-box with a default log configured for display at the "),a("strong",[t._v("Warn")]),t._v(" level.")])]),t._v(" "),a("p",[a("em",[t._v("Default configuration is equal to:")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("InitializeLogging")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"warn"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"retrieving-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#retrieving-configuration"}},[t._v("#")]),t._v(" Retrieving Configuration")]),t._v(" "),a("h3",{attrs:{id:"loglevels"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#loglevels"}},[t._v("#")]),t._v(" LogLevels")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Member")]),t._v(" "),a("th",[t._v("Value")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("dev")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("trace")]),t._v(" "),a("td",[t._v("10")])]),t._v(" "),a("tr",[a("td",[t._v("debug")]),t._v(" "),a("td",[t._v("20")])]),t._v(" "),a("tr",[a("td",[t._v("info")]),t._v(" "),a("td",[t._v("30")])]),t._v(" "),a("tr",[a("td",[t._v("warn")]),t._v(" "),a("td",[t._v("40")])]),t._v(" "),a("tr",[a("td",[t._v("error")]),t._v(" "),a("td",[t._v("50")])]),t._v(" "),a("tr",[a("td",[t._v("fatal")]),t._v(" "),a("td",[t._v("60")])])])]),t._v(" "),a("p",[a("strong",[t._v("multi-level-logger")]),t._v(" exposes the "),a("strong",[t._v("LogLevels")]),t._v(" enumeration for all named log levels.\nLevels can be referred to via the string name, the enumeration value, or an integer value between the lowest and highest level.")]),t._v(" "),a("h3",{attrs:{id:"getconfiguredlogging"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getconfiguredlogging"}},[t._v("#")]),t._v(" GetConfiguredLogging()")]),t._v(" "),a("p",[a("strong",[t._v("Returns:")]),t._v(" "),a("em",[a("a",{attrs:{href:"#ibaseconfiguration"}},[t._v("IBaseConfiguration")])])]),t._v(" "),a("ul",[a("li",[t._v("Return the currently configured logging options")])]),t._v(" "),a("h2",{attrs:{id:"setting-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setting-configuration"}},[t._v("#")]),t._v(" Setting Configuration")]),t._v(" "),a("h3",{attrs:{id:"environment-variable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#environment-variable"}},[t._v("#")]),t._v(" Environment Variable")]),t._v(" "),a("p",[a("strong",[t._v("multi-level-logger")]),t._v(" supports setting the log level via a "),a("strong",[t._v("LOG_LEVEL")]),t._v(" environment variable")]),t._v(" "),a("h4",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Info "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("multi-level-logger")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Info")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Info-level log"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("pre",[a("code",[a("span",[t._v("> LOG_LEVEL=debug node testLog.js")]),t._v("\n"),a("span",[t._v("> ")]),a("span",{staticStyle:{color:"rgb(59, 142, 234)"}},[t._v("1/1/2018, 12:00:00 PM")]),a("span",[t._v(" - ")]),a("span",{staticStyle:{color:"rgb(13, 188, 121)"}},[t._v("[line 3: ./log-example.js]")]),a("span",[t._v(" - ")]),a("span",{staticStyle:{}},[t._v("Info-level log")])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),a("p",[a("strong",[t._v("multi-level-logger")]),t._v(" defaults to "),a("em",[t._v("warn")]),t._v(", and the log above would not be shown without the use of the enviornment variable")])]),t._v(" "),a("h3",{attrs:{id:"methods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[t._v("#")]),t._v(" Methods")]),t._v(" "),a("h4",{attrs:{id:"initializelogging-logdefinition-logname"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#initializelogging-logdefinition-logname"}},[t._v("#")]),t._v(" InitializeLogging(logDefinition, logName)")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",[t._v("Required")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("logDefinition")]),t._v(" "),a("td",[t._v("yes")]),t._v(" "),a("td",[t._v("string | number | "),a("a",{attrs:{href:"#ilogdefinition"}},[t._v("ILogDefinition")])]),t._v(" "),a("td",[t._v("The log level initializer matching one of four types"),a("br"),a("ol",[a("li",[a("em",[t._v("String")]),t._v(" - a string matching a log level in the levels object")]),a("li",[a("em",[t._v("Number")]),t._v(" - an integer value to use as the log level")]),a("li",[a("em",[t._v("Object")]),t._v(" - an object with a "),a("code",[t._v("logLevel")]),t._v(" property, matching 1 or 2 above")]),a("li",[a("em",[t._v("Object")]),t._v(" - an object with each key matching a named log, and the value as 1, 2, or 3 above")])])])]),t._v(" "),a("tr",[a("td",[t._v("logName")]),t._v(" "),a("td",[t._v("no")]),t._v(" "),a("td",[t._v("string")]),t._v(" "),a("td",[t._v('Name of the log, defaulting to "default"')])])])]),t._v(" "),a("ul",[a("li",[t._v("The "),a("a",{attrs:{href:"#loglevels"}},[t._v("LogLevels")]),t._v(" enumeration has "),a("em",[t._v("number")]),t._v(" values, and members can be passed directly to "),a("em",[t._v("logDefinition")])])]),t._v(" "),a("h5",{attrs:{id:"example-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-2"}},[t._v("#")]),t._v(" Example")]),t._v(" "),a("h6",{attrs:{id:"set-directly"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-directly"}},[t._v("#")]),t._v(" Set directly")]),t._v(" "),a("p",[t._v("The following sets the default log level to "),a("strong",[t._v("Info")]),t._v(", and a log named "),a("em",[t._v("webserver")]),t._v(" to "),a("strong",[t._v("Debug")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" InitializeLogging "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"multi-level-logger"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("InitializeLogging")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("InitializeLogging")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"debug"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"webserver"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h6",{attrs:{id:"set-via-configuration-object"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-via-configuration-object"}},[t._v("#")]),t._v(" Set via configuration object")]),t._v(" "),a("p",[t._v("This code does exactly the same thing using an object to define multiple logs, and using the "),a("em",[t._v("LogLevels")]),t._v(" enumeration")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" LogLevels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" InitializeLogging "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"multi-level-logger"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" logDefinition "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    logLevel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" LogLevels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("info"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    webserver"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" logLevel"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" LogLevels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("debug "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("InitializeLogging")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("logDefinition"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("h4",{attrs:{id:"outputformatting-options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#outputformatting-options"}},[t._v("#")]),t._v(" OutputFormatting(options)")]),t._v(" "),a("ul",[a("li",[t._v("Sets the global options for formatting log output")]),t._v(" "),a("li",[t._v("Can be overridden per-log-call")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",[t._v("Required")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("options")]),t._v(" "),a("td",[t._v("yes")]),t._v(" "),a("td",[a("a",{attrs:{href:"#ilogoptionconfiguration"}},[t._v("ILogOptionConfiguration")])]),t._v(" "),a("td",[t._v("Set the formatting for output")])])])]),t._v(" "),a("h2",{attrs:{id:"interfaces-for-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#interfaces-for-configuration"}},[t._v("#")]),t._v(" Interfaces for Configuration")]),t._v(" "),a("h3",{attrs:{id:"ibaseconfiguration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ibaseconfiguration"}},[t._v("#")]),t._v(" IBaseConfiguration")]),t._v(" "),a("p",[a("strong",[t._v("Configuration for the module")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("includeCodeLocation")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Show the code location when printing to the log")])]),t._v(" "),a("tr",[a("td",[t._v("includeTimestamp")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Show a timestamp when printing to the log")])]),t._v(" "),a("tr",[a("td",[t._v("jsonFormatter")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("number")]),t._v(" "),a("td",[t._v("Amount of whitespace to include for the "),a("code",[t._v("JSON.stringify()")]),t._v(" function")])]),t._v(" "),a("tr",[a("td",[t._v("logLevel")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"#ilevelconfiguration"}},[t._v("ILevelConfiguration")])]),t._v(" "),a("td",[t._v("Minimum log level to display")])]),t._v(" "),a("tr",[a("td",[t._v("useColors")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Display colors in a terminal capable of showing them")])])])]),t._v(" "),a("h3",{attrs:{id:"ilevelconfiguration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ilevelconfiguration"}},[t._v("#")]),t._v(" ILevelConfiguration")]),t._v(" "),a("p",[a("strong",[t._v("Log level display")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("default")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("yes")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("number")]),t._v(" "),a("td",[t._v("Default log level for all logging")])])])]),t._v(" "),a("h3",{attrs:{id:"ilogdefinition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ilogdefinition"}},[t._v("#")]),t._v(" ILogDefinition")]),t._v(" "),a("p",[a("strong",[t._v("Interface for object used as log initializer")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("logLevel")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("string | number")]),t._v(" "),a("td",[t._v("Named log level, threshold numerical log value, or log level enumeration")])])])]),t._v(" "),a("ul",[a("li",[t._v("Any property in an "),a("em",[t._v("ILogDefinition")]),t._v(" that has an "),a("em",[t._v("Object")]),t._v(" as it's value which contains a "),a("strong",[t._v("logLevel")]),t._v(" property will be configured as a named log at that log level\n"),a("ul",[a("li",[t._v("See the "),a("a",{attrs:{href:"#set-via-configuration-object"}},[t._v("Example: Set via configuration object")]),t._v(" below")])])])]),t._v(" "),a("h3",{attrs:{id:"ilogoptionconfiguration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ilogoptionconfiguration"}},[t._v("#")]),t._v(" ILogOptionConfiguration")]),t._v(" "),a("p",[a("strong",[t._v("Log writting configuration for the single message")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameter")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Required")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("Type")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("includeCodeLocation")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Show the code location when printing to the log")])]),t._v(" "),a("tr",[a("td",[t._v("includeTimestamp")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Show a timestamp when printing to the log")])]),t._v(" "),a("tr",[a("td",[t._v("jsonFormatter")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("number")]),t._v(" "),a("td",[t._v("Amount of whitespace to include for the "),a("code",[t._v("JSON.stringify()")]),t._v(" function")])]),t._v(" "),a("tr",[a("td",[t._v("useColors")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("no")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("boolean")]),t._v(" "),a("td",[t._v("Display colors in a terminal capable of showing them")])])])])])}),[],!1,null,null,null);e.default=s.exports}}]);