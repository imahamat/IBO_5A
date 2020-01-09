//db.getCollection("employee").find({})
//db.employee.findOne()

// ---------------------------------------------------------------------------------------------//
// **** Requête 1 : Demande des caractéristiques basique d’un employé par numéro d’employé. *** //
// ---------------------------------------------------------------------------------------------//

db.employee.find({"Emp_no":"10001"}).pretty()

// -------------------------------------------------------------------//
// *** Requête 2 : Demander tous les employés d’un département. ***   //
// -------------------------------------------------------------------//


//db.employee.find({"Dept_emp.Dept_no":"d009"}).pretty() // en fonciton du numéro de department 

//db.employee.find({"Dept_emp.Name":"Customer Service"}).pretty() // en fonction du nom de department 


// ---------------------------------------------------------------------------------------------------//
// *** Requête 3 : La moyenne des salaires et le nombre d’employés pour un numéro de département. *** //
// ---------------------------------------------------------------------------------------------------//

//db.employee.aggregate([{$unwind:"$Salaries"},{$group:{"_id":"$Dept_emp.Dept_no", "moyenne":{$avg:"$Salaries.salary"}}}, {$sort:{"moyenne":-1}}])

//db.employee.aggregate({$match:{"Emp_no":{"$exists":1}}},{ $group : {"_id":"$Dept_emp.Dept_no","nb_employee":{$sum:1}}})

//db.employee.find({"Dept_emp.Dept_no":"d003"}).pretty()
// change the type of salary to int before computing the avearage

//db.employee.find( {"Salaries.salary" : {"$exists":1}} ).forEach( 
//    function(employee){
//        salary = 0;
//        for(i=0 ; i<employee.Salaries.length ; i++){
//            if(employee.Salaries[i].salary != 0)  
//             { employee.Salaries[i].salary=parseInt(employee.Salaries[i].salary);
//               }    
//        }
//        //employee.note = total;
//        db.employee.save(employee);
//    }
//);

//db.employee.aggregate({$group:{_id:"$Dept_emp.Dept_no",nb_employee:{$sum:1},  moyenne_salaire:{$avg:"$Salaries.salary"}}},{$sort:{nb_employee:-1}})


// --------------------------------------------------------------------------------------------------//
// *** Requête 4: Nombre de salariés pour un numéro de département groupé par tranche de 3 mois. *** //
// --------------------------------------------------------------------------------------------------//


//db.employee.aggregate({$group:{_id:"$Dept_emp.Dept_no","salary":{$sum:1}}})

//26/06/1986 00:00:00

//varMatch = {$match:{"Salaries.salary":{"$exists":1}}};
//varProject = {$project:{"Salaries.salary":1}};

//db.employee.aggregate([ {$match:{"Salaries.salary":{"$exists":1}}}, {$project:{"Salaries.salary":1}} ] );

//db.employee.aggregate([{$match:{"Salaries":{"$exists":1}}}, {$group:{"_id":"$Salaries.salary","total":{$sum:"Salaries.salary"}}}]);


//varUnwind = {$unwind:"$Salaries"}
//varGroup = {$group:{"_id":"$Dept_emp.Dept_no", "nb_salarie":{$sum:"$Salaries.salary"}}}
//varSort = {$sort:{"nb_salarie":-1}}

//db.employee.aggregate([{$unwind:"$Salaries"},{$group:{"_id":"$Dept_emp.Dept_no", "nb_salarie":{$sum:"$Salaries.salary"}}}])



//db.employee.aggregate([{$unwind:"$Salaries"},{$group:{_id:"$Dept_emp.Dept_no", "moyenne":{$avg:"$Salaries.salary"}}}, {$sort:{"moyenne":-1}}])


//db.employee.aggregate([{$unwind:"$Salaries"},{$group:{_id:"$Dept_emp.Dept_no", "nb_salarie":{$sum:1}}}, {$sort:{"nb_salarie":-1}}])

// -------------------------------------------------------------------------------------------------------------------------------/







