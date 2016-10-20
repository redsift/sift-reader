/**
 * Counter Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import { Sliders } from '@redsift/ui-rs-core';
import '@redsift/ui-rs-hero';

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    Sliders.initAllRanges();
    this.controller.subscribe('counts', this.onCounts.bind(this));
    this.sliderHandler();
  }

  // for more info: https://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('counter: presentView: ', value);
    this.onCounts(value.data);
  };

  willPresentView(value) {
    console.log('counter: willPresentView: ', value);
  };

  onCounts(data) {
    console.log('counter: onCounts: ', data);
    document.getElementById('number').textContent = data.value;
  }

}

registerSiftView(new MyView(window));
