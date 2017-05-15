var library = (function() {
  return {
	TimeStamp: (function(){
   	  return {
		UnixTimestamp: function(){
		  return Math.floor((new Date).getTime() / 1000).toString();
		},
		UnixMillisecond: function(){
		  return (new Date).getTime().toString();
		  }
		}
	})(),
	DblDigit: function(digit){
	  if(digit < 10){
		digit = '0' + digit;
  	  }
	  return digit;
	},
	Ordinal: function(ordinalNum){
	  var lastNum = parseInt(ordinalNum[ordinalNum.length-1]);
	  if(lastNum === 1){
		ordinalNum = ordinalNum + 'st';
  	  } else if(lastNum === 2){
		ordinalNum = ordinalNum + 'nd';
	  } else if(lastNum === 3){
		ordinalNum = ordinalNum + 'rd';
	  } else {
		ordinalNum = ordinalNum + 'th';
	  }
	  return ordinalNum;
	},
	Local: (function(){
	  return {
		Time: (function() {
		  return {
	  	    WithSeconds: function(){
				return (new Date).toLocaleTimeString();
			},
	   	    WithOutSeconds: function() {
			  var current = (new Date).toLocaleTimeString();
			  return (current).replace(/:(\d{1,3}) /, ' ');
			}
		  }
		})(),
		MDY: (function(){
	  	  return {
		    Numeral: function(){
			  return (new Date()).toLocaleDateString();
			},
			Name: function(){
				return library.Month.CurrentMonth() + ' '+ library.Month.DateOfMonth.Numeral() + ', '+ library.Year.YearFull();
			}
		  }
		  })(),
		}
	})(),
	Second: (function(){
		return{
			Second: function(){
			  return (new Date).getSeconds().toString();
			},
			DblDigit: function(){
				var min = this.Second();
				return library.DblDigit(min);
			}
		}
	})(),
	Minute: (function(){
		return{
			Minute: function(){
			  return (new Date).getMinutes().toString();
			},
			DblDigit: function(){
				var min = this.Minute();
				return library.DblDigit(min);
			}
		}
	})(),
	Hour: (function(){
		return {
			TwentyFourHour: function() {
				return (new Date).getHours().toString();
			},
			TwelveHour: function() {
				var date = (new Date).getHours();
				if(date > 12) {
					date = date - 12;
				}
				return date.toString();
			},
			AMPM: (function() {
				return {
					AMoPM: function(){
						var AoP = (new Date).getHours();
						if(AoP >= 12) {
						   return 'PM'
						}
						return 'AM';
					},
					UpperCase: function(){
						return this.AMoPM();
					},
					LowerCase: function(){
						return this.AMoPM().toLowerCase();
					}
				}
			})()
		}
	})(),
	Week: (function(){
		return {
			Name: {
				0: 'Sunday',
				1: 'Monday',
				2: 'Tuesday',
				3: 'Wednesday',
				4: 'Thursday',
				5: 'Friday',
				6: 'Saturday'
			},
			DayOfWeek: function(){
				return library.Week.Name[(new Date()).getDay()];
			},
			AbrDayOfWeek: function(){
				var day = this.DayOfWeek();
				return day.slice(0,3);
			},
			FirstTwoOfWeek: function(){
				var day = this.DayOfWeek();
				return day.slice(0,2);
			},
			WeekOfYear: function(){
				var d = new Date();
				d.setHours(0, 0, 0);
				// Set to nearest Thursday: current date + 4 - current day number
				// Make Sunday's day number 7
				d.setDate(d.getDate() + 4 - (d.getDay() || 7));
				// Get first day of year
				var yearStart = new Date(d.getFullYear(), 0, 1);
				// Calculate full weeks to nearest Thursday
				var weekNo = Math.ceil((((d - yearStart) / 8.64e7) + 1) / 7);
				return weekNo.toString();
			}

		}
	})(),
	Month: (function(){
		return {
			Name: {
				0: 'January',
				1: 'February',
				2: 'March',
				3: 'April',
				4: 'May',
				5: 'June',
				6: 'July',
				7: 'August',
				8: 'September',
				9: 'October',
				10: 'November',
				11: 'December'
			},
			DateOfMonth: (function(){
				return {
					Numeral: function(){
						return ((new Date()).getDate()).toString();
					},
					Ordinal: function(){
						return library.Ordinal(this.Numeral());
					},
					DateDblDigit: function(){
						var digit = this.Numeral();
						return library.DblDigit(digit);
					}
				}
			})(),
			MonthNumber: function(){
				return ((new Date()).getMonth() + 1).toString();
			},
			MonthNumberDblDigit: function(){
				var digit = this.MonthNumber();
				return library.DblDigit(digit);
			},
			AbrOfCurrentMonth: function(){
				return this.CurrentMonth().slice(0,3);
			},
			CurrentMonth: function(){
				return library.Month.Name[(new Date()).getMonth()];
			}
		}
	})(),
	Year: (function(){
		return {
			DayOfYear: (function(){
				return {
					Numeral: function(){
						var today = new Date();
						var beginOfYear = new Date(today.getFullYear(), 0, 0);
						var numOfDays = (today - beginOfYear)/(1000 * 60 * 60 * 24);
						return Math.floor(numOfDays).toString();
					},
					Ordinal: function(){
						return library.Ordinal(this.Numeral());
					}
				}
			})(),
			YearFull: function(){
				return (new Date).getFullYear().toString();
			},
			YearAbr: function(){
				return (new Date).getFullYear().toString().slice(-2);
			}
		}
	})(),
	Defaults: function(){
		var current = this.Year.YearFull()+'-'+this.Month.MonthNumberDblDigit()+'-'+this.Month.DateOfMonth.DateDblDigit();
		var hour = this.Hour.TwentyFourHour();
		if(hour < 10){
			hour = '0' + hour;
		}
		var time = hour+':'+this.Minute.DblDigit()+':'+ this.Second.DblDigit();
		return current+'T'+time;
	}
  }
})();


