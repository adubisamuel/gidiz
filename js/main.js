$(document).ready(function(){
  
  $(".icon-search").click(function(){
    $(".sb-search-input").toggle();
  });

  $('.navbar-toggle-box-collapse').on('click', function () {
    $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  $('.close-box-collapse, .click-closed').on('click', function () {
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
    // $('.menu-list ul').slideUp(700);
  });

  // $('#img1').on({
  //   'click': function(){
  //       $('#change-image').attr('src','./img/img.jpg');
  //       $('#price').text('(#6,000)');
  //         $('#info').text('Casio ana-digi');
  //   }
  // });
  $('#img1').hover(
    function(){
      $('#change-image').attr('src','./img/img.jpg');
      $('#price').text('(#6,000)');
      $('#info').text('Casio ana-digi');
    }
  ).click(
    function(){
      $('#change-image').attr('src','./img/img.jpg');
      $('#price').text('(#6,000)');
      $('#info').text('Casio ana-digi');
    }
  );
  
 $('#img2').hover(
    function(){
      $('#change-image').attr('src','./img/img6.jpg');
      $('#price').text('(#8,000)');
      $('#info').text('Casio-G');
    }
  ).click(
    function(){
      $('#change-image').attr('src','./img/img6.jpg');
      $('#price').text('(#8,000)');
      $('#info').text('Casio-G');
    }
  );
  
 $('#img3').hover(
   function(){
      $('#change-image').attr('src','./img/img5.jpg');
      $('#price').text('(#18,000)');
      $('#info').text('Rolex Cellini');
    }
  ).click(
    function(){
       $('#change-image').attr('src','./img/img5.jpg');
       $('#price').text('(#18,000)');
       $('#info').text('Rolex Cellini');
     }
  );
  
 $('#img4').hover(
   function(){
      $('#change-image').attr('src','./img/img4.jpg');
      $('#price').text('(#14,000)');
      $('#info').text('Apple Airpods');
    }
  ).click(
    function(){
       $('#change-image').attr('src','./img/img4.jpg');
       $('#price').text('(#14,000)');
       $('#info').text('Apple Airpods');
     }
   );

  $('#img5').hover(
    function(){
      $('#change-image').attr('src','./img/img3.jpg');
      $('#price').text('(#37,000)');
      $('#info').text('Nike Air Max 90');
    }
  ).click(
    function(){
      $('#change-image').attr('src','./img/img3.jpg');
      $('#price').text('(#37,000)');
      $('#info').text('Nike Air Max 90');
    }
  );

  $('#img6').hover(
    function(){
      $('#change-image').attr('src','./img/img2.jpg');
      $('#price').text('(#5,000)');
      $('#info').text('Soxy');
    }
  ).click(
    function(){
      $('#change-image').attr('src','./img/img2.jpg');
      $('#price').text('(#5,000)');
      $('#info').text('Soxy');
    }
  );
    
});