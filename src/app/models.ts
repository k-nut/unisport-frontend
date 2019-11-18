export class SportsClass {
  name: string;
  description: string;
  url: string;
  showDescription: boolean;
  courses: Course[];
  constructor(object) {
    this.name = object.name;
    this.description = object.description;
    this.url = object.url;
    this.showDescription = false;
    this.courses = object.courses.map(c => new Course(c))
  }

  toggleVisibility() {
    this.showDescription = !this.showDescription;
  }
}

export interface ISportsClassResponse {
  data: SportsClass[]
}

class Course {
  bookable: string;
  day: string;
  name: string;
  place: string;
  price: string;
  timeframe: string;
  time: string;
  constructor(object) {
    this.bookable = object.bookable;
    this.day = object.day;
    this.timeframe = object.timeframe;
    this.name = object.name;
    this.place = object.place;
    this.price = object.price;
    this.time = object.time;
  }
}

export class Day {
  name: string;
  selected: boolean;

  constructor(name: string) {
    this.name = name;
    this.selected = false;
  }
}

export class Location {
  name: string;
  lat: number;
  lon: number;
}
