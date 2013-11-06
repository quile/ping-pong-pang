(function(global) {

  global.pongpang = {
    submitChallenge: function(userId, shit, callback) {
      $.ajax({
        url: "/accept",
        type: "POST",
        data: {id: userId, shit: shit},
        success: callback
      });
    },

    enableAcceptButtons: function() {
      $("button.js-accept").off("click").on("click", function(e) {
        e.stopPropagation();

        var $button = $(this);
        var userId = $button.data().userId;

        if (userId) {
          var $input = $("<input type='text'>").on("blur", function(e) {
            global.pongpang.submitChallenge(userId, $input.val(), function(response) {
              console.log(response);
            });
          });
          var $challenge = $("<span>");
          $challenge.append("Talk some shit: ");
          $challenge.append($input);

          $button.after($challenge);
        }
      });
    },

    enableReadyButton: function() {
      $("button.js-ready").off("click").on("click", function(e) {
        e.stopPropagation();
        var $button = $(this);
        $.ajax({
          url: "/ready-to-play",
          type: "POST",
          success: function(data, error, jqxhr) {
            window.location.reload();
          }
        });
      });
    }
  };
})(window);


$(function() {
  window.pongpang.enableAcceptButtons();
  window.pongpang.enableReadyButton();
});
