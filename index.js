
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clear a tag in this case the body

  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>'); //creates a div for tweets
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $body.append($tweets);


//create a button to load new tweets
const buttonNewTweets = $('<section>').attr('id', 'button-new-tweets').addClass('button');
//append buttonNewTweets to body
$('body').append(buttonNewTweets);
//create the button function that makes it clickable 
  var button = document.createElement('button');
  button.id = 'button';
  button.innerHTML = 'Update Tweets';
  button.className = 'btn-styled';
//create button function to refresh the randomly generated tweets
  button.onclick = function() {
      location.reload(true);
  };

//add button function to button section at top of body
$('body').prepend(buttonNewTweets);
$('#button-new-tweets').prepend(button);























//this will be the styling section for making it look pretty
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

});
