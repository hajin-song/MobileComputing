/**
 * DataFormat.js
 * Tool functions
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: 29-Sept-2017
 */


/**
 * jsonToURLForm : String
 * @description Convert JSON to Form Data URL
 * @param  {Object} json Object being converted into URL String
 * @return {String}      Object in URL query format
 */
export function jsonToURLForm(json){
 var formBody = [];
 for(var prop in json){
  var encodedKey = encodeURIComponent(prop);
  var encodedValue = encodeURIComponent(json[prop]);
  formBody.push(encodedKey + "=" + encodedValue);
 };
 formBody = formBody.join('&');
 return formBody;
}
