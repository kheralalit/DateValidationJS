
    var fullDateReg = /(0[1-9]|[12][0-9]|3[01]|[1-9])[- ..](0[1-9]|1[012]|[1-9])[- ..]([^0-9])/;
	var daysReg = /(0[1-9]|[12][0-9]|3[01]|[1-9])/;
	var monthReg = /(0[1-9]|1[012]|[1-9])/;
	var yearReg = /^(0|1|2|3|4|5|6|7|8|9)/;
	var yearTwoDigitReg = /^(0|1|2|3|4|5|6|7|8|9)/;
	var yearFirstDigitReg = /^(0|1|2|3|4|5|6|7|8|9)/;
	var completeDate = false;
var validateDate = function (input) {
		 var newVal = $(input).val();
		 var id = $(input).attr("id");
		 var splittedids = id.split('_:');
		 id=splittedids[0];
		if (checkInput(newVal)) {
			$(input).removeAttr('style');
			$(input).siblings().css("visibility","hidden");
		} else {
			$(input).attr('style','color:black;background-color:pink;border-color: red');
			$(input).siblings().css("visibility","visible");
			return false;
		}
	}
	
	var clearDate = function(input){
		$(input).val("");
		
	};
	function checkInput(input) {
		var dotIndex = input.indexOf(".");
		if (dotIndex > 0 && dotIndex < 6) {
			var numArr = input.split(".");
			var i;
		}
		return DayAndMonthValidation(input);
	}

	function DayAndMonthValidation(input) {
		var tempDate = input.split(".");
		var day, month, year;
		if (tempDate.length == 1) {
			day = tempDate[0];
			if (day !== "") {
				return dayValidation(day);
			} else {
				return true;
			}
		} else if (tempDate.length == 2) {
			day = tempDate[0];
			month = tempDate[1];
			if (month !== "") {
				return dayValidation(day) && monthValidation(day, month);
			} else {
				return dayValidation(day);
			}
		} else if (tempDate.length == 3) {
			day = tempDate[0];
			month = tempDate[1];
			year = tempDate[2];
			return dayValidation(day) && monthValidation(day, month) && yearValidation(day, month, year);
		}
	}

	function dayValidation(day) {
		return day =="0" || (day.length <= 2 && 1<=day && day<=31); 
	}

	function monthValidation(day, month) {
		if (month =="0" || (month.length <= 2 && 1 <= month && month <= 12)) {
			return day <= daysInMonth(month);
		} else {
			return false;
		}
	}

	function yearValidation(day, month, year) {
		if (year.length == 0) {
			return day <= daysInMonth(month);
		} else if (year.length == 1) {
			return year.match(yearFirstDigitReg)
		} else if (year.length == 2 || year.length == 3) {
			return year.match(yearTwoDigitReg);
		} else if (year.length == 4) {
			if(year == '0000') {
				return false;
			}
			else if (year.match(yearReg)) {
				return day <= daysInMonth(month, year);
			} 
			return false;
		} 
		
		else {
			return false;
		}
	}

	function daysInMonth(m, y) { 
		m = parseInt(m);
		y = parseInt(y);
		switch (m) {
		case 2:
			if (y) {
				return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
			} else {
				return 29;
			}
		case 9:
		case 4:
		case 6:
		case 11:
			return 30;
		default:
			return 31
		}
	}
