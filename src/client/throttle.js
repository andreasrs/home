export default (fn, time, trailing = true) => {
  let ready = true;

  return () => {
    if (ready) {
      ready = false;
      if (!trailing) fn.call(this);

      setTimeout(() => {
        if (trailing) fn.call(this);
        ready = true;
      }, time);
    }
  };
};
