/* Michael Wilson
 * MATH 322 - discrete structures */

(function() {
	'use strict';

	// the array that will be used for pascal's triangle
	var a = [];

	window.onload = function() {
		$("#pascal-triangle").click(generatePascalTriangle);
	}

	// function that populates the view with pascal's triangle
	function generatePascalTriangle() {	
		reset();			
		var value = parseInt($("#size").val());
		pascalTriangle(value);
		showPascalTriangle();
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

	// function resets the states of the variables that we have used
	function reset() {
		a = [];
	}
})();

