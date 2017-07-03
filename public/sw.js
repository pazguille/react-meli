Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(t){function e(t){this.name="NetworkError",this.code=19,this.message=t}var r=this;return e.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return t=t.map(function(t){return t instanceof Request?t:t+""}),Promise.all(t.map(function(t){"string"==typeof t&&(t=new Request(t));var r=new URL(t.url).protocol;if("http:"!==r&&"https:"!==r)throw new e("Invalid scheme");return fetch(t.clone())}))}).then(function(e){return Promise.all(e.map(function(e,n){return r.put(t[n],e)}))}).then(function(){return void 0})});

/**
 * Fetch
 */
this.addEventListener('fetch', (eve) => {
  const request = eve.request;
  if (
    eve.request.url.includes('/articulo/') &&
    eve.request.method === 'GET' &&
    eve.request.headers.get('accept').includes('text/html')
  ) {
    eve.respondWith(
      fetch(request).then((response) => {
        // response.body is a readable stream.
        // Calling getReader() gives us exclusive access to
        // the stream's content
        var reader = response.body.getReader();
        var bytesReceived = 0;
        // read() returns a promise that resolves
        // when a value has been received
        reader.read().then(function processResult(result) {
          // Result objects contain two properties:
          // done  - true if the stream has already given
          //         you all its data.
          // value - some data. Always undefined when
          //         done is true.
          if (result.done) {
            console.log('Fetch complete');
            return;
          }

          // result.value for fetch streams is a Uint8Array
          bytesReceived += result.value.length;
          console.log('Received', bytesReceived, 'bytes of data so far');

          // Read some more, and call this function again
          return reader.read().then(processResult);
        });
      })
    );
  }
});
