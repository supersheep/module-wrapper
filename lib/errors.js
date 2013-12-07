var AlreadyWrappedError = function(message){
	this.name = "AlreadyWrappedError";
    this.message = (message || "");
}
AlreadyWrappedError.prototype = new Error();

module.exports = {
	AlreadyWrappedError:AlreadyWrappedError
}