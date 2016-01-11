'use strict';

//write code to manage prisoners
(function() {
	var candyPeople = function($http, $interval, industry, Achievement) {
		//Candy Person base class.
		//industry = link to industry object for production methods
		//production = how much one unit will make.
		//cost = starting cost of one unit.
		//exponent = cost's exponential growth.
		var CandyPerson = function(imgName, industry, production, cost, id) {
			expect(cost).to.be.ok;
			expect(production).to.be.ok;
			expect(id).to.be.ok;

			var population = 0;
			var self = {};
			self.id = id || 0;
			self.imgName = imgName || 'missingno';
			self.imgfullsrc = imgName ? 'images/' + imgName + '.png' : 'images/missingno.png';
			self.engine = Random.engines.mt19937();
			self.random = Random(self.engine);
			self.time = moment().millisecond(0);
			console.log(self.time.format("dddd, MMMM Do YYYY, h:mm:ss a"))
			self.pick1 = -1;
			self.pick2 = 2;
			self.pick3 = 3;
			self.pick4 = 5;
			self.pick5 = 8;
			self.pick6 = 13;

			self.tries = 0;
			self.initialized = false;

			var syncTime = moment().millisecond(0).seconds(0);
			self.engine.seed(syncTime.valueOf());
			self.syncNumber = self.random.integer(1,1000);

			var db;
			var request = indexedDB.open("MyTestDatabase");
			request.onerror = function(event) {
			  alert("Why didn't you allow my web app to use IndexedDB?!");
			};
			request.onsuccess = function(event) {
			  db = event.target.result;
			};

			self.draw = []
			

			self.industry = industry;
			self.production = production;
			self.achievements = [];

			self.getCount = function() {
				return population;
			};

			self.getCost = function() {
				return Math.pow(population, 2) + cost;
			};

			self.getCostProgress = function() {
				var progress = industry.getCount() / self.getCost();
				if (progress > 1) {
					return 100;
				}
				return progress * 100;
			};

			self.mkTaffyPerson = function() {
				var cost = self.getCost();
				if (industry.getCount() >= cost) {
					industry.useItem(cost);
					population += 1;
					self.checkYourSelf();
					//wreck yourself(). 
					self.saveState();
				}
			};

			self.seed = function() {
				population = 1;
				self.saveState();
			};

			self.saveState = function() {
				if(!self.initialized)
					return;

				window.localStorage.setItem(self.imgName + '-' + "tries", self.tries);
				window.localStorage.setItem('number1', self.pick1);
				window.localStorage.setItem('number2', self.pick2);
				window.localStorage.setItem('number3', self.pick3);
				window.localStorage.setItem('number4', self.pick4);
				window.localStorage.setItem('number5', self.pick5);
				window.localStorage.setItem('number6', self.pick6);
			};

			self.loadState = function() {
				self.tries = Number(window.localStorage.getItem(self.imgName + '-' + "tries"));

				self.pick1 = Number(window.localStorage.getItem('number1'));
				self.pick2 = Number(window.localStorage.getItem('number2'));
				self.pick3 = Number(window.localStorage.getItem('number3'));
				self.pick4 = Number(window.localStorage.getItem('number4'));
				self.pick5 = Number(window.localStorage.getItem('number5'));
				self.pick6 = Number(window.localStorage.getItem('number6'));

				var state = Number(window.localStorage.getItem(self.imgName + '-' + id));
				if (self.pick1 && self.pick1 > 0) {
					self.initialized = true
				}
			};

			self.produce = function() {
				// if (population > 0) {
				// 	industry.makeItem(population * self.production);
				// }
				self.tries += 1;
				self.time.add(100, "ms");
				self.engine.seed(self.time.valueOf());

				self.draw[0] = self.random.integer(1,35);
				self.draw[1] = self.random.integer(1,35);
				self.draw[2] = self.random.integer(1,35);
				self.draw[3] = self.random.integer(1,35);
				self.draw[4] = self.random.integer(1,35);
				self.draw[5] = self.random.integer(1,35);
				var match = 0;


				if(self.draw.indexOf(self.pick1) != -1){
					match = match + 1;
				}

				if(self.draw.indexOf(self.pick2) != -1){
					match = match + 1;
				}

				if(self.draw.indexOf(self.pick3) != -1){
					match = match + 1;
				}

				if(self.draw.indexOf(self.pick4) != -1){
					match = match + 1;
				}

				if(self.draw.indexOf(self.pick5) != -1){
					match = match + 1;
				}

				if(self.draw.indexOf(self.pick6) != -1){
					match = match + 1;

					switch (match) {
						case 1:
						    industry.makeItem(4)
						    break;
					    case 2:
						    industry.makeItem(4)
						    break;
					    case 3:
						    industry.makeItem(7)
						    toastr.success("won 7", "");
						    break;
						case 4:
						    industry.makeItem(100)
						    toastr.warning("won 100", "");
						    break;
						case 5:
						    industry.makeItem(10000)
						    toastr.warning("won 10,000", "");
						    break;
						case 6:
						    industry.makeItem(5000000)
						    toastr.error("won JACKPOT!!", "CALL YOUR MUTHDA");
						    break;
						}
				} else {
					switch (match) {
						case 3:
						    industry.makeItem(7)
						    toastr.success("won 7", "");
						    break;
						case 4:
						    industry.makeItem(100)
						    toastr.success("won 100", "");
						    break;
						case 5:
						    industry.makeItem(1000000)
						    toastr.error("won 1,000,000", "");
						    window.localStorage.setItem("win!" + self.time.format(), self.time.valueOf());
						    break;
					}
				}
					
			};

			self.verify = function(){
				if(!self.pick1 || self.base1 < 1 || self.base1 > 59)
					return
				if(self.pick2 < 1 || self.base2 > 59)
					return
				if(self.pick3 < 1 || self.base3 > 59)
					return
				if(self.pick4 < 1 || self.base4 > 59)
					return
				if(self.pick5 < 1 || self.base5 > 59)
					return
				if(self.pick6 < 1 || self.base6 > 26)
					return

				self.initialized = true;
				self.saveState();

			}

			self.checkYourSelf = function(){
				for(var item in self.achievements){
					self.achievements[item].check();
				}
			};

			return self;
		};

		var people = {
			taffy: new CandyPerson('taffy', industry.taffy, 1, 10, 1),
		};

		//(item, amount, title, description)
		people.taffy.achievements.push(new Achievement(people.taffy, 2, "Humble Beginnings", "Make your first Taffy person"));
		
		//now load stuff.
		for (var name in people) {
			people[name].loadState();
		}

		//start game off with one taffy person
		if (!people.taffy.getCount()) {
			people.taffy.seed();
		}


		var incrementInterval = $interval(function harvestTaffy() {
			for (name in people) {
				people[name].produce();
			}
		},100);


		//expose candyPerson in prototype for unit tests
		Object.defineProperty(people, 'CandyPerson', {
		  enumerable: false,
		  value: CandyPerson
		});



		return people;
	};


	var module = angular.module('marcApp');
	module.factory('candyPeople', candyPeople);
}());