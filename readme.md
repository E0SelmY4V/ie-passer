# IE Passer

Debug in IE easily!

This debug tool is based on HTA, which is an 'old' technology to make *HTML Application* come true.
Because HTA's host program is IE (*mshta.exe*), you can debug your JS in IE through HTA.

HTA can be used only in Windows, just like this tool.

This tool packaged HTA test into a small function, making your debug easier.

## Usage

```javascript
import iePasser from 'ie-passer';
// or
const iePasser = require('ie-passer');

iePasser(
  'Your:\\Project\\index.ie.js',
  {
    test0: () => {
      // some test...
    },
    test1: () => {
      // some test...
    },
  },
  {
    version: '5' // version of IE core
  }
);
```

Then, a magic HTA window will be opened.
You can click the button displaying tests' name to do the test.
