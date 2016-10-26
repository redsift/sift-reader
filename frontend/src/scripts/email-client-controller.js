/**
 * Counter Sift. Email client controller entry point.
 */
import { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';
import { bucketing, tooltip} from './lib/util';

export default class MyEmailClientController extends EmailClientController {
  constructor() {
    super();
  }

  // for more info: https://docs.redsift.com/docs/client-code-redsiftclient
  loadThreadListView (listInfo) {
    console.log('tldr: loadThreadListView: ', listInfo);
    if (!listInfo) {
      return null;
    }
    var u = `assets/tldr-${bucketing(listInfo)}.svg`;
    return {
      template: '003_list_common_img',
      value: {
        image: {
          url: u
        },
        subtitle: tooltip(listInfo)
      }
    };
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerEmailClientController(new MyEmailClientController());
