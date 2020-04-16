function initMap() {


	//create a basic map first
	var map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 4, mapTypeId: "satellite",
			center: {
				lat: 60, lng: -110
			}
		}
	);

	//load the geojson
	map.data.loadGeoJson('canada_provinces.geojson');
	//set up event listeners
	map.data.addListener('mouseover', showData);
	map.data.addListener('mouseout', removeData);
	var resultSet;//variable to hold the api response
	function loadAPIData() {
		//function to get stats
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.open("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Canada");
		xhr.setRequestHeader("x-rapidapi-host", "covid-19-coronavirus-statistics.p.rapidapi.com");
		xhr.setRequestHeader("x-rapidapi-key", "Your_Key");
		xhr.onload = function () {
			var result= JSON.parse(xhr.responseText);
			resultSet= JSON.parse(xhr.responseText).data.covid19Stats;
		}

		xhr.send();
	}
	loadAPIData();//call the function


	function showData(e){
		//function to show data from div
		console.log(e);
		document.getElementById('data-box').style.display="block";
		var province= e.feature.getProperty('keyId');
		console.log(province);
		//array.find to return the element matching the province name.
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
		var regionStats= resultSet.find(element => element.keyId.toUpperCase() === province.toUpperCase());
		//console.log(regionStats);
		document.getElementById('name').textContent=province;
		document.getElementById('confirmed').textContent="Confirmed: "+regionStats.confirmed;
		document.getElementById('deaths').textContent="Deaths: "+regionStats.deaths;
	}
	function removeData(e){
		//function to remove data from div
		document.getElementById('data-box').style.display="none";
	}

}




































