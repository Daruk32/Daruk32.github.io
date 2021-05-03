// variables pour stocker le nombre d'articles et leurs noms
var quantite_articles;
var nom_articles;

// récupère les informations stockées dans les cookies
quantite_articles = parseInt(readCookie('quantite_articles') ? readCookie('quantite_articles') : 0);
nom_articles = readCookie('nom_articles') ? JSON.parse(readCookie('nom_articles')) : [];

// hydrate le panier
var articles = '';
nom_articles.forEach(function(article) {
   articles += '<li id="'+ article.id +'"><a href="'+ article.url +'">'+ article.name +'<br><small>Quantité : <span class="qt">'+ article.qt +'</span></small></a></li>';
});

$('#cart-dropdown').prepend(articles);

// click bouton ajout panier
$('.add-to-cart').click(function() {

    // récupération des infos du produit
    var $this = $(this);
    var id = $this.attr('data-id');
    var name = $this.attr('data-name');
    var price = $this.attr('data-price');
    var weight = $this.attr('data-weight');
    var url = $this.attr('data-url');
    var qt = parseInt($('#qt').val());
    quantite_articles += qt;

    // mise à jour du nombre de produit dans le widget
    $('#in-cart-articles-num').html(quantite_articles);

    var newArticle = true;

    // vérifie si l'article est pas déjà dans le panier
    nom_articles.forEach(function(v) {
        // si l'article est déjà présent, on incrémente la quantité
        if (v.id == id) {
            newArticle = false;
            v.qt += qt;
            $('#'+ id).html('<a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a>');
        }
    });

    // s'il est nouveau, on l'ajoute
    if (newArticle) {
        $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ name +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');

        nom_articles.push({
            id: id,
            name: name,
            price: price,
            weight: weight,
            qt: qt,
            url: url
        });
    }

    // sauvegarde le panier
    saveCart(quantite_articles, nom_articles);
});

// si on est sur la page ayant pour url monsite.fr/panier/
if (window.location.pathname == '/panier/') {
    var articles = '';
    var subTotal = 0;
    var total;
    var weight = 0;

    /* on parcourt notre array et on créé les lignes du tableau pour nos articles :
    * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
    * - son prix
    * - la dernière colonne permet de modifier la quantité et de supprimer l'article
    *
    * On met aussi à jour le sous total et le poids total de la commande
    */
    nom_articles.forEach(function(v) {
        // opération sur un entier pour éviter les problèmes d'arrondis
        var itemPrice = v.price.replace(',', '.') * 1000;
        articles += '<tr data-id="'+ v.id +'">\
             <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
             <td>'+ v.price +'€</td>\
             <td><span class="qt">'+ v.qt +'</span> <span class="qt-minus">–</span> <span class="qt-plus">+</span> \
             <a class="delete-item">Supprimer</a></td></tr>';
        subTotal += v.price.replace(',', '.') * v.qt;
        weight += v.weight * v.qt;
    });

    // on reconverti notre résultat en décimal
    subTotal = subTotal / 1000;

    // On insère le contenu du tableau et le sous total
    $('#cart-tablebody').empty().html(articles);
    $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));

    // lorsqu'on clique sur le "+" du panier
    $('.qt-plus').on('click', function() {
        var $this = $(this);

        // récupère la quantité actuelle et l'id de l'article
        var qt = parseInt($this.prevAll('.qt').html());
        var id = $this.parent().parent().attr('data-id');
        var artWeight = parseInt($this.parent().parent().attr('data-weight'));

        // met à jour la quantité et le poids
        quantite_articles += 1;
        weight += artWeight;
        $this.prevAll('.qt').html(qt + 1);
        $('#in-cart-articles-num').html(quantite_articles);
        $('#'+ id + ' .qt').html(qt + 1);

        // met à jour nom_articles
        nom_articles.forEach(function(v) {
            // on incrémente la qt
            if (v.id == id) {
                v.qt += 1;

                // récupération du prix
                // on effectue tous les calculs sur des entiers
                subTotal = ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
            }
        });

        // met à jour la quantité du widget et sauvegarde le panier
        saveCart(quantite_articles, nom_articles);
    });

    // quantité -
    $('.qt-minus').click(function() {
        var $this = $(this);
        var qt = parseInt($this.prevAll('.qt').html());
        var id = $this.parent().parent().attr('data-id');
        var artWeight = parseInt($this.parent().parent().attr('data-weight'));

        if (qt > 1) {
            // maj qt
            quantite_articles -= 1;
            weight -= artWeight;
            $this.prevAll('.qt').html(qt - 1);
            $('#in-cart-articles-num').html(quantite_articles);
            $('#'+ id + ' .qt').html(qt - 1);

            nom_articles.forEach(function(v) {
                // on décrémente la qt
                if (v.id == id) {
                    v.qt -= 1;

                    // récupération du prix
                    // on effectue tous les calculs sur des entiers
                    subTotal = ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
                }
            });

            $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
            saveCart(quantite_articles, nom_articles);
        }
    });

    // suppression d'un article
    $('.delete-item').click(function() {
        var $this = $(this);
        var qt = parseInt($this.prevAll('.qt').html());
        var id = $this.parent().parent().attr('data-id');
        var artWeight = parseInt($this.parent().parent().attr('data-weight'));
        var arrayId = 0;
        var price;

        // maj qt
        quantite_articles -= qt;
        $('#in-cart-articles-num').html(quantite_articles);

        // supprime l'item du DOM
        $this.parent().parent().hide(600);
        $('#'+ id).remove();

        nom_articles.forEach(function(v) {
            // on récupère l'id de l'article dans l'array
            if (v.id == id) {
                // on met à jour le sous total et retire l'article de l'array
                // as usual, calcul sur des entiers
                var itemPrice = v.price.replace(',', '.') * 1000;
                subTotal -= (itemPrice * qt) / 1000;
                weight -= artWeight * qt;
                nom_articles.splice(arrayId, 1);

                return false;
            }

            arrayId++;
        });

        $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
        saveCart(quantite_articles, nom_articles);
    });
}









//Créer un code js faisant prenant en compte l'évolution de la quantité d'un tel produit pour le calcul du total
function commande() {








    document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+fin;


}


//Fonction Sauvegarde du Panier
function saveCart(quantite_articles, nom_articles) {
    CreateCookie('quantite_articles', quantite_articles, 5);
    CreateCookie('nom_articles', JSON.stringify(nom_articles), 5);
}

//Le calcul du montant du panier avec le bouton pour mettre à jour
//Le bouton doit vérifier qu'aucune quantité est à 0 (éliminable par auto?)
//Le bouton doit afficher que "La commande est en cours"
//Le bouton doit ensuite effacer le panier
function ajout() {








    document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+fin;


}

//La fonction corbeille : retirer une ligne et mettre à jour le total
function delete() {








    document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+fin;


}

