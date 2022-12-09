
$(document).ready(() => {

  
  const $body = $('body');
  $body.html(''); //clear a tag in this case the body
  //create a main section in the body to host the central content for the page
  var $mainContent = $('<main></main>').attr('id', 'main-content');
  //append it to the body
  $mainContent.appendTo($body);
  const $mainTweets = $('<div class="main-tweets"></div>');
  $mainTweets.appendTo($mainContent);
  
  
  const $tweets = function(){
    return streams.home.map((tweet) => {
    const $tweet = $('<div></div>'); //creates a div for tweets
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text + "    " + moment().calendar());
    $tweet.append('<br>');
    const $timestamp = $('<i class="timestamp"></i>');
    $timestamp.append(moment(tweet.created_at).fromNow());
    $timestamp.attr('title', moment(tweet.created_at).format('MMM DD, YYYY, h:mm:ss a'));
    $timestamp.appendTo($tweet);
    $mainTweets.prepend($tweet);
  });
};



const $veryTweet = $tweets();



//these are some variables to help with the creation of new tweets
const $newTweets = $('<form id="newTweets"></form>');
const $visitorsName = $('<div><label for="visitorsName">Username</label>\n<input type="text" id="visitorsName"></div>');
const $visitorsTweet = $('<div><label for="visitorsTweet">Tweet</label>\n<input type="text" id="visitorsTweet"></div>');
const $visitorsButton = $('<button>Submit</button>');



const $loadTweetsButton = $('<button>New Tweets</button>').prependTo($mainContent);
$loadTweetsButton.on('click', function(){
    $tweets();
});

$visitorsButton.on('click', function(){
    const inputUsernameTextbox = $('#visitorsName').val();
    const inputTweetTextbox = $('#visitorsTweet').val();
    const userTweet = "@" + inputUsernameTextbox + ': ' + inputTweetTextbox + " " + moment().calendar();
    $mainTweets.prepend(userTweet);
})

// inputUsernameTextbox.on('click', function(){
//   $pageName.text(inputUsernameTextbox + `'s Timeline`);
//   $mainTweets.html(users.inputUsernameTextbox);
// });


//[maincontent sections creation section:

$newTweets.append($visitorsName, $visitorsTweet, $visitorsButton);
$newTweets.prependTo($mainContent);

const $pageName = $('<h2>Home Page</h2>');
$pageName.prependTo($mainContent);


//end of maincontents sections creation section]



//let's make ourselves a header
var $header = $('<header></header>');
//we'll give it a name and a size of h1 and a class of header so we can make changes easily later
$header.text('Welcome To Twiddler').attr('class', 'header');
//now we'll add it to the body 
$header.prependTo($body);




//create the newTweets function that displays the visitors tweets on the homepage
$('#newTweets').submit(function(event) {
  event.preventDefault();
  window.visitor = $('#visitorsName').val();
  writeTweet($('#visitorsTweet').val());
  $('#visitorsName').val('');
  $('#visitorsTweet').val('');
});


function displayUsersTimeline(user) {
  $pageName.text(user + `'s Timeline`);
  $loadTweetsButton.text(`Let's Go Home`);
  loadTweets(streams.users[user]);
}











// //this will be the styling section for making it look pretty



});
