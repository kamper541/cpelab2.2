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
let m = 0;
let f = 0;
let p = m + f;
$('#sub').click( () => {
    let email = document.getElementById("email").value;
    let n = document.getElementById("name").value;
    if($('#name').val() == ''){ 
        alert("Enter Some Value!!!!!!"); 
        return;
    }
    function validateEmail($email) {
        let emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
        return emailReg.test( $email );
      }
      if( !validateEmail(email) || email == "") {
        alert("Please enter a valid Email Address.");
        return;
        }
    // console.log($('#subject').val())
db.collection("users").add({
    Name: $('#name').val(),
    Gender : ($('#gender').val()),
    Email: ($('#email').val()),
    Text: ($('#textt').val()),
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    $('#name').val('')
    $('#gender').val('Male')
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
})



db.collection('users').orderBy("Name").onSnapshot(doc => {
    let table = $('tbody')[0]
    //$('tbody tr').forEach(item => item.remove())
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    $("tbody tr").remove()
    doc.forEach(item => {
        // console.log(item.data())
        p = m + f;
        let str = String(item.data().Email);
        let last = "";

        for (let i = 0; i < str.length; i++) {
            if (i==0||str[i]=='@'||str[i]=='.') {
                last += str[i]
            } else {
                last +='x'
            }
            
        }
            let row = table.insertRow(-1)
            let firstCell = row.insertCell(0)
            let secondCell = row.insertCell(1)
            let thirdCell = row.insertCell(2)
            firstCell.textContent = item.data().Name;
            thirdCell.textContent = last;

            if(item.data().Gender == 0){
                f ++;
                secondCell.textContent = 'Female'
            }else if(item.data().Gender == 1){
                m ++;
                secondCell.textContent = 'Male';
            }
            // gpa += (item.data().grade * item.data().credit);
            // credit += item.data().credit;
            //console.log(firstCell.textContent)
            // let subjectCell = document.createTextNode(item.data().subject)
            // let gradeCell = document.createTextNode(item.data().grade)
            // firstCell.appendChild(subjectCell)
            // secondCell.appendChild(gradeCell)
            let options = {
                title: {
                    text: "Contact Gender Ratio"
                },
                subtitles: [{
                    text: "By 2020"
                }],
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label}  - {y}",
                    dataPoints: [
                        { y: m/(m+f), label: "Male" },
                        { y: f/(m+f), label: "Female" },
                        // { y: 1.49, label: "Windows 8" },
                        // { y: 6.98, label: "Windows XP" },
                        // { y: 6.53, label: "Windows 8.1" },
                        // { y: 2.45, label: "Linux" },
                        // { y: 3.32, label: "Mac OS X 10.12" },
                    ]
                }]
            };
            $("#chartContainer").CanvasJSChart(options);
    })
    // console.log(gpa / credit)
       
    // $('h4').text(`Male: ${pm}%, Femal: ${pf}%`);
})

db.collection('users').where('Gender','>' , -1).get().then(res => {
    res.forEach(item => console.log(item.data()))
})