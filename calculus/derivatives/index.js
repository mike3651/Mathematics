(function() {
	window.onload = function() {
		$("#calculate").click(function() {
			var variable, power, coefficient;
			var arr = $("#expression").val().split("^");
			variable = arr[0];
			coefficient = variable.split("x")[0];
			variable = "x";				
			power = arr[1];
			derivate(variable, power, coefficient);
		});
	}

	// calculates the basic derivate and returns it as a string
	function derivate(variable, power, coefficient) {	
		console.log(power);
		console.log(variable);			
		$("#view").html("<p>" + String(coefficient * power) + String(variable) 
			+ "<sup>" +  String(power - 1) + "</sup></p>");
	}
})();