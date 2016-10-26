import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import { tooltip} from './lib/util';

export default class DetailView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe('recalc', this.recalc.bind(this));
  }

  presentView(got) {
    console.log('tldr: detail got', got)
    this.updateView(got.data);
  }

  recalc(got) {
    console.log('tldr: recalc got', got);
    this.updateView(got);
  }

  willPresentView() {}

  updateView(data){
    if(data) {
      document.querySelector('#readTime').innerHTML = tooltip(data);
    }
  }
}

registerSiftView(new DetailView(window));
