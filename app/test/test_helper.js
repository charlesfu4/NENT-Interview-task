const Restaurant = require('../models/restaurant')

const initialRestaurant = JSON.parse(JSON.stringify([
  { 'opening_hours':['Monday: 11:00 AM – 3:00 PM','Tuesday: 11:00 AM – 3:00 PM','Wednesday: 11:00 AM – 3:00 PM','Thursday: 11:00 AM – 3:00 PM','Friday: 11:00 AM – 3:00 PM','Saturday: Closed','Sunday: Closed'],'address':'Repslagargatan 8, 118 46 Stockholm, Sweden','phone_number':'08-641 20 77','location':{ 'lat':59.31781179999999,'lng':18.0701277 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Tamarindo','price_level':1,'rating':4.4,'google_maps_url':'https://maps.google.com/?cid=9369167126300605621','website':'http://www.tamarindo.se/','photo':'https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg','id':0 },
  { 'opening_hours':['Monday: 8:00 AM – 9:00 PM','Tuesday: 8:00 AM – 9:00 PM','Wednesday: 8:00 AM – 9:00 PM','Thursday: 8:00 AM – 9:00 PM','Friday: 8:00 AM – 9:00 PM','Saturday: 9:00 AM – 9:00 PM','Sunday: 9:00 AM – 9:00 PM'],'address':'Brännkyrkagatan 62, 118 23 Stockholm, Sweden','phone_number':'08-613 36 00','location':{ 'lat':59.318825,'lng':18.0561621 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png','name':'Paradiset Södermalm','rating':4.2,'google_maps_url':'https://maps.google.com/?cid=11539250592858637665','website':'http://www.paradiset.com/','photo':'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg','id':1 },
  { 'opening_hours':['Monday: 11:00 AM – 8:00 PM','Tuesday: 11:00 AM – 8:00 PM','Wednesday: 11:00 AM – 8:00 PM','Thursday: 11:00 AM – 8:00 PM','Friday: 11:00 AM – 8:00 PM','Saturday: 12:00 – 8:00 PM','Sunday: 12:00 – 8:00 PM'],'address':'Bällstavägen 36, 168 65 Bromma, Sweden','phone_number':'070-733 11 28','location':{ 'lat':59.36073769999999,'lng':17.9548819 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Bun Meat Bun','price_level':1,'rating':4.3,'google_maps_url':'https://maps.google.com/?cid=106830997729029427','website':'http://www.bunmeatbun.se/','photo':'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg','id':2 },
  { 'opening_hours':['Monday: 11:00 AM – 9:00 PM','Tuesday: 11:00 AM – 9:00 PM','Wednesday: 11:00 AM – 9:00 PM','Thursday: 11:00 AM – 9:00 PM','Friday: 11:00 AM – 9:00 PM','Saturday: 11:00 AM – 9:00 PM','Sunday: 11:00 AM – 9:00 PM'],'address':'Hornstulls strand 6, 117 39 Stockholm, Sweden','phone_number':'08-84 42 85','location':{ 'lat':59.3133916,'lng':18.0330903 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Loopen','rating':4,'google_maps_url':'https://maps.google.com/?cid=3423128986776255378','website':'http://loopen.se/','photo':'https://cdn.pixabay.com/photo/2017/08/30/17/25/restaurant-2697945_1280.jpg','id':3 },
  { 'opening_hours':['Monday: 11:30 AM – 2:00 PM','Tuesday: 11:30 AM – 2:00 PM, 5:00 – 11:00 PM','Wednesday: 11:30 AM – 2:00 PM, 5:00 – 11:00 PM','Thursday: 11:30 AM – 2:00 PM, 5:00 – 11:00 PM','Friday: 11:30 AM – 2:00 PM, 5:00 – 11:00 PM','Saturday: 5:00 – 11:00 PM','Sunday: Closed'],'address':'Tjärhovsgatan 5, 116 21 Stockholm, Sweden','phone_number':'08-33 03 88','location':{ 'lat':59.31526739999999,'lng':18.0765177 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Madam 마담','rating':4.3,'google_maps_url':'https://maps.google.com/?cid=6186057809588508498','website':'http://madamsthlm.se/','photo':'https://cdn.pixabay.com/photo/2016/11/18/15/53/breakfast-1835478_1280.jpg','id':4 },
  { 'opening_hours':['Monday: 11:00 AM – 12:00 AM','Tuesday: 11:00 AM – 12:00 AM','Wednesday: 11:00 AM – 12:00 AM','Thursday: 11:00 AM – 12:00 AM','Friday: 11:00 AM – 12:00 AM','Saturday: 12:00 PM – 12:00 AM','Sunday: 12:00 PM – 12:00 AM'],'address':'116 25 Stockholm, Sweden','phone_number':'08-640 80 83','location':{ 'lat':59.3155162,'lng':18.073553 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Babylon','price_level':2,'rating':3.8,'google_maps_url':'https://maps.google.com/?cid=14237525037946153707','photo':'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_1280.jpg','id':5 },
  { 'opening_hours':['Monday: 11:00 AM – 10:00 PM','Tuesday: 11:00 AM – 10:00 PM','Wednesday: 11:00 AM – 10:00 PM','Thursday: 11:00 AM – 10:00 PM','Friday: 11:00 AM – 12:00 AM','Saturday: 12:00 – 11:00 PM','Sunday: 12:00 – 9:00 PM'],'address':'Bysistorget 4, 118 21 Stockholm, Sweden','phone_number':'08-10 00 03','location':{ 'lat':59.3184579,'lng':18.0563148 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Barrels Burgers \u0026 Beer','rating':4.1,'google_maps_url':'https://maps.google.com/?cid=15296992169215013586','website':'http://barrels.se/','photo':'https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg','id':6 },
  { 'opening_hours':['Monday: 11:00 AM – 9:00 PM','Tuesday: 11:00 AM – 9:00 PM','Wednesday: 11:00 AM – 9:00 PM','Thursday: 11:00 AM – 9:00 PM','Friday: 11:00 AM – 9:00 PM','Saturday: 12:00 – 8:00 PM','Sunday: Closed'],'address':'Blecktornsgränd 8, 118 24 Stockholm, Sweden','phone_number':'070-452 06 38','location':{ 'lat':59.31981279999999,'lng':18.0625521 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'A Bowl Poke Poke','price_level':9,'rating':4.7,'google_maps_url':'https://maps.google.com/?cid=2226110701748628927','website':'http://www.abowlpokepoke.com/','photo':'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg','id':7 },
  { 'opening_hours':['Monday: Closed','Tuesday: 4:00 – 9:00 PM','Wednesday: 12:00 – 9:00 PM','Thursday: 12:00 – 9:00 PM','Friday: 12:00 – 11:00 PM','Saturday: 12:00 – 11:00 PM','Sunday: 12:00 – 8:00 PM'],'address':'Skånegatan 87, 116 35 Stockholm, Sweden','phone_number':'08-642 20 60','location':{ 'lat':59.3130688,'lng':18.0844272 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'FLFL','rating':3.9,'google_maps_url':'https://maps.google.com/?cid=7846619336429231074','website':'http://www.flfl.se/','photo':'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_1280.jpg','id':8 },
  { 'opening_hours':['Monday: 10:00 AM – 8:00 PM','Tuesday: 10:00 AM – 8:00 PM','Wednesday: 10:00 AM – 8:00 PM','Thursday: 10:00 AM – 8:00 PM','Friday: 10:00 AM – 9:00 PM','Saturday: 10:00 AM – 9:00 PM','Sunday: 11:00 AM – 8:00 PM'],'address':'Medborgarplatsen 3, 118 26 Stockholm, Sweden','phone_number':'08-121 472 24','location':{ 'lat':59.3141587,'lng':18.0710614 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Bun Meat Bun','price_level':9,'rating':4.3,'google_maps_url':'https://maps.google.com/?cid=6434627606158070983','website':'http://www.bunmeatbun.se/','photo':'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg','id':10 },
  { 'opening_hours':['Monday: 11:00 AM – 8:00 PM','Tuesday: 11:00 AM – 8:00 PM','Wednesday: 11:00 AM – 8:00 PM','Thursday: 11:00 AM – 8:00 PM','Friday: 11:00 AM – 8:00 PM','Saturday: 11:30 AM – 6:00 PM','Sunday: Closed'],'address':'Ringvägen 123, 116 61 Stockholm, Sweden','phone_number':'08-408 111 69','location':{ 'lat':59.3080448,'lng':18.0769318 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Shaka Shaka','rating':4.2,'google_maps_url':'https://maps.google.com/?cid=1439976408853645661','website':'http://www.shakashaka.se/','photo':'https://cdn.pixabay.com/photo/2017/08/30/17/25/restaurant-2697945_1280.jpg','id':11 },
  { 'opening_hours':['Monday: 10:00 AM – 9:00 PM','Tuesday: 10:00 AM – 9:00 PM','Wednesday: 10:00 AM – 9:00 PM','Thursday: 10:00 AM – 9:00 PM','Friday: 10:00 AM – 10:00 PM','Saturday: 12:00 – 10:00 PM','Sunday: Closed'],'address':'Ringvägen 145, 116 61 Stockholm, Sweden','phone_number':'08-640 58 01','location':{ 'lat':59.308961,'lng':18.0820416 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Reggev Hummus','rating':4.6,'google_maps_url':'https://maps.google.com/?cid=7383572400238714388','website':'http://www.reggevhummus.se/','photo':'https://cdn.pixabay.com/photo/2017/08/30/17/25/restaurant-2697945_1280.jpg','id':12 },
  { 'opening_hours':['Monday: 11:00 AM – 11:00 PM','Tuesday: 11:00 AM – 11:00 PM','Wednesday: 11:00 AM – 11:00 PM','Thursday: 11:00 AM – 11:00 PM','Friday: 11:00 AM – 12:00 AM','Saturday: 1:00 PM – 12:00 AM','Sunday: 1:00 – 11:00 PM'],'address':'Hornsgatan 85, 117 26 Stockholm, Sweden','phone_number':'08-658 65 01','location':{ 'lat':59.31706109999999,'lng':18.0490723 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Ellora','price_level':2,'rating':4.1,'google_maps_url':'https://maps.google.com/?cid=15020581083796985469','website':'http://www.ellora.nu/','photo':'https://cdn.pixabay.com/photo/2017/08/30/17/25/restaurant-2697945_1280.jpg','id':13 },
  { 'opening_hours':['Monday: Closed','Tuesday: 11:30 AM – 9:00 PM','Wednesday: 11:30 AM – 9:00 PM','Thursday: 11:30 AM – 9:00 PM','Friday: 11:30 AM – 9:00 PM','Saturday: 12:00 – 5:00 PM','Sunday: Closed'],'address':'Timmermansgatan 15, 118 25 Stockholm, Sweden','phone_number':'08-452 97 77','location':{ 'lat':59.3187691,'lng':18.0598774 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'MamaWolf','rating':4.5,'google_maps_url':'https://maps.google.com/?cid=2488565800507065300','website':'http://mamawolf.nu/','photo':'https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg','id':14 },
  { 'opening_hours':['Monday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM','Tuesday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM','Wednesday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM','Thursday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM','Friday: 11:30 AM – 2:00 PM, 5:00 – 10:00 PM','Saturday: 12:00 – 4:00 PM, 6:00 – 10:00 PM','Sunday: 12:00 – 6:00 PM'],'address':'Hornsgatan 66, 118 21 Stockholm, Sweden','phone_number':'08-643 77 76','location':{ 'lat':59.318622,'lng':18.0594741 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Barobao','price_level':2,'rating':4.1,'google_maps_url':'https://maps.google.com/?cid=17075219553066823109','website':'http://www.barobao.com/','photo':'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg','id':15 },
  { 'opening_hours':['Monday: 7:00 AM – 3:00 PM','Tuesday: 7:00 AM – 3:00 PM','Wednesday: 7:00 AM – 3:00 PM','Thursday: 7:00 AM – 3:00 PM','Friday: 7:00 AM – 3:00 PM','Saturday: 9:00 AM – 4:00 PM','Sunday: 9:00 AM – 4:00 PM'],'address':'Bondegatan 64, 116 29 Stockholm, Sweden','phone_number':'076-249 67 01','location':{ 'lat':59.31365759999999,'lng':18.0865138 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png','name':'Café Pom \u0026 Flora','price_level':2,'rating':4.2,'google_maps_url':'https://maps.google.com/?cid=2735225504325079641','website':'http://pomochflora.se/','photo':'https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg','id':16 },
  { 'opening_hours':['Monday: 11:00 AM – 3:00 PM','Tuesday: 11:00 AM – 3:00 PM','Wednesday: 11:00 AM – 3:00 PM','Thursday: 11:00 AM – 3:00 PM','Friday: 11:00 AM – 3:00 PM','Saturday: Closed','Sunday: Closed'],'address':'Wollmar Yxkullsgatan 3, 118 50 Stockholm, Sweden','phone_number':'08-640 81 47','location':{ 'lat':59.31686799999999,'lng':18.0647339 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png','name':'Café En Halv Trappa Ner','price_level':2,'rating':4.4,'google_maps_url':'https://maps.google.com/?cid=7460859340783071549','website':'http://enhalvtrappaner.se/','photo':'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg','id':17 },
  { 'opening_hours':['Monday: 10:30 AM – 9:00 PM','Tuesday: 10:30 AM – 9:00 PM','Wednesday: 10:30 AM – 9:00 PM','Thursday: 10:30 AM – 9:00 PM','Friday: 10:30 AM – 9:00 PM','Saturday: 12:00 – 9:00 PM','Sunday: 12:00 – 9:00 PM'],'address':'Åsögatan 90, 118 29 Stockholm, Sweden','phone_number':'08-643 34 18','location':{ 'lat':59.312206,'lng':18.069166 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Forno Söder','rating':3.8,'google_maps_url':'https://maps.google.com/?cid=890276347479752195','website':'http://www.fornosoder.com/','photo':'https://cdn.pixabay.com/photo/2015/03/26/10/07/restaurant-690975_1280.jpg','id':18 },
  { 'opening_hours':['Monday: 11:00 AM – 2:00 PM','Tuesday: 11:00 AM – 2:00 PM','Wednesday: 11:00 AM – 2:00 PM','Thursday: 11:00 AM – 2:00 PM','Friday: 11:00 AM – 2:00 PM','Saturday: 12:00 – 3:00 PM','Sunday: 12:00 – 3:00 PM'],'address':'Sankt Eriksgatan 70, 113 20 Stockholm, Sweden','location':{ 'lat':59.33852690000001,'lng':18.0360656 },'icon':'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png','name':'Totemo Ramen','price_level':2,'rating':4.6,'google_maps_url':'https://maps.google.com/?cid=13272901681487613635','website':'https://www.totemoramen.com/','photo':'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg','id':19 }
]))

const restaurantInDb = async () => {
  const restaurants = await Restaurant.find({})
  return restaurants.map(restaurant => restaurant)
}

module.exports = {
  initialRestaurant, restaurantInDb
}