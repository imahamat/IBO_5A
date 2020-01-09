db.employees.findOne()

// ---------------------------------------------------------------------------------------------//
// **** Requête 1 : Demande des caractéristiques basique d’un employé par numéro d’employé. *** //
// ---------------------------------------------------------------------------------------------//

db.employees.find({"Emp_no":"10001"}).pretty()


// -------------------------------------------------------------------//
// *** Requête 2 : Demander tous les employés d’un département. ***   //
// -------------------------------------------------------------------//


db.employees.find({"Dept_emp.Dept_no":"d009"}).pretty() // en fonction du numéro de department 

db.employees.find({"Dept_emp.Name":"Customer Service"}).pretty() // en fonction du nom de department 


// ---------------------------------------------------------------------------------------------------//
// *** Requête 3 : La moyenne des salaires et le nombre d’employés pour un numéro de département. *** //
// ---------------------------------------------------------------------------------------------------//

db.employees.aggregate([{$unwind:"$Salaries"},{$unwind:"$Dept_emp"},{$group:{_id:"$Dept_emp.Dept_no",nb_employee:{$sum:1}, 
    moyenne_salaire:{$avg:"$Salaries.salary"}}}])

// --------------------------------------------------------------------------------------------------//
// *** Requête 4: Nombre de salariés pour un numéro de département groupé par tranche de 3 mois. *** //
// --------------------------------------------------------------------------------------------------//

db.employees.aggregate([{$unwind:"$Salaries"}, {$unwind:"$Dept_emp"},

     {$group:{_id:{ Dept_emp:"$Dept_emp.Dept_no", nb_salarie:{$sum:1},
      date:{$divide:[{$subtract:["$Salaries.To_date","$Salaries.From_date"]}, 7889400000]}  }}},
      
     ])
     
  
// -----------------------------------------------------------------------------------------------------------------------------------------//
// *** Requête 5 : Salair et Temps moyen qu’une personne reste par catégorie de poste  avant de passer au poste de catégorie supérieur. *** //
// -----------------------------------------------------------------------------------------------------------------------------------------//
 
     
     
    
// 3 mois vaut 7889400000 millisecondes
// 1 mois vaut 2629800000 millisecondes

// -----------------------------------------------------------------------------------------------------------------//
// *** Requête 6: Le salaire moyen par département pour chaque catégorie d’employé (senior/classique/assistant. *** //
// -----------------------------------------------------------------------------------------------------------------//

db.employees.aggregate([{$unwind:"$Salaries"},{$unwind:"$Titles"},{$unwind:"$Dept_emp"},
{$group:{_id:{Dept_emp:"$Dept_emp.Dept_no",title:"$Titles.title"},moyenne_salaire:{$avg:"$Salaries.salary"}}}])

// -------------------------------------------------------------------------------------//
// *** Requête 7 : Map/Reduce : 70 employés restés le plus longtemps dans la boîte. *** //
// -------------------------------------------------------------------------------------//



db.employees.findOne()


db.employees.mapReduce(
function () 
{ 
    for(var i=0; this.Salaries.length; i++){
        
    var array = [];
    for(var j=0; array.length; j++)
    {
     array[i]=(this.Salaries[i].From_date - this.Salaries[i].To_date)/2629800000;
    }
    array.sort(function(a, b){return b-a});
    for(var k=0; 70; k++)
    {
      emit(this.Emp_no, 1);
    } 
    }
}  
,function (key, values) { return Array.sum(values);}, 
{"query":{}, "out":{"inline":true}});




// ----


Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}


//Set the two dates
var y2k  = new Date(2000, 0, 1); 
var Jan1st2010 = new Date(y2k.getFullYear() + 10, y2k.getMonth(), y2k.getDate());
var today= new Date();
//displays 726
console.log( 'Days since ' 
           + Jan1st2010.toLocaleDateString() + ': ' 
           + Date.daysBetween(Jan1st2010, today));


// -----








/* Modification de la version de la date 
// Hire_date & Birth_date
db.employees.find().forEach( 
    function(employee){
        employee.Hire_date  = new ISODate(employee.Hire_date);
        employee.Birth_date = new ISODate(employee.Birth_date);
       
        db.employees.save(employee);
    }
)
// Salaries

db.employees.find( {"Salaries" : {"$exists":1}} ).forEach( 
    function(employee){ 
           
        for(i=0 ; i<employee.Salaries.length ; i++){
          for(i=0 ; i<employee.Salaries.length ; i++)
       {employee.Salaries[i].From_date=new ISODate(employee.Salaries[i].From_date);  
        employee.Salaries[i].To_date=new ISODate(employee.Salaries[i].To_date);}     
        }
        
        //employee.note = total;
        db.employees.save(employee);
    }
);

// Titles

db.employees.find( {"Titles" : {"$exists":1}} ).forEach( 
    function(employee){  
          
       for(i=0 ; i<employee.Titles.length ; i++)
       {employee.Titles[i].From_date=new ISODate(employee.Titles[i].From_date);  
        employee.Titles[i].To_date=new ISODate(employee.Titles[i].To_date);} 
        
        
        db.employees.save(employee);
    }
);

// Dept_emp

db.employees.find( {"Dept_emp" : {"$exists":1}} ).forEach( 
    function(employee){  
          
       for(i=0 ; i<employee.Dept_emp.length ; i++)
       {employee.Dept_emp[i].From_date=new ISODate(employee.Dept_emp[i].From_date);  
        employee.Dept_emp[i].To_date=new ISODate(employee.Dept_emp[i].To_date);}
        
        
        db.employees.save(employee);
    }
);

// Tous reunis mais ne marche pas
db.employees.find().forEach( 
    function(employee){
       for(i=0 ; i<employee.Salaries.length ; i++)
       {employee.Salaries[i].From_date=new ISODate(employee.Salaries[i].From_date);  
        employee.Salaries[i].To_date=new ISODate(employee.Salaries[i].To_date);} 
                 
       for(i=0 ; i<employee.Titles.length ; i++)
       {employee.Titles[i].From_date=new ISODate(employee.Titles[i].From_date);  
        employee.Titles[i].To_date=new ISODate(employee.Titles[i].To_date);} 
        
       for(i=0 ; i<employee.Dept_emp.length ; i++)
       {employee.Dept_emp[i].From_date=new ISODate(employee.Dept_emp[i].From_date);  
        employee.Dept_emp[i].To_date=new ISODate(employee.Dept_emp[i].To_date);} 
         
        }
        employee.Hire_date  = new ISODate(employee.Hire_date);
        employee.Birth_date = new ISODate(employee.Birth_date);
       
        db.employee.save(employee);
    }
)
 */
 