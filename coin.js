var Coin = function(args) {
	this.name   = args.name;
	this.size   = args.name.length;
	this.weight = args.name.split('').map(function(x) { return x.charCodeAt(); }).reduce(function(a,b) { return a+b; }); 
	this.value  = args.value;
};

