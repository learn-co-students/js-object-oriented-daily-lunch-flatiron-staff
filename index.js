// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name) {
    this.name = name;
    Neighborhood.id = ++Neighborhood.id || 1;
    this.id = Neighborhood.id;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id);
  }

  meals() {
    return [...new Set(this.deliveries().map(d => d.meal()))];
  }
}

class Customer {
  constructor(name, nId) {
    this.name = name;
    this.neighborhoodId = nId;
    store.customers.push(this);
    Customer.id = ++Customer.id || 1;
    this.id = Customer.id;
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(d => d.meal());
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => total + meal.price, 0);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    store.meals.push(this);
    Meal.id = ++Meal.id || 1;
    this.id = Meal.id;
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(d => d.customer());
  }
}

Meal.byPrice = function() {
  const copy = [...store.meals];

  return copy.sort((a, b) => b.price - a.price);
}

class Delivery {
  constructor(mID, nID, cID) {
    this.mealId = mID;
    this.neighborhoodId = nID;
    this.customerId = cID;
    store.deliveries.push(this);
    Delivery.id = ++Delivery.id || 1;
    this.id = Delivery.id;
  }

  meal() {
    return store.meals.find(m => m.id === this.mealId);
  }

  customer() {
    return store.customers.find(c => c.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}