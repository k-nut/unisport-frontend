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

  toggleVisibility(){
    this.showDescription = !this.showDescription;
  }
}

class Course {
  bookable : string;
  day: string;
  endDate: string;
  name: string;
  place: string;
  price: string;
  startDate: string;
  time: string;
  constructor(object){
    this.bookable = object.bookable;
    this.day = object.day;
    this.endDate = object.endDate;
    this.name = object.name;
    this.place = object.place;
    this.price = object.price;
    this.startDate = object.startDate;
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

