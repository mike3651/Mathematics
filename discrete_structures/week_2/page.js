/* Michael Wilson
 * MATH 322 - discrete structures */

(function() {

	'use strict';

	// keeps track of multiple keys pressed at the same time
	var key_map = {};

	// value of the conversion to and from a keycode to an int
	var KEY_CONVERSION = 48;

	// the array that will be used for pascal's triangle
	var a = [];

	// keeps track of a temporary result 
	var result = 0;

	// keeps track of the operands
	var first_operand, second_operand, operator;

	// list of keys that represent numbers 0 - 9
	var number_keys = [];
	var number_list;

	// keeps track of the keywords that represent functions
	var keywords = ["derivate", "integral"];

	window.onload = function() {
		reset();

		$("#pascal-triangle").click(generatePascalTriangle);
		
		for(var i = 0; i <= 9; i++) {
			number_keys[i] = i;
		}

		calculator();
	}

	// function that sets up everything with the calculator
	function calculator() {				
		clicks();

		$(window).keyup((e) => {			
			if(e.which == 192) {
				setAllToFalse();		
			}


		});

		$(window).keypress((e) => {		
			var temp_val = e.which - KEY_CONVERSION;
			key_map[e.which] = e.type == "keypress";
			if(findIndex(temp_val, number_keys) != -1) {
				appendValue(temp_val);				
				delayHighlight("#number-" + temp_val);
			}				
			// alert(e.which + " " + key_map[96])	
			if(key_map[192] == true) {		
				//alert(e.which);
				if(e.which == 99) {
					delayHighlight("#clear");
					reset();
				} else if(e.which == 61) {
					delayHighlight("#add");
				} else if(e.which == 115) {
					delayHighlight("#subtract");
				} else if(e.which == 109) {
					delayHighlight("#multiply");
				} else if(e.which == 100) {
					delayHighlight("#divide");
				}

			}
		});				
	}

	// function that deals with highlighting
	function delayHighlight(id) {
		$(id).addClass("highlight");				
			setTimeout(() => {
				$(id).removeClass("highlight");
		}, 100);
	}

	// function that sets up all of the clicks
	function clicks() {
		number_list = document.getElementsByClassName("number");
		for(var i = 0; i < number_list.length; i++) {
			$(number_list[i]).click(() => {
				appendValue($(this).html())
			});
		}	

		$("#add").click(getFirstValue); 
		$("#subtract").click(getFirstValue); 
		$("#multiply").click(getFirstValue); 
		$("#divide").click(getFirstValue); 
		$("#result").click(calculate);

		// clear the input
		$("#clear").click(() => {
			reset();			
		});		
	}

	// helper method to find the value in an array
	function findIndex(value, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(value == arr[i]) {
				return i;
			}
		}
		return -1;
	}

	// function that appends a value to the current operand
	function appendValue(value) {
		$("#operand").val($("#operand").val() + parseInt(value));
	}

	// function that deals with simple calculations
	function getFirstValue() {
		first_operand = parseInt($("#operand").val());
		operator = $(this).html();		
		$("#operand").val("");
		$("#operator-in-use").html("Operator in use: " + operator);
	}

	// calculates an expression
	function calculate() {
		if(first_operand != null && operator != "") {
			second_operand = parseInt($("#operand").val());
			switch(operator) {
				case "+": 
					result = first_operand + second_operand;
					break;
				case "-":
					result = first_operand - second_operand;
					break;
				case "*":
					result = first_operand * second_operand;
					break;
				case "/":
					result = first_operand / second_operand;
					break;			
			}
			$("#operand").val(result);
		}
	}	

	// factorial function
	function factorial(n) {
		var x = 1;
		for(var i = 1; i <= n; i++) {
			x *= i;
		}
		return x;
	}

	// binomial function	
	function binomial(n, r) {
		return factorial(n)/(factorial(n - r) * factorial(r));
	}

	// binomial theorem
	// representation: (x + y) to the power of n
	// @return str The string that represents the appropriate summation
	function binomialTheorem(n) {
		str = "";
		for(var i = 0; i < n; i++) {
			str += binomial(n, i) + "x to the power of " + (n - i) + " y to the power of " + x;
		}
		return str;
	}

	// creates an array that generates pascal's triangle
	// @param rows The number of rows of the triangle to be displayed 
	function pascalTriangle(rows) {		
		for(var i = 0; i < rows; i++) {		
			// generate a new array at each array spot				
			a[i] = new Array();
		}

		for(var i = 0; i < rows; i++) {						
			for(var j = 0; j <= i; j++) {
				a[i].push(binomial(i, j));
			}
		}
		//console.log("number of rows: " + rows + " array length: " + a.length);
	}

	// function that populates the view with pascal's triangle
	function generatePascalTriangle() {	
		reset();			
		var value = parseInt($("#size").val());
		pascalTriangle(value);
		showPascalTriangle();
	}

	// displays the pascal triangle to the viewport
	function showPascalTriangle() {
		var str = "";
		for(var i = 0; i < a.length; i++) {
			str += "<p>";
			for(var j = 0; j < a.length/2 - i; j++) {
				str += "&#09;";				
			}
			for(var j = 0; j < a[i].length; j++) {
				str += a[i][j] + " ";
			}
			str += "</p>";
		}

		// append the string to the view
		// representation: <p>a[0][0] </p><p>a[1][0] a[1][1] </p><p>a[2][0] a[2][1] a[2][2] </p>
		$("#view").html(str);
	}

	// @return The identity of the current pascal value 
	function pascalIdentity(n, k) {
		return binomial(n - 1, k - 1) + binomial(n - 1, k);
	}	

	// sets all of the mappings to false
	function setAllToFalse() {
		for(var i = 0; i < key_map.length; i++) {
			key_map[i] = false;
		}
	}

	// function resets the states of the variables that we have used
	function reset() {
		a = [];
		result = null;
		first_operand = null;
		second_operand = null;
		operator = "";
		$("#operand").val("");
	}
})();

