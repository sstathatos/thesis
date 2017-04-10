
  exports.if_in= function(a, b,opts) {
      for (let i = 0; i < b.length; i++) {
            if (a.equals(b[i].obj_id)) // Or === depending on your needs
                return opts.inverse(this);
        }
        return opts.fn(this);
  };

  exports.if_eq = function (a, b, opts) {
      if (a === b) return opts.fn(this);
      return opts.inverse(this);
  };

  exports.raw_helper = function (options) {
      return options.fn();
  };
