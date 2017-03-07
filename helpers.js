
  exports.if_in= function(a, b,opts) {
        for (var i = 0; i < b.length; i++) {
            if (a.equals(b[i].obj_id)) // Or === depending on your needs
                return opts.inverse(this);
        }
        return opts.fn(this);
    }
