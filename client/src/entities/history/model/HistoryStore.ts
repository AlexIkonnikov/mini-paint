import { makeAutoObservable } from 'mobx';

class HistoryStore {
  history: ImageData[] = [];
  activeStep = -1;

  constructor() {
    makeAutoObservable(this);
  }

  add(snapshot: ImageData) {
    if (this.hasGoForward) {
      const newHistory = this.history.splice(0, this.activeStep + 1);
      this.history = [...newHistory, snapshot];
      this.activeStep = this.history.length - 1;
    } else {
      const newLength = this.history.push(snapshot);
      this.activeStep = newLength - 1;
    }
  }

  goBack() {
    if (this.hasGoBack) {
      this.activeStep -= 1;
      return this.history[this.activeStep];
    }
  }

  goForward() {
    if (this.hasGoForward) {
      this.activeStep += 1;
      return this.history[this.activeStep];
    }
  }

  get hasGoBack() {
    return this.activeStep > 0;
  }

  get hasGoForward() {
    return this.activeStep < this.history.length - 1;
  }
}

export default new HistoryStore();
