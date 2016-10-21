/**
 * Counter Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';
import Webhook from './lib/webhook';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._wpmSetting = 250;
    this._suHandler = this.onStorageUpdate.bind(this);
    this.view.subscribe('wpm', this.onWPMChange.bind(this));
  }

  // for more info: https://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('tdlr: loadView', state); 

    // this.storage.subscribe(['count'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'detail.html',
          data: state.params.detail
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: this.loadWPMSetting()
        };
      default:
        console.error('tdlr: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('tdlr: onStorageUpdate: ', value);
    // return this.getCount().then(ce => {
    //   // Publish events from 'count' to view
    //   this.publish('counts', ce);
    // });
  }


  loadWPMSetting(){
    return this.storage.getUser({ keys: ['wpm']}).then(result =>{
      console.log('controller getUser result', result);
      try {
        this._wpmSetting = result[0].value
      }catch(e){
        console.log('controller: no value to load from settings');
      }
      return { wpmSetting: this._wpmSetting }
    })
  }

  onWPMChange(value) {
    console.log('sift-tldr: onWPMChange: ', value);
    this.storage.get({ bucket: '_redsift', keys: ['webhooks/slider-wh'] }).then(wbr => {
      console.log('sift-tldr: onWPMChange webhook url: ', wbr[0].value);
      this._wpmSetting = value;
      this.storage.putUser({ kvs: [{ key: 'wpm', value: value }] });
      let wh = new Webhook(wbr[0].value);
      wh.send('wpm', value);
    }).catch((error) => {
      console.error('sift-tldr: onWPMChange: ', error);
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
