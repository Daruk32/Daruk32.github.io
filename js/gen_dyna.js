var tab_categorie = new Array();

//Promotions
import {tab_promo} from '.././categorie/Promotions/Promotions.js'
tab_categorie[1] = tab_promo;

//Boissons
import {tab_boisson} from '.././categorie/Boissons/Boissons.js'
tab_categorie[2] = tab_boisson;

//Bonbons
import {tab_bonbon} from '.././categorie/Bonbons/Bonbons.js'
tab_categorie[3] = tab_bonbon;

//Cafés
import {tab_cafe} from '.././categorie/Cafés/Cafés.js'
tab_categorie[4] = tab_cafe;

//Chips
import {tab_chips} from '.././categorie/Chips/Chips.js'
tab_categorie[5] = tab_chips;

//Chocolats
import {tab_chocolat} from '.././categorie/Chocolats/Chocolats.js'
tab_categorie[6] = tab_chocolat;

//Conserves
import {tab_conserves} from '.././categorie/Conserves/Conserves.js'
tab_categorie[7] = tab_conserves;

//Epicerie salée
import {tab_epiceriesal} from '.././categorie/Epiceriesalée/Epiceriesalée.js'
tab_categorie[8] = tab_epiceriesal;

//Epicerie sucrée
import {tab_epiceriesuc} from '.././categorie/Epiceriesucrée/Epicerie sucrée.js'
tab_categorie[9] = tab_epiceriesuc;

//Epices
import {tab_epices} from '.././categorie/Epices/Epices.js'
tab_categorie[10] = tab_epices;

//Farines
import {tab_farines} from '.././categorie/Farines/Farines.js'
tab_categorie[11] = tab_farines;

//Fruits secs
import {tab_fruitsecs} from '.././categorie/Fruitssecs/Fruits secs.js'
tab_categorie[12] = tab_fruitsecs;

//Gâteaux
import {tab_gateau} from '.././categorie/Gateaux/Gateaux.js'
tab_categorie[13] = tab_gateau;

//Hygiène
import {tab_hygiene} from '.././categorie/Hygiène/Hygiène.js'
tab_categorie[14] = tab_hygiene;

//Légumes secs
import {tab_legumesecs} from '.././categorie/Légumessecs/Légumes secs.js'
tab_categorie[15] = tab_legumesecs;

//Thés
import {tab_the} from '.././categorie/Thés/Thés.js'
tab_categorie[16] = tab_the;



//Tableau des titres des catégories
var tabtitre = ["Test", "Promotions", "Boissons", "Bonbons", "Cafés", "Chips", "Chocolats", "Conserves", "&Eacute;picerie salée", "&Eacute;picerie sucrée", "&Eacute;pices", "Farines", "Fruits secs", "Gâteaux", "Hygiène", "Légumes secs", "Thés"];



//Fonction de génération des catégories à la page d'accueil - index.html
window.liste_categorie = function liste_categorie() {

    var quantite_cat = tab_categorie.length;
    
        for ( let categ = 1; categ < quantite_cat; categ++) {

            if (tab_categorie[categ].length == 0) {
                document.getElementById("tableau_image_categorie").innerHTML+="";
            }
            else {
                var pre = "<div class='categs'><a onClick=\"window.location.href='categorie.html?categorie=";
                var mid1 = categ;
                var mid2 = "'\"><img src='";
                var mid3 = tab_categorie[categ][0].url;
                var mid4 = "' alt='presentation' class='cats'></a><div class='nomcats'>";
                var mid5 = tabtitre[categ];
                var fin = "</div></div>";

                document.getElementById("tableau_image_categorie").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+fin;
            }
        }
}



//Fonction de génération du bandeau des pages - categorie.html + panier.html
window.bandeau = function bandeau() {

    var nombre_cat = tabtitre.length;

    for ( let categ = 1; categ < nombre_cat; categ++) {

        if (tab_categorie[categ].length == 0) {
            document.getElementById("bande").innerHTML+="";
        }
        else {
            var pre = "<li><a onclick='changeCategorie(";
            var mid1 = categ;
            var mid2 = ")'>";
            var mid3 = tabtitre[categ];
            var mid4 = "</a></li>";

            document.getElementById("bande").innerHTML+=pre+mid1+mid2+mid3+mid4;
        }
    }
}



//Fonction de génération des 5 images/textes des catégories à partir de la page Index.html
window.chargement = function chargement() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var number = urlParams.get('categorie');

    var longueur = tab_categorie[number].length;

    var titre = tabtitre[number];

    for ( let cat_index = 0; cat_index < longueur; cat_index++) {

        if (longueur == 0) {
            document.getElementById("descriptif_cat").innerHTML+="";
        }
        else {
            var pre = "<div class='un_produit'><a><img src='";
            var mid1 = tab_categorie[number][cat_index].url;
            var mid2 ="' class='produit' onclick='fiche_detaillee(";
            var mid3 = number;
            var mid4 = ", ";
            var mid5 = cat_index;
            var mid6 = ")'></a><div class='legend_produit'>";
            var mid7 = tab_categorie[number][cat_index].libelle;
            var fin = "</div></div>";
        
            document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+mid6+mid7+fin;
            document.getElementById("ajout_titre_categorie").innerHTML=titre;
        }
    }
}



//Fonction de génération des 5 images/textes des catégories de la page Catégorie
window.changeCategorie = function changeCategorie(number) {
    var longueur = tab_categorie[number].length;

    var titre = tabtitre[number];

    document.getElementById("descriptif_cat").innerHTML="";

    for ( let cat_index = 0; cat_index < longueur; cat_index++) {

        if (longueur == 0) {
            document.getElementById("descriptif_cat").innerHTML+="";
        }
        else {
            var pre = "<div class='un_produit'><a><img src='";
            var mid1 = tab_categorie[number][cat_index].url;
            var mid2 ="' class='produit' onclick='fiche_detaillee(";
            var mid3 = number;
            var mid4 = ", ";
            var mid5 = cat_index;
            var mid6 = ")'></a><div class='legend_produit'>";
            var mid7 = tab_categorie[number][cat_index].libelle;
            var fin = "</div></div>";
        
            document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+mid6+mid7+fin;
            document.getElementById("ajout_titre_categorie").innerHTML=titre;
        }
    }
}



//Fonction de génération de la fiche détaillée du produit
window.fiche_detaillee = function fiche_detaillee(number, cat_index) {

    var fd1 = "<div id='description_produit'><img src='";
    var fd2 = tab_categorie[number][cat_index].url;
    var fd3 = "' alt='Conserves' class='cats'></div><div id='description_produit2'><p>";
    var fd4 = tab_categorie[number][cat_index].libelle;
    var fd5 = "<p>";
    var fd51 = tab_categorie[number][cat_index].texte;
    var fd52 = "</p><div id='produit_action'><span id='id_prix_produit'>Prix : "
    var fd6 = tab_categorie[number][cat_index].prix;
    var fd7 = "</span><span id='id_quantite_produit'>Quantité : </span><input type='number' id='quantite_article' name='nombrearticle' min='0' max='100'><button id='id_bouton_ajout_produit'>Ajouter au panier</button></div></div>";
    document.getElementById("fiche_produit").innerHTML=fd1+fd2+fd3+fd4+fd5+fd51+fd52+fd6+fd7;
}