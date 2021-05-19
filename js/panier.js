var count;

//Fonction Ajout quantité d'untel produit
function plus(number){
	var count = document.getElementById("count"+number).value;

		if (count == "") {
			count = 0;
		}

	count++;

    document.getElementById("count"+number).value = count;

    return count;
}

//Fonction Retire quantité d'untel produit
function minus(number){
	var count = document.getElementById("count"+number).value;

	if (count > 0) {
		count--;
	}

	document.getElementById("count"+number).value=count;

	return count;
}

