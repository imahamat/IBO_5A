//db.getCollection("Paris").find({})

// ---- 1 ---- 
mapFunction = function() {
    if(this.services && this.services.length > 0)
        emit(null, {"services" : this.services});
}

reduceFunction = function(key, values) {
    return {"services" :values};
} 

// ---- 2 ---- 


mapFunction = function() {
    if(this.services && this.services.length > 0)
        emit(null, {"services" : this.services});
}

reduceFunction = function(key, values) {
    output = new Array();
    for(i=0; i<values.length; i++) {
        for(j=0;j<values[i].services.length;j++) {
            services = values[i].services[j];
            if(!Array.contains (output, service))
                output.push(service);
    };
}
 return {"services" :output};
} 

// ---- 1.2.1.3 Donner les noms et notes de lieux ayant au moins une note de 4 ou plus ... ---- 

mapFunction = function() {
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
};

reduceFunction = function(key, values) {
    var distinct = values[0].nb;
    var langs = values[0].langs;
    for(i=1; i<values.length; i++)
    {
        l = values[i];
        for(j=0; j<l.langs.length; j++)
        if(!Array.contains(langs, l.langs[j])){
            langs.push(l.langs[j]); distinct++;
            }
    }
    return {"langs" : langs, "nb" : distinct};
}


// ---- 1.2.1.4 Donner la langue et note des commentaires de lieux ... ---- 

mapFunction = function() {
    for(var i=0; i<this.reviews.length; i++){
    review = this.review[i]
    if(review.time) annee =  review.time.substring(0,4);
    else annee = null;
    emit({"src": review.source, "y" : annee}, 1);
    }
};


reduceFunction = function(key, values) {
    return Array.sum(values);};
    
queryParam = {"query" : {}, "out" : "result"};    
db.tourPedia.mapReduce(mapFunction, reduceFunction, queryParam);
db.result.aggregate([{$group : {"_id : “$_id.src", "moy": {$avg : "$value" }}}]);


// ---- 1.2.1.5 Coordonnées GPS des lieux dont l’adresse contient ”rue de rome” ---- 


map














