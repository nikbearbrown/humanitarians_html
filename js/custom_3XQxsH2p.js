/* Slide 96 (#7) */
$(function(){
  var audio;
  var $player;
  var update_time;
  function startNupdate(player) {
    $(".player audio").each(function(){
      this.pause();
    });
		$(".player").addClass("pause");
		audio = player.find('audio').get(0);
    audio.play();
    player.removeClass("pause");
    clearInterval(update_time);
    update_time = setInterval(function() {
      // count time backwards
      var minutes = pad(Math.floor((audio.duration - audio.currentTime) / 60), 2);
      var seconds = pad(Math.floor((audio.duration - minutes*60 - audio.currentTime)), 2);
      // uncomment if you want to count time forwards
      //var minutes = pad(Math.floor(audio.currentTime / 60), 2);
      //var seconds = pad(Math.floor(audio.currentTime - minutes * 60), 2);
      $player.find('.elapsed span').html(minutes + ':' + seconds);
      $player.find('.played').css({
        "width": ((audio.currentTime / audio.duration) * 100) + '%'
      })
    }, 50)
  }
  
  function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = zero + s;
    return s;
  }
  $('.bar').on('click', function(event) {
    var pos_perc = event.offsetX / event.target.offsetWidth;
		$player = $(this).closest(".player");
		audio = $player.find('audio').get(0);;
    audio.currentTime = (audio.duration * pos_perc);
    startNupdate($player);
  })
  $('.playpause').on('click', function() {
    $player = $(this).closest(".player");
    if($player.hasClass("pause")){
      startNupdate($player);		
    }else{
      $(".player audio").each(function(){
      	this.pause();
      });
      $(".player").addClass("pause");
      clearInterval(update_time);
    }
  });
  
  $(".player audio").each(function(){
    this.onended = function() {
      if($(this).closest(".player").next(".player").length){
        $(this).closest(".player").next(".player").find(".playpause").trigger("click");
      }
    };
    this.onloadeddata = function() {
      var minutes = pad(Math.floor(this.duration / 60), 2);
      var seconds = pad(Math.floor(this.duration - minutes * 60), 2);
      $(this).closest(".player").find('.elapsed span').html(minutes + ':' + seconds);
    };
  });
});