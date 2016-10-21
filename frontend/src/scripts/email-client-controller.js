/**
 * Counter Sift. Email client controller entry point.
 */
import { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';

export default class MyEmailClientController extends EmailClientController {
  constructor() {
    super();
  }
  bucketing(v) {
    return v <= 1.5 ? 1
      : v <= 3.5 ? 2
      : 3;
  }

  // for more info: https://docs.redsift.com/docs/client-code-redsiftclient
  loadThreadListView (listInfo) {
    console.log('counter: loadThreadListView: ', listInfo);
    if (!listInfo) {
      return null;
    }

    return {
      template: '003_list_common_img',
      value: {
        image: {
          url: `assets/tldr-${this.bucketing(listInfo)}.svg`
        },
        subtitle: listInfo + ' min'
      }
    };
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerEmailClientController(new MyEmailClientController());
