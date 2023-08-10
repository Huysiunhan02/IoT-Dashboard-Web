// Firebase===================================
const firebaseConfig = {
  apiKey: "AIzaSyCZVKAo_ljr9XZmhgvLT0sAzHf7JZ9nKX4",
  authDomain: "smarthome-3e614.firebaseapp.com",
  databaseURL: "https://smarthome-3e614-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthome-3e614",
  storageBucket: "smarthome-3e614.appspot.com",
  messagingSenderId: "690588379732",
  appId: "1:690588379732:web:aaf3f948223f493f9d5bc1",
  measurementId: "G-3KK60QX0YZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var DataRef = firebase.database().ref('Cambien');

// const contactFormDB = firebase.database().ref("Form");

// document.getElementById('contactForm').addEventListener('submit', submitForm);

// function submitForm(e) {
//   e.preventDefault();
//   var name = getElementVal("name");
//   var message = getElementVal("massage");
//   // saveMassage(name, message);
//   writeUserData(23124, name, message);
//   alert('submit okey');
// }

// const saveMassage = (name, message) => {
//   var newcontact = contactFormDB.push();

//   newcontact.set({
//     name: name,
//     massage: message
//   });
// }

// const getElementVal = (id) => {
//   return document.getElementById(id).value;
// }

// function writeUserData(userId, name, message) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     message: message
//   });
// }
// Biểu đồ===================================
var data = {
  labels: [0],
  datasets: [
    {
      label: 'Nhiệt độ',
      data: [25],
      borderColor: '#287bff',
      tension: 0.4
    }
  ]
};

var config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    scales: {
      y: {
        min: 10,
        max: 45,
      }
    }
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart'
    //   }
    // }
  }
};
var data2 = {
  labels: [0],
  datasets: [
    {
      label: 'kWh',
      data: [90],
      borderColor: '#287bff',
      tension: 0.4
    }
  ]
};
var config2 = {
  type: 'line',
  data: data2,
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 200,
      }
    }
  }
};
var myChart = new Chart(
  document.getElementById('myChart1'),
  config
);
var myChart2 = new Chart(
  document.getElementById('myChart2'),
  config2
);

//button card
var devicesref = firebase.database().ref('Thietbi');

var cards = document.querySelectorAll(".card-box .card");
cards.forEach(function (card) {
  var checkbox = card.querySelector("input[type=checkbox]");
  var field = card.dataset.field;
  var cardName = card.querySelector(".card-name");
  var iconBox = card.querySelector(".icon-box");
  var icon = iconBox.querySelector("i");

  card.addEventListener("click", function () {
    checkbox.checked = !checkbox.checked;
    updateCardState();
  });

  checkbox.addEventListener("change", function () {
    updateCardState();
  });

  function updateCardState() {
    var value = checkbox.checked ? 1 : 0;
    devicesref.child(field).set(value);
    if (checkbox.checked) {
      cardName.classList.add("checked");
      iconBox.classList.add("checked");

    } else {
      cardName.classList.remove("checked");
      iconBox.classList.remove("checked");

    }

    if (field === "quat") {
      if (checkbox.checked) {
        icon.classList.add("fa-spin");
      } else {
        icon.classList.remove("fa-spin");
      }
    }
  }
});

async function GetDataFormSheet() {
  let apiURL = `https://script.google.com/macros/s/AKfycbxQ-sZtcPznUa6MYrPG2Pk9u_ur7ggkkvoAPdEfgTd5VAkSKQ6Dp4JUwycphzb0Wq5z/exec`;
  let datas = await fetch(apiURL).then(res => res.json())
  console.log(datas);
  let dts = [];
  // datas = datas.reverse();
  for (let i = 0; i < 10; i++) {
    dts[i] = datas[i];
  }
  console.log(dts);
  dts = dts.reverse();
  dts.forEach(function(dt){
    data.labels.push(dt.time);
    data.datasets[0].data.push(dt.temp);
    data2.labels.push(dt.time);
    data2.datasets[0].data.push(dt.kwh);
  });
  myChart.update();
  myChart2.update();
}
async function proccessData(){
  await GetDataFormSheet();

  DataRef.child('NhietDo').on('value', (snapshot) => {
    const temp = snapshot.val();
    // document.getElementById('temp').innerHTML = `${temp}`;
    var now = new Date();
    now = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    if (data.datasets[0].data.length >= 10) {
      data.labels.shift();
      data.datasets[0].data.shift();
    }
    data.labels.push(now);
    // data.datasets[0].label = "Temperature:" + temp;
    data.datasets[0].data.push(temp);
    myChart.update();
  });
}

proccessData();
DataRef.child('DoAm').on('value', (snapshot) => {
  const humi = snapshot.val();

  // document.getElementById('humi').innerHTML = `${humi}`;
  document.getElementById('humidity').innerHTML = `${humi}<span>%</span>`;
  document.documentElement.style.setProperty('--humidity-value', humi);
});

var database = {
  "Acount": [
    {
      "name": "quanghuy",
      "pass": "huy123"
    },
    {
      "name": "ngocpro",
      "pass": "ngoc123"
    }
  ],
  "Cambien": {
    "AnhSang": 1,
    "DoAm": "76",
    "NhietDo": "30",
    "SoDien": 152
  },
  "Thietbi": {
    "cuaso": 0,
    "den": 0,
    "quat": 0,
    "tivi": 0
  },
  "users": {
    "23124": {
      "message": "hehe",
      "username": "Bùi Quang Huy"
    },
    "123abc": {
      "Devices": {
        "Humidity": 70,
        "ID": "smarthome_id",
        "Light1": 1,
        "Light2": 0,
        "Switch": 0,
        "Temp": 28
      },
      "mail": "buiquanghuy2k@gmail.com",
      "name": "Bùi Quang Huy",
      "pass": "huy123"
    }
  }
}
console.log(database['Acount'][0].name);


//đếm lượt truy cập
var numaccess = Number(localStorage.getItem('sum-access'));
numaccess += 1;
window.localStorage.setItem('sum-access', numaccess);