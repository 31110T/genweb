$('#landing').on('click', function() {
    $(this).closest("#landing").remove();
});


/**
 * A Javascript module to keep list (and count) of online users in a Firebase web app - by isolated rooms or globally.
 *
 * Initial idea from - http://stackoverflow.com/a/15982583/228648
 * 
 * @url : https://gist.github.com/ajaxray/17d6ec5107d2f816cc8a284ce4d7242e
 * @auther : Anis Uddin Ahmad <anis.programmer@gmail.com>
 * 
 * w:ajaxray.com | t:@ajaxray
 */
var Gathering = (function() {

    var randomName = function() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    };

    function Gathering(databaseReference, roomName) {

        this.db = databaseReference;
        this.roomName = roomName || 'globe';

        this.room = this.db.ref("gatherings/" + encodeURIComponent(this.roomName));
        this.myName = '';
        this.user = null;

        this.join = function(uid, displayName) {
            if (this.user) {
                console.error('Already joined.');
                return false;
            }

            this.myName = displayName || 'Anonymous - ' + randomName();
            this.user = uid ? this.room.child(uid) : this.room.push();

            // Add user to presence list when online.
            var self = this;
            var presenceRef = this.db.ref(".info/connected");
            presenceRef.on("value", function(snap) {
                if (snap.val()) {
                    self.user.onDisconnect().remove();
                    self.user.set(self.myName);
                }
            });

            return this.myName;
        };

        this.leave = function() {
            this.user.remove();
            this.myName = '';
        };

        this.over = function() {
            this.room.remove();
        };

        this.onUpdated = function(callback) {
            if ('function' == typeof callback) {
                this.room.on("value", function(snap) {
                    callback(snap.numChildren(), snap.val());
                });
            } else {
                console.error('You have to pass a callback function to onUpdated(). That function will be called (with user count and hash of users as param) every time the user list changed.');
            }
        };
    }

    return Gathering;
})();







const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
var rando = Math.floor(Math.random() * 200) + 1;

// create element & render cafe
function renderCafe(doc) {
    let div = document.createElement('div');
    div.classList.add('hand');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    cross.classList.add('remove')
    cross.style.opacity = 0;

    div.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    div.appendChild(name);
    div.appendChild(city);
    div.appendChild(cross);

    cafeList.appendChild(div);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}
// $(function() {
//     $(".hand").draggable();
// });

// getting data not realtimne i think
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});

// real-time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderCafe(change.doc);


            //my stuff
            // document.querySelectorAll('.hand').forEach(function(element) {
            //     var count = $('div.hand').length;
            //     console.log(count);
            //     var image = `<div class="pic" style="left:${rando*50}px;
            //     // top:${rando*10}px;"><img src="pixel/${count}.png"></div>`;

            //     console.log(rando);
            //     element.insertAdjacentHTML('beforeend', image)
            //     console.log(element);
            // });

            var count = $('div.hand').length;
            var randscale = Math.floor(Math.random() * 28 + 1);
            var smallran = Math.floor(Math.random() * 10);
            console.log(randscale)
            console.log(rando)
            document.querySelectorAll('.hand').forEach(function(element) {
                console.log(count)
                    // console.log(randscale)
                if (count % 2 == 0) {
                    var image = `<div class="pic" style="left:${randscale * 50}px;
                    top:${randscale * 20}px; ;"><img src="pixel/${randscale}.png"></div>`;
                    element.insertAdjacentHTML('beforeend', image)
                    console.log(element);
                    if (count > 25) {
                        cafeList.removeChild(div);
                        cross.style.opacity = 0;
                    }



                } else {
                    var image = `<div class="pic" style="bottom:${smallran* count}px;
                    right:${randscale * count}px;"><img src="pixel/${randscale}.png"></div>`;
                    element.insertAdjacentHTML('beforeend', image)
                    console.log(element);
                    cross.style.opacity = 0;
                }


            });

        } else if

        (change.type == 'removed') {
            let div = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(div);
        }
        // } else if 
        // (change.type == 'removed') {
        //     let div = cafeList.querySelector('[data-id=' + change.doc.id + ']');
        //     cafeList.removeChild(div);
        // }


    });
});



// db.collection("users_input").doc(randomID).set({
//     userEntery: "putithere"
// })  create a new document


// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });




// function authenticate(){
//     firebase.auth().signInAnonymously()
//       .then(() => {
//         pickQuestion();
//         loadReflections();
//       })
//       .catch((error) => {
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           console.error(errorCode, errorMessage);
//     });
//   }

//   authenticate()