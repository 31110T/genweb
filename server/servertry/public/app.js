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

            var randscale = Math.floor(Math.random() * 30);
            var smallran = Math.floor(Math.random() * 10);
            console.log(randscale)
            console.log(rando)
            document.querySelectorAll('.hand').forEach(function(element) {
                console.log(count)
                    // console.log(randscale)
                if (count % 2 == 0) {
                    var image = `<div class="pic" style="left:${rando * count}px;
                    top:${rando * count}px; ;"><img src="pixel/${count}.png"></div>`;
                    element.insertAdjacentHTML('beforeend', image)
                    console.log(element);
                } else {
                    var image = `<div class="pic" style="bottom:${rando* count}px;
                    right:${rando * count}px;"><img src="pixel/${randscale}.png"></div>`;
                    element.insertAdjacentHTML('beforeend', image)
                    console.log(element);
                }


            });

        } else if (change.type == 'removed') {
            let div = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(div);
        }
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