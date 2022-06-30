var logItemCounter = 0;

export const addItem = (logstring: any) => {
  var node = document.createElement("li");
  var textnode = document.createTextNode(
    logItemCounter++ +
      "-" +
      new Date().toLocaleTimeString() +
      "===> " +
      logstring
  );
  node.appendChild(textnode);
  //   var d = document
  //     .getElementById("output")
  //     .insertBefore(node, document.getElementById("output").firstChild);
  document.getElementById("output").appendChild(node);
};
