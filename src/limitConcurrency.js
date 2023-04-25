function limitConcurrency(promises, limit) {
  const results = [];
  let runing = 0;
  let index = 0;

  function runNext() {
    if (runing >= limit || index >= promises.length) {
      return Promise.resolve();
    }
    const i = index++;
    runing++;
    return promises[i]
      .then((res) => {
        results[i] = res;
      })
      .catch((err) => console.log("runNext", err))
      .finally(() => {
        runing--;
        runNext();
      });
  }

  return new Promise((resolve, reject) => {
    let promise = [];
    for (let i = 0; i < limit; i++) {
      promise.push(runNext());
    }

    Promise.all(promise).then(() => {
      if (results.length === promise.length) {
        resolve(results);
      } else {
        reject(new Error("Some promises failed"));
      }
    });
  });
}

function getPromise() {
  let promises = [];
  for (let index = 0; index < 3; index++) {
    promises.push(Promise.resolve(index));
  }
  return promises;
}

async function test() {
  let promises = getPromise();
  const res = await limitConcurrency(promises, 3);
  console.log(res);
}

test();
