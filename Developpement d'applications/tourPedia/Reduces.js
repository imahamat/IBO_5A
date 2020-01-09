// *** 3T Software Labs, Studio 3T: MapReduce Job ****

// Variable for db
var __3tsoftwarelabs_db = "local";

// Variable for map
var __3tsoftwarelabs_map = function () {

    // Enter the JavaScript for the map function here
    // You can access the current document as 'this'
    //
    // Available functions: assert(), BinData(), DBPointer(), DBRef(), doassert(), emit(), gc()
    //                      HexData(), hex_md5(), isNumber(), isObject(), ISODate(), isString()
    //                      Map(), MD5(), NumberInt(), NumberLong(), ObjectId(), print()
    //                      printjson(), printjsononeline(), sleep(), Timestamp(), tojson()
    //                      tojsononeline(), tojsonObject(), UUID(), version()
    //
    // Available properties: args, MaxKey, MinKey
    if(this.services && this.services.length > 0)
        emit(null, {"services " : this.services});
        
    sources = {};
    for(var i=0; i<this.services.length; i++){
    reviews =  this.services[i];
    if(sources[review.source]){
    
      src = sources[review.source];
      if(!Array.contains(src.langs, review.language)){
          src.langs.push(review.language);src.nb++;
        }
          else
          src = {"langs" : [review.language], "nb" : 1};
          sources[review.source] = src;
        }
    }
    for(key in sources) emit (key, sources[key]);   
       
  //  emit(key, value);
}
;

// Variable for reduce
var __3tsoftwarelabs_reduce = function (key, values) {

    // Enter the JavaScript for the reduce function here
    // 'values' is a list of objects as emit()'ed by the map() function
    // Make sure the object your return is of the same type as the ones emit()'ed
    //
    // Available functions: assert(), BinData(), DBPointer(), DBRef(), doassert(), emit(), gc()
    //                      HexData(), hex_md5(), isNumber(), isObject(), ISODate(), isString()
    //                      Map(), MD5(), NumberInt(), NumberLong(), ObjectId(), print()
    //                      printjson(), printjsononeline(), sleep(), Timestamp(), tojson()
    //                      tojsononeline(), tojsonObject(), UUID(), version()
    //
    // Available properties: args, MaxKey, MinKey

     var distinct = values[0].nb;
    var langs = values[0].langs;
    for(i=1; i<values.length; i++)
    {
        l = values[i];
        for(j=0; j<l.langs.length; j++)
        if(!Array.contains(langs, l.langs[j])){
            langs.push(l.langs[j]; distinct++;
            }
    }
    return {"langs" : langs, "nb" : distinct};
    
    //var reducedValue = "services " + output;

    //return reducedValue;
}
;

db.runCommand({ 
    mapReduce: "Paris",
    map: __3tsoftwarelabs_map,
    reduce: __3tsoftwarelabs_reduce,
    out: {"inline": 1},
    query: { },
    sort: { },
    inputDB: "local",
 });
