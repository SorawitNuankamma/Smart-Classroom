export default class Field {
  constructor(row, col, value, action) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.action = action;
  }

  get row() {
    return this.row;
  }

  get col() {
    return this.col;
  }
  get value() {
    return this.value;
  }

  get action() {
    return this.action;
  }
}
