// factory

function createGuitar(stringsCount) {
  return {
    strings: stringsCount,
    frets: 24,
    fretBoardMaterial: "кедр",
    boardMaterial: "клён",
  };
}

const sixStringsGuitar = createGuitar(6);
const sevenStringsGuitar = createGuitar(7);


// builder

class Drink {
  constructor(settings) {
    const { base, milk, sugar, cream } = settings;

    this.base = base;
    this.milk = milk;
    this.sugar = sugar;
    this.cream = cream;
  }
}

class DrinkBuilder {
  settings = {
    base: "espresso",
  };

  addMilk = () => {
    this.settings.milk = true;
    return this;
  };

  addSugar = () => {
    this.settings.sugar = true;
    return this;
  };

  addCream = () => {
    this.settings.cream = true;
    return this;
  };

  bulder = () => new Drink(this.settings)
}

const latte =  new DrinkBuilder().addMilk().addSugar().bulder()


// singleton

class Sun {
    static instance = null

    //#constructor() {}

    static get instance () {
        if (this.instance) return this.instance

        this.instance - new this()
        return this.instance
    }
}

const sun = Sun.instance


// adapter

function fakeAPI() {
  return {
    entries: [
      {
        user_name: 'Александр',
        email_address: 'some@site.com',
        ID: '28',
      },
      {
        user_name: 'Мария',
        email_address: 'some@other-site.com',
        ID: '32',
      },
    ],
  }
}

const wantedRespons = [
  {
    userName: 'Александр',
    email: 'some@site.com',
    id: 28
  },
  {
    userName: 'Мария',
    email: 'some@other-site.com',
    id: '32'
  }
]

function responseToWantedAdapter(response) {
  return response.entries.map((entry) => ({
    userName: entry.user_name,
    email: entry.email_address,
    id: entry.ID,
  }))
}

const response = fakeAPI()
//console.log(response,'res')
const compatibleResponse = responseToWantedAdapter(response)
//console.log(compatibleResponse)


// facade

class CoffeeMachine {
  turnOn() {}
  getWaterLevel() {}
  getWater() {}
  turnOnHeater() {}
  turnOffHeater() {}
  getTemperature() {}
}

const machine = new CoffeeMachine()

function heatWater() {
  machine.turnOn()

  while(machine.getWaterLevel() < 1000 ) {
    machine.getWater()
  }

  machine.turnOnHeater()
  if(machine.getTemperature() >= 90) {
    machine.turnOffHeater()
  }
}
heatWater()


// decorator

const user = {
  name: 'Александр',
  email: 'example@site.com',
}

function update(name, email) {
  user.name = name
  user.email = email
}

function loggingDecorator(fn) {
  return function wrapped(...args) {
    return fn(...args)
  }
}

const updateWithLogging = loggingDecorator(update)
updateWithLogging('Мария', 'test@test.com')


// proxy

const original = {
  name: 'Мария',
  email: 'hi@site.com',
}

const proxied = new Proxy(original, {
  get: function (target, prop, receiver) {
    if (prop === 'name') return original.name
    return 'YOU HAVE BEEN PWND!'
  },
})

console.log(proxied.name)
console.log(proxied.email)