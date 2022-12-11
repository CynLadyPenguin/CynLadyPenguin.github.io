
$(document).ready(() => {

  
  const $body = $('body');
  $body.html(''); //clear a tag in this case the body
  //create a main section in the body to host the central content for the page
  var $mainContent = $('<main></main>').attr('id', 'main-content');
  //append it to the body
  $mainContent.appendTo($body);
  //create a div to hold the tweets separately from the main content so the textboxes and buttons won't be affected
  const $mainTweets = $('<div class="main-tweets"></div>');
  //append mainTweets to mainContent
  $mainTweets.appendTo($mainContent);

  //we'll create a function
  const $tweets = function() {
    //that maps through the home page
    return streams.home.map((tweet) => {
      //with a new div to hold the home tweets
    const $tweet = $('<div></div>'); 
    //and a variable to hold the user name
    const tweetName = tweet.user;
    //then give it an id so we can access it later
    $tweet.attr('id', 'whole-page-tweets');
    //next we need some text to put inside the tweet
    const text1 = ('@' + tweet.user + ': ' + tweet.message + " " + moment().calendar());
    //and to append that text to the div
    $tweet.append(text1);
    //create a new line so we can add a friendly timestamp
    $tweet.append('<br>');
    //then create an i to hold the timestamp
    const $timestamp = $('<i class="timestamp"></i>');
    //add the infor for the timestamp to the i for timestamp
    $timestamp.append(moment(tweet.created_at).fromNow());
    //and give the timestamp some title text
    $timestamp.attr('title', moment(tweet.created_at).format('MMM DD, YYYY, h:mm:ss a'));
    //add the timestamp to the tweet div below the tweet
    $timestamp.append('<br></br>');
    $timestamp.appendTo($tweet);
    //then add that to the mainTweets body at the top 
    $mainTweets.prepend($tweet);
    //next we need a function that allows us to click on the username
    $tweet.click(function(){
      //we'll return a function inside the click function that will change the page how we like
      const $userTweet = () => {
        //this function will return displayUsersTimeline because that function does what i want
       displayUsersTimeline(tweetName);
    };
    $mainTweets.append($userTweet);
    })
      
    })
  };



//these are some variables to help with the creation of new tweets
const $newTweets = $('<form id="newTweets"></form>');
const $visitorsName = $('<div><label for="visitorsName">Username</label>\n<input type="text" id="visitorsName"></div>');
const $visitorsTweet = $('<div><label for="visitorsTweet">Tweet</label>\n<input type="text" id="visitorsTweet"></div>');
const $visitorsButton = $('<button>Submit</button>');



const $loadTweetsButton = $('<button>New Tweets</button>').prependTo($mainContent);
$loadTweetsButton.on('click', function(){
  $mainTweets.empty();
    $tweets();
});



$visitorsButton.on('click', function(){
    const inputUsernameTextbox = $('#visitorsName').val();
    const inputTweetTextbox = $('#visitorsTweet').val();
    const userTweet = "@" + inputUsernameTextbox + ': ' + inputTweetTextbox + " " + moment().calendar();
    $mainTweets.prepend(userTweet);
})



//add the forms and button for the visitor to tweet to the newTweets form
$newTweets.append($visitorsName, $visitorsTweet, $visitorsButton);
//add all that to the top of mainContent
$newTweets.prependTo($mainContent);



//I want to be able to change what the page says 
const $pageName = $('<h2>Home Page</h2>');
//add the pageName change ability to the top of mainContent
$pageName.prependTo($mainContent);



//let's make ourselves a header
var $header = $('<header></header>');
//we'll give it a name and a size of h1 and a class of header so we can make changes easily later
$header.text('Welcome To Twiddler').attr('class', 'header');
//now we'll add it to the body 
$header.prependTo($body);



//create the newTweets function that displays the visitors tweets on the homepage
$('#newTweets').submit(function(event) {
  //prevent the default 
  event.preventDefault();
  //take the visitor's name value from the box
  window.visitor = $('#visitorsName').val();
  //use the writeTweet function on the value of the textbox for visitor tweet
  writeTweet($('#visitorsTweet').val());
  //pull value from the name and tweet box
  $('#visitorsName').val('');
  $('#visitorsTweet').val('');
});



//a function that changes the aspects on the page
//will be tied to the user click function
function displayUsersTimeline(user) {
  $mainTweets.empty();
  const $saltyTweet = $('<div id="salty-tweets-by-click"></div>');
  //map through the user's tweets
  const mapUser = streams.users[user].map((tweet) => {
    //another var for the message inside this function
    const text2 = ('@' + tweet.user + ': ' + tweet.message + " " + moment().calendar());
      //append the text to the saltyTweet div
      $saltyTweet.append(text2 + "    ");
      $saltyTweet.append('<br></br>');
      //append saltyTweet to the mainTweets
      $mainTweets.append($saltyTweet);
      return $mainTweets;
  })
  //change the pagename to the user's timeline
  $pageName.text(user + `'s Timeline`);
  //change the new tweets button to say let's go home
  $loadTweetsButton.text(`Let's Go Home`);
  //when you click on the let's go home button it should show the previous tweets
  $loadTweetsButton.on('click', function(){
    $mainTweets.show();
    //change the new tweets button back
    $loadTweetsButton.text('New Tweets');
    //and change back the pagename
    $pageName.text('Home Page');
  })
}



});
