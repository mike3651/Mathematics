/* Simple javascript file
 * Michael Wilson */

(function() {
	window.onload = function() {
		$("#calculate-power-rule").click(function() {
			$("#view-power-rule").html("<p>" + evaluate($("#input-power-rule").val()) + "</p>");
		});
		$("#calculate-addition-rule").click(additionRule);
	}

	// function that calculates the power rule expression
	// param -> variable : variable in use
	// param -> power : power that the variable is raised to
	// param -> coefficient : any leading coefficients, default is 1
	function derivate(variable, power, coefficient) {
		// alert(String(coefficient * power));			
		return String(coefficient * power) + String(variable) 
			+ "<sup>" +  String(power - 1) + "</sup>";
	}

	// function that calculates the derivatives using the concepts of the addition rule
	function additionRule() {
		var expression = $("#input-addition-rule").val();
		var f_x, g_x, return_expression, i = 1, maxLength = expression.length;
		var d_f_x, d_g_x, additonResult, coefficient, power, variable, arr;
		// deal with the f_x
		return_expression = subExpression(i, maxLength, expression);
		f_x = return_expression[0];
		i = return_expression[1];

		// find the new starting index
		i = findStart(expression, "[", i);
		return_expression = subExpression(i + 1, maxLength, expression);
		g_x = return_expression[0];
		// console.log("f(x): " + f_x);
		// console.log("g(x): " + g_x);
		
		d_f_x = evaluate(f_x);
		d_g_x = evaluate(g_x);

		// console.log("d[f(x)]: " + d_f_x);
		// console.log("d[g(x)]: " + d_g_x);

		$("#view-addition-rule").html("<p>" + d_f_x + "+" +  d_g_x + "</p>");

	}

	// splits an a simple expression 
	// param -> str : The string to split
	function evaluate(str) {
		var arr, variable, coefficient, power;
		arr = str.split("^");
		variable = arr[0];				
		coefficient = variable.split("x")[0];
		// check to see if the coefficient exists
		if(coefficient == null) {
			coefficient = 1;
		}

		power = arr[1];
		// check to see if the power exists
		if(power == null) {
			power = 1;
		}

		variable = findVariable(arr[0]);
		return derivate(variable, power, coefficient);
	}

	// finds and returns the first instance of a non number in a string
	// param -> str : The string to look through 	
	function findVariable(str) {				
		console.log("String length: "  + str.length);
		for(var i = 0; i < str.length; i++) {	
			//console.log("Current character: " + str[i]);
			if(!Number.isInteger(parseInt(str[i]))) {
				return str[i];				
			}
		}
	} 

	// iterates through an expression and returns a string representing the wanted sub expression
	// param -> i : Starting point
	// param -> maxLength : Length of the expression
	// param -> str : The expression
	// return -> The sub expression
	function subExpression(i, maxLength, str) {
		var sub_exp = "";
		while(i < str.length 
			&& str[i] != "]") {
			sub_exp += str[i];
			i++;
		}
		return [sub_exp, i];
	}

	// finds the start of an expression
	// param -> str : The string to process
	// param -> startState : The ending condition
	// param -> index : The starting position in the string
	// return -> The index of the start point, -1 if not found
	function findStart(str, startState, index) {
		for(var i = index; i < str.length; i++) {
			if(str[i] == startState) {
				return i;
			}
		}

		// know start state found
		return -1;
	}
})();