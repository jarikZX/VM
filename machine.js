var Machine = function(args) {
	this.totalCoins = args.totalCoins || [];
	this.insertedCoins = [];
	this.currentAmount = 0;
	this.coinReturn = [];
	this.productReturn = [];
	this.inventory = args.inventory || [];
	this.display = this.initialDisplay();
};

var weights = { 
	50: 50,
	100: 100,
	500: 500,
	1000: 1000
};

var displays = [
	'Вставьте купюру', 
	'Цена: ', 
	'Спасибо!', 
	'Внесите деньги и выберите товар',
	'SOLD OUT'
];

var monies = [
	50,
	100,
	500,
	1000
];

Machine.prototype.insertCoins = function(coin) {
	
		this.insertedCoins.push(coin);
		this.sumInsertedCoins();
	
};

Machine.prototype.loadCoins = function(coins) {
	this.totalCoins = coins.map(function(coin){
		coin.value = weights[coin.weight];
		coin.value;
		return coin;
	});
	this.setInitialDisplay();
};

Machine.prototype.setInitialDisplay = function(){
	this.display = this.initialDisplay();
};

Machine.prototype.selectProduct = function(product) { 
	this.sumInsertedCoins();

	var enoughMoney = this.checkMoneyInserted(product);
	var chosenProduct = this.getProductFromInventory(product);
	
	if ( enoughMoney && chosenProduct ){
		this.addInsertedCoinsToTotalCoins();
		this.makeChange(product);
		this.setDisplayToThankYou();
		this.returnProduct(chosenProduct);		
		this.resetCurrentAmountDisplay();
	} else if ( enoughMoney && !chosenProduct )	{
		this.setDisplayToSoldOut();
	} else {
		this.displayProductPrice(product);
		this.sumInsertedCoins();
	}
};

Machine.prototype.returnProduct = function(chosenProduct){
	this.productReturn.push(chosenProduct);
};

Machine.prototype.setDisplayToThankYou = function(){
	this.display = displays[2];
};

Machine.prototype.setDisplayToSoldOut = function(){
	this.display = displays[4];
};

Machine.prototype.displayProductPrice = function(product){
	this.display = displays[1] + product.price;
};

Machine.prototype.resetCurrentAmountDisplay = function(){
	this.currentAmount = 0;
};

Machine.prototype.addInsertedCoinsToTotalCoins = function(){
	this.totalCoins = this.totalCoins.concat(this.insertedCoins);
	this.insertedCoins = [];
};

Machine.prototype.checkMoneyInserted = function(product){
	return this.currentAmount >= product.price;
};

Machine.prototype.getProductFromInventory = function(product){
	var index = this.inventory.findIndex(function(element){
		return element.name == product.name;
	});
	switch( index ) {
	case -1 :
		return false;
	default :		
		return this.inventory.splice(index, 1)[0];
	}
};

Machine.prototype.sumInsertedCoins = function() {
  console.log(this.insertedCoins);
  this.currentAmount = this.insertedCoins.map(function(x){
    return x.value;
  }).reduce(function(a,b) {
    return a + b;
  },0);
};

Machine.prototype.makeChange = function(product) {
	var valueReturned = this.currentAmount - product.price;
	this.makeChangeAlgorithm(valueReturned);
};

Machine.prototype.makeChangeAlgorithm = function(valueReturned){
	var machine = this;
	monies.map(function(coin){
		var times =  valueReturned / coin;
		times = Math.floor(times);
		var i=0;
		for (i; i < times; i++) {
			var index = this.totalCoins.findIndex(function(element) {
				return element.value == coin;
			});
			this.coinReturn.push(this.totalCoins.splice(index, 1)[0]);
		}
		valueReturned = valueReturned - (times * coin);
	},machine);
};

Machine.prototype.pressCoinReturn = function() {
	this.coinReturn = this.coinReturn.concat(this.insertedCoins);
	this.insertedCoins = [];
	this.resetCurrentAmountDisplay();
};

Machine.prototype.removeProduct = function() {
	this.display = this.initialDisplay();
	this.productReturn = [];
	this.resetCurrentAmountDisplay();
};

Machine.prototype.takeCoins = function(){
	this.coinReturn = [];
	this.resetCurrentAmountDisplay();
};

Machine.prototype.sumTotalCoins = function() {
	return this.totalCoins.map(function(element){
		return element.value;
	}).reduce(function(a,b){
		return a + b;
	},0);
};

Machine.prototype.initialDisplay = function() {
	if ( this.sumTotalCoins() >= 100 ) {
		return displays[0];
	} else {
		return displays[3];
	}
};





