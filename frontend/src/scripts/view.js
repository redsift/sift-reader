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
    this.sliderId = '#wpmSlider';
    this.registerOnLoadHandler(this.sliderHandler.bind(this));
  }

  // for more info: https://docs.redsift.com/docs/client-code-siftview
  presentView(got) {
    console.log('counter: presentView: ', got);
    Sliders.setValue(document.querySelector(this.sliderId), got.data.wpmSetting)
  };

  willPresentView(value) {
    console.log('counter: willPresentView: ', value);
  };


  sliderHandler(){
    var slider = document.querySelector(this.sliderId)
    slider.addEventListener('change', function(e){
      this.publish('wpm', e.target.value);
    }.bind(this));
    slider.addEventListener('mouseover', function(e){
      // TODO: probably have another element to display the value.
      slider.title = slider.value + 'wpm'
    })
  }

}

registerSiftView(new MyView(window));
