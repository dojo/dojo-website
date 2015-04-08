module.exports = function(grunt){

	// Simple helper to make it possible to use the dest variable where a tasks 'files' expects an object literal.

	function toObj(arr) {
		var obj = {};

		for(var i=0; i != arr.length; i+=2){
			obj[arr[i]] = arr[i+1];
		}
		console.log(obj);
		return obj;
	}

	return toObj;
}