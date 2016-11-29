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
    this.wpmValueId = '#wpmValue';

    window.addEventListener('load', this.sliderHandler.bind(this))
  }

  // for more info: https://docs.redsift.com/docs/client-code-siftview
  presentView(got) {
    console.log('tldr: presentView: ', got);
    Sliders.setValue(document.querySelector(this.sliderId), got.data.wpmSetting)
    document.querySelector(this.wpmValueId).innerHTML = got.data.wpmSetting;
  };

  willPresentView(value) {
    console.log('tldr: willPresentView: ', value);
  };


  sliderHandler(){
    var slider = document.querySelector(this.sliderId)
    var wpmValue = document.querySelector(this.wpmValueId)
    slider.addEventListener('input', function(e){
      wpmValue.innerHTML = e.target.value;
    });
    slider.addEventListener('change', function(e){
      this.publish('wpm', e.target.value);
      wpmValue.innerHTML = e.target.value;
    }.bind(this));
  }

}

registerSiftView(new MyView(window));
