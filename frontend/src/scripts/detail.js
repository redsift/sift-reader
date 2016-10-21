import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import { tooltip} from './lib/util';

export default class DetailView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
  }

  presentView(got) {
    console.log('detail got', got)
    if(got.data) {
      document.querySelector('#readTime').innerHTML = tooltip(got.data);
    }
  }

  willPresentView() {}
}

registerSiftView(new DetailView(window));
