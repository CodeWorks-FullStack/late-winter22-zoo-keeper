console.log('welcome to the jungle');
let money = 0
let deadAnimals = 0

let animals = {
  koko: {
    hunger: 100,
    emoji: '🦍'
  },
  khan: {
    hunger: 100,
    emoji: '🐅'
  },
  gerrald:{
    hunger: 100,
     emoji: '🦖'
  },
  roody:{
    hunger: 100,
    emoji: '🦦'
  },
  tim: {
    hunger: 100,
    emoji: '🐢'
  },
  sebastian:{
    hunger: 100,
    emoji: '🦥'
  }
}
// NOTE arr collection
// let animalArr = [
//   {name: 'koko', hunger: 100, emoji: '🦍'},
//   {name: 'khan', hunger: 100, emoji: '🐅'},
// ...
// ]

// NOTE INJECTS animals into DOM (draws them)
function drawAnimals(){
  let template = ''
  for(let key in animals){
    let animal = animals[key]
    console.log(animal);
    template += `
    <div id="${key}" class="col-6 col-md-3 bg-secondary p-2 border border-dark shadow fence">
        <div class="pen">
          <marquee behavior="alternate" scrolldelay="${Math.random()*1000}" >
            <marquee behavior="alternate" direction="up" scrolldelay="${Math.random()*1000}">
              <h2 class="animal" onclick="feed('${key}')">
                ${animal.emoji}
              </h2>
            </marquee>
          </marquee>
        </div>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: ${animal.hunger}%;"
            aria-valuemin="0" aria-valuemax="100">${key}</div>
        </div>
      </div>
    `
    document.getElementById('pens').innerHTML = template
  }
}

// NOTE UPDATES animal elements in the DOM
function updateAnimal(name){
  // NOTE grabs the appropriate animal pen by the id/name
  let animalElm = document.getElementById(name)
  // console.log(animalElm)
  // NOTE searches the animal pen element for the div with the progress-bar class
  let bar = animalElm.querySelector('.progress-bar')
  // console.log(bar);
  // NOTE changes the width of progress bar to match the animals hunger
  // @ts-ignore
  bar.style.width = animals[name].hunger + '%'
  if(animals[name].hunger < 40){
    animalElm.querySelector('.animal').classList.add('hungry')
  } else {
    animalElm.querySelector('.animal').classList.remove('hungry')
  }
  if(animals[name].hunger <=0){
    animalElm.querySelector('.animal').innerText = '👻'
  }
}

function hunger(){
  console.log('the animals hunger');
  for(let key in animals){
    let animal = animals[key]
    if(animal.hunger > 0){
      animal.hunger -= 10
      if(animal.hunger <= 0){
        animal.hunger = 0
        console.error(key+ ' has perished, you will never financially recover')
        deadAnimals++
        // updateAnimal(key)
        if(deadAnimals == 3){
          document.querySelector('audio').play()
        }
      }
    }
    updateAnimal(key)
  }
}



function feed(name){
 let animal = animals[name]
 if(animal.hunger > 0){
   animal.hunger += 4
  }
  if(animal.hunger > 100){
    animal.hunger = 100
  }
  updateAnimal(name)
}

function getMoney(){
  for(let key in animals){
    let animal = animals[key]
    if(animal.hunger > 0){
      money++
    }
  }
  document.getElementById('money').innerText = money.toFixed(2)
}


drawAnimals()
let hungerInterval = setInterval(hunger, 2000)
let moneyInterval = setInterval(getMoney, 5000)