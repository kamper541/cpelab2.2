let  firebaseConfig = {
    apiKey: "AIzaSyD3mHTj4tzO2mitUvrYF24ql32d8jG864s",
    authDomain: "cpeweb-3785f.firebaseapp.com",
    databaseURL: "https://cpeweb-3785f.firebaseio.com",
    projectId: "cpeweb-3785f",
    storageBucket: "cpeweb-3785f.appspot.com",
    messagingSenderId: "808031242380",
    appId: "1:808031242380:web:6495471edda7e42a7c53a9",
    measurementId: "G-T3YX2C83PD"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let gpa = 0;
let credit = 0;
let charG = '';
$('button').click( () => {
    if($('#subject').val() == ''){ 
        alert("Enter Some Value!!!!!!"); 
        return;
    }
    // console.log($('#subject').val())
db.collection("users").add({
    subject: $('#subject').val(),
    credit : Number($('#credit').val()),
    grade: Number($('#grade').val()),
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    $('#subject').val('')
    Number($('#grade').val('4'))
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
})

db.collection('users').orderBy("subject").onSnapshot(doc => {
    let table = $('tbody')[0]
    //$('tbody tr').forEach(item => item.remove())
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    gpa = 0
    credit = 0
    doc.forEach(item => {
        // console.log(item.data())
        switch(item.data().grade){
            case 0 : charG = 'F'; break;
            case 1 : charG = 'D'; break;
            case 2 : charG = 'C'; break;
            case 3 : charG = 'B'; break;
            case 4 : charG = 'A'; break;
        }
            let row = table.insertRow(-1)
            let firstCell = row.insertCell(0)
            let secondCell = row.insertCell(1)
            let thirdCell = row.insertCell(2)
            firstCell.textContent = item.data().subject
            secondCell.textContent = charG
            thirdCell.textContent = item.data().credit
            gpa += (item.data().grade * item.data().credit);
            credit += item.data().credit;
            //console.log(firstCell.textContent)
            // let subjectCell = document.createTextNode(item.data().subject)
            // let gradeCell = document.createTextNode(item.data().grade)
            // firstCell.appendChild(subjectCell)
            // secondCell.appendChild(gradeCell)
    })
    console.log(gpa / credit)
    let result = '';
    
    switch(gpa / credit){
        case 0 : result = 'F'; break;
        case 1 : result = 'D'; break;
        case 2 : result = 'C'; break;
        case 3 : result = 'B'; break;
        case 4 : result = 'A'; break;
    }

    $('h4').text("Your Grade : " + result)
})

db.collection('users').where('grade','>' , 0).get().then(res => {
    res.forEach(item => console.log(item.data()))
})