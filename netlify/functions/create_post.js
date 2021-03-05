// API url to this lambda funtion: /.netlify/functions/create_post
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  // console.log(event.body)

  // 🔥🔥🔥 Lab
  // Step 2:  Parse out the post data, i.e. the event.body – pull out
  //          the user ID, username, and image URL that is provided
  //          in the POST request, and assign to variables. Use
  //          console.log if necessary, to ensure the values are what
  //          you're expecting.
  let newPost = JSON.parse(event.body)
  let userId = newPost.userId
  let postImageUrl = newPost.postImageUrl
  let postUserName = newPost.username
  // console.log(userId)
  // Step 3:  Construct an object of data which you will send to Firestore
  //          in step 4 – this object should include the user ID, username,
  //          image URL, and a "created" timestamp – use the built-in
  //          function for this:
  //          firebase.firestore.FieldValue.serverTimestamp()
  let newPostObject = {
    created: firebase.firestore.FieldValue.serverTimestamp(),
    imageUrl: postImageUrl,
    userId: userId,
    username: postUserName,
    numberOfLikes: 0
  }
  // console.log(newPostObject)
  // Step 4:  Add the post to Firestore using the .add() function.
  docRef = await db.collection('posts').add(newPostObject)
  // Step 5:  Assign the newly created post's auto-generated ID as an
  //          id attribute of the object you created in step 3 - to assign
  //          an attribute use: object.attribute = value
  //          Also add a likes attribute to the object with a value of 0
  //          (since a new post has 0 likes to start) - return the entire
  //          object as the body in the return value, using JSON.stringify()
  // console.log(docRef.id)
  newPostObject.postId = docRef.id
  // console.log(newPostObject)
  return {
    statusCode: 200,
    body: JSON.stringify(newPostObject)
  }

}