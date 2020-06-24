
var apiUrl  = "";
var debug   = "";

$(document).ready(function(){
    apiUrl =  window["env"]["apiUrl"] || "default";
    debug  =  window["env"]["debug"]  || false;

    alert("apiUrl: " + apiUrl);
    alert("debug: " + debug);            
});
