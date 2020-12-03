
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	document.getElementById("landing_div").style.display = "none";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("regis_div").style.display = "none";
	document.getElementById("qrScan").style.display = "none";
    var user = firebase.auth().currentUser;
	var email_id = user.email;
		var attendance = db.collection("pengguna").doc(user.uid);
		
		//var docRef = db.collection("cities").doc("SF");

		attendance.get().then(function(doc) {
			if (doc.exists) {
				//console.log(doc.data().attendance_status);
				nama = (doc.data().name);
				kehadiran = (doc.data().attendance_status);
				document.getElementById("user_para1").innerHTML = "Selamat datang : " + nama + " " + email_id ;
				document.getElementById("user_para2").innerHTML = "Kehadiran : " + kehadiran;
				return kehadiran;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}return kehadiran; 
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});

		//document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + " " + user.uid + " " ;
		//console.log(kehadiran);
		//console.log(user.uid);
    if(user != null){
		
		
    }

  } else {
    // No user is signed in.
	document.getElementById("landing_div").style.display = "block";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("regis_div").style.display = "none";
	document.getElementById("qrScan").style.display = "none";
  }
});

function gotologin(){
	document.getElementById("landing_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("regis_div").style.display = "none";
	document.getElementById("qrScan").style.display = "none";
}

function gotoregis(){
	document.getElementById("landing_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("regis_div").style.display = "block";
	document.getElementById("qrScan").style.display = "none";
}

function home(){
	document.getElementById("landing_div").style.display = "block";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("regis_div").style.display = "none";
	document.getElementById("qrScan").style.display = "none";
}


function login(){

  var userEmail = document.getElementById("email_login").value;
  var userPass = document.getElementById("password_login").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
    
    email = user.email;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
    console.log(uid);
    console.log(email)
    }
  
}

function generateBarCode(uid)
            {
                
                var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + uid + '&amp;size=50x50';
                return url;
            }


function signup(){
  var useremail = document.getElementById("email_field");
  var userpass = document.getElementById("password_field");
  var namauser = document.getElementById("nama_field");
  function sendEmail(useremail, userid,nama) {
 console.log(namauser.value);
  Email.send({
  Host: "smtp.gmail.com",
  Username : "Admin google mail account",
  Password : "Admin google mail password",
  To : useremail,
  From : "Admin google mail account",
  Subject : "QR - Code Registration",
  Body : "Halo " + nama + "! Berikut dilampirkan QR Code milikmu!" ,
  Attachments : [
  	{
  		name : "QR - Attendance.png",
  		path : generateBarCode(userid)
  	}]
  }).then(
  	message => alert("Berhasil daftar! QR Code sudah dikirim ke emailmu!")
  );
}
  //firebase.auth().createUserWithEmailAndPassword(useremail.value,userpass.value);
  firebase.auth().createUserWithEmailAndPassword(useremail.value,userpass.value).then(cred => {
    sendEmail(useremail.value, cred.user.uid, namauser.value);
	
	return db.collection('pengguna').doc(cred.user.uid).set({
	  	
      uid: cred.user.uid,
	  name: namauser.value,
	  attendance_status: false
    });
	console.log(namauser.value);
	
	
 
  
  })
}

function scan(){
  window.location.href = "testscan.html";

}

function goBack(){
  window.location.href = "index.html";

}



function logout(){
  firebase.auth().signOut();
}







