"use strict";
exports.__esModule = true;
exports.addItem = void 0;
var logItemCounter = 0;
var addItem = function (logstring) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(logItemCounter++ +
        "-" +
        new Date().toLocaleTimeString() +
        "===> " +
        logstring);
    node.appendChild(textnode);
    //   var d = document
    //     .getElementById("output")
    //     .insertBefore(node, document.getElementById("output").firstChild);
    document.getElementById("output").appendChild(node);
};
exports.addItem = addItem;
