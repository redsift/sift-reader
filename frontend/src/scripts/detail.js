import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class DetailView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
  }

  presentView(got) {
    console.log('detail got', got)
    if(got.data) {
      const t = `${+got.data < 1 ? '< 1' : Math.round(got.data)} min read`;
      document.querySelector('#readTime').innerHTML = t;
    }
  }

  willPresentView() {}
}

registerSiftView(new DetailView(window));
