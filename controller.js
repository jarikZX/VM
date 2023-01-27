var cola  = new Product({name: 'Cola', price: 100});
var chips = new Product({name: 'Chips', price: 50});
var candy = new Product({name: 'Candy', price: 65});
var cookie  = new Product({name: 'Cookie', price: 1000});
var milk = new Product({name: 'Milk', price: 505});
var potato = new Product({name: 'Potato', price: 99});
var water = new Product({name: 'Water', price: 55});
var snickers = new Product({name: 'Snickers', price: 110});

var fifty  = new Coin({name: 'fifty', value: 50});
var hundred    = new Coin({name: 'hundred', value: 100});
var fivehundred = new Coin({name: 'fivehundred', value: 500});
var thousand = new Coin({name: 'thousand', value: 1000});

var coinsForLoading = createCoins();
var inventory = createProducts();

var vendingMachine = new Machine({inventory: inventory});
vendingMachine.loadCoins(coinsForLoading);

var display = document.getElementById('display');
var currentAmount = document.getElementById('current-amount');
var productReturn = document.getElementById('product-return');
var coins = document.getElementById('coins');

var colaButton = document.getElementById('cola');
var chipsButton = document.getElementById('chips');
var candyButton = document.getElementById('candy');
var cookieButton = document.getElementById('cookie');
var milkButton = document.getElementById('milk');
var potatoButton = document.getElementById('potato');
var waterButton = document.getElementById('water');
var snickersButton = document.getElementById('snickers');

var fiftyButton = document.getElementById('fifty');
var hundredButton = document.getElementById('hundred');
var fivehundredButton = document.getElementById('fivehundred');
var thousandButton = document.getElementById('thousand');

setDisplayText();
setCurrentAmountText();

chooseProduct(colaButton, cola);
chooseProduct(chipsButton, chips);
chooseProduct(candyButton, candy);
chooseProduct(cookieButton, cookie);
chooseProduct(milkButton, milk);
chooseProduct(potatoButton, potato);
chooseProduct(waterButton, water);
chooseProduct(snickersButton, snickers);

insertCoin(fiftyButton, fifty);
insertCoin(hundredButton, hundred);
insertCoin(fivehundredButton, fivehundred);
insertCoin(thousandButton, thousand);

pressCoinReturnButton();
takeCoins();
emptyAllCoins();
restockCoins();

takeProduct();
removeAllProducts();
restockProducts();

function createProducts(){
	var cola  = new Product({name: 'Cola', price: 100});
	var chips = new Product({name: 'Chips', price: 50});
	var candy = new Product({name: 'Candy', price: 65});
	var cookie  = new Product({name: 'Cookie', price: 1000});
	var milk = new Product({name: 'Milk', price: 505});
	var potato = new Product({name: 'Potato', price: 99});
	var water = new Product({name: 'Water', price: 55});
	var snickers = new Product({name: 'Snickers', price: 110});
	var products = [
		cola,
		cola, 
		chips,
		chips, 
		candy,
		candy,
		cookie,
		milk,
		milk,
		potato,
		water,
		snickers
	];
	return products;
}

function createCoins(){
	var fifty  = new Coin({name: 'fifty', value: 50});
	var hundred    = new Coin({name: 'hundred', value: 100});
	var fivehundred = new Coin({name: 'fivehundred', value: 500});
	var thousand = new Coin({name: 'thousand', value: 1000});
	var coins = [
		fifty,   
		fifty, 
		fifty, 
		hundred,     
		hundred,   
		hundred,
		fivehundred,  
		fivehundred, 
		fivehundred,
		thousand,
		thousand
	];
	return coins;
}

function setDisplayText(){
	display.textContent = vendingMachine.display;
}

function setCurrentAmountText(){
	currentAmount.textContent = vendingMachine.currentAmount;
}

function chooseProduct(button, product){
	button.addEventListener('click', function(){
		vendingMachine.selectProduct(product);
		setDisplayText();
		setCurrentAmountText();
		moveProductToProductReturn();
		returnCoins();
	});
}

function moveProductToProductReturn(){
	if ( vendingMachine.productReturn != 0 ){
		productReturn.textContent = vendingMachine.productReturn.map(function(element){
			return element.name;
		});
	}
}

function insertCoin(coinButton, coin){
	coinButton.addEventListener('click', function(){
		vendingMachine.insertCoins(coin);
		setCurrentAmountText();	
	});
}

function returnCoins(){
	coins.textContent = vendingMachine.coinReturn.map(function(element){
		return ' ' + element.name;
	});
}

function setInitialDisplayText(){
	display.textContent = vendingMachine.initialDisplay();
}

function pressCoinReturnButton(){
	var coinReturnButton = document.getElementById('coin-return-button');
	coinReturnButton.addEventListener('click', function(){
		vendingMachine.pressCoinReturn();
		returnCoins();
		setInitialDisplayText();
		setCurrentAmountText();
	});
}

function takeCoins(){
	var takeCoins = document.getElementById('take-coins');
	takeCoins.addEventListener('click', function(){
		vendingMachine.takeCoins();
		coins.textContent = '';
		setCurrentAmountText();
	});
}

function takeProduct(){
	var takeProduct = document.getElementById('take-product');
	takeProduct.addEventListener('click', function(){
		productReturn.textContent = '';
		vendingMachine.removeProduct();
		setDisplayText();
		vendingMachine.coinReturn;
		setCurrentAmountText();
	});
}

function restockProducts(){
	var restockInventory = document.getElementById('restock-inventory');
	var products = createProducts();
	restockInventory.addEventListener('click', function(){
		products.forEach(function(element){
			vendingMachine.inventory.push(element);	
		});
		setInitialDisplayText();
	});
}

function removeAllProducts(){
	var removeProducts = document.getElementById('remove-all-products-from-inventory');
	removeProducts.addEventListener('click', function(){
		productReturn.textContent = vendingMachine.inventory.map(function(element){
			return element.name;
		});
		vendingMachine.inventory = [];
	});
}

function restockCoins() {
	var restock = document.getElementById('restock-coins');
	restock.addEventListener('click', function() {
		vendingMachine.loadCoins(coinsForLoading);
		vendingMachine.setInitialDisplay();
		setDisplayText();
	});
}

function emptyAllCoins(){
	var emptyCoins = document.getElementById('empty-all-coins');
	emptyCoins.addEventListener('click', function(){
		coins.textContent = vendingMachine.totalCoins.map(function(element){
			return element.name;
		});
		vendingMachine.totalCoins = [];
		vendingMachine.setInitialDisplay();
		setDisplayText();
	}); 
}
