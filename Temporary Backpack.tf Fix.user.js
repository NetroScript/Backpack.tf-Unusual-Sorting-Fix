// ==UserScript==
// @name         Temporary Backpack.tf Unusual Sorting Fix
// @namespace    https://github.com/NetroScript
// @version      0.1
// @description  Fixes the order of Unusuals at https://backpack.tf/unusual/ + enables sorting again
// @author       Netroscript
// @match        https://backpack.tf/unusual/*
// @match        http://backpack.tf/unusual/*
// @require      http://code.jquery.com/jquery-2.2.4.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==


(function() {
	'use strict';

	var items = $("li.item");
	var css = `
<style>
.sbuttoncon {
position: fixed;
width: 230px;
height: auto;
margin-left: -250px;
}

.sbutton {
margin: 10px;
padding: 5px 10px;
text-align: center;
background: linear-gradient(to bottom,#2c3c48 0,#0f1419 100%);
box-shadow: inset 0 1px 0 #4a677b, 0px 0px 5px black;
color: white;
cursor: pointer;
}
</style>
`;
	var html = `<div class="sbuttoncon">
<div class="sbutton" id="sbp">Sort by Price</div>
<div class="sbutton" id="sbe">Sort by Number in existance</div>
<div class="sbutton" id="sbn">Sort by Name</div>
<div class="sbutton" id="sbei">Sort by Effect-ID</div>
</div>`;

	$("#page-content").prepend(html);
	$("head").append(css);

	var sortType = "data-price";
	var osortType = "data-price";
	var toggle = 0;
	var text = false;

	function sortbV(){



		items.sort(function (a, b) {



			if(toggle && sortType == osortType){
				var tmp = a;
				a = b;
				b = tmp;
			}

			if(text){
				if($(a).attr(sortType).toLowerCase() < $(b).attr(sortType).toLowerCase()) return -1;
				if($(a).attr(sortType).toLowerCase() > $(b).attr(sortType).toLowerCase()) return 1;
				return 0;
			}
			return parseFloat($(b).attr(sortType)) - parseFloat($(a).attr(sortType)) ;

		})
			.appendTo("#unusual-pricelist");
		if(toggle && sortType == osortType){
			toggle=false;
		}else toggle = true;
		osortType = sortType;
	};

	sortbV();

	$("#sbp").click(function(){
		sortType = "data-price";
		sortbV();
	});
	$("#sbe").click(function(){
		sortType = "data-exist";
		sortbV();
	});
	$("#sbn").click(function(){
		sortType = "title";
		text = true;
		sortbV();
		text = false;
	});
	$("#sbei").click(function(){
		sortType = "data-effect_id";
		sortbV();
	});


})();