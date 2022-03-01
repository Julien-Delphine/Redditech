import {Buffer} from 'buffer'

console.reportErrorsAsExceptions = false;
var token = ""

export async function fetchToken(code){

    let tmp = await getToken(code) 
    if (tmp.access_token != undefined) {
        token = "Bearer " + tmp.access_token
        console.log(tmp.access_token)
    }
}

export async function getToken(code)
{
    user = "d_1i5UGJTabHztrIKR-EPg"
    const requestPost = {
        method: 'POST',
        headers : {
          'Authorization': 'Basic ' + Buffer.from(user + ':').toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=authorization_code&code=" + code + "&redirect_uri=http://localhost:19002/"
      }
      
      return(fetch("https://www.reddit.com/api/v1/access_token", requestPost))
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export async function getInfo() {
    const requestPost = {
        method: 'GET',
        headers : {
          'Authorization': token}
      }
      var result = {
        name: "*",
        description: "*",
        img: "*",
        coins: "*"
    }
      return(fetch('https://oauth.reddit.com/api/v1/me', requestPost)
      .then((reponse) => reponse.json())
      .then((reponse) => {
            result.name = reponse.name
            result.description = reponse.subreddit.public_description
            result.img = reponse.icon_img.split('.jpg')[0] + '.jpg'
            result.coins = reponse.coins
            return(result)
    })
      .catch((e) => console.log("error" + e)))
    }

export async function getSub() {
  console.log("Sub")
  const requestPost = {
      method: 'GET',
      headers : {
        'Authorization': token}
    }
    return(fetch('https://oauth.reddit.com/subreddits/mine/subscriber', requestPost)
    .then((reponse) => reponse.json())
    .then((reponse) => {
      return(reponse)
    })
    .catch((e) => console.log("error" + e)))
  }

export async function getSearch(name) {
  const url = "https://oauth.reddit.com/subreddits/search?q="+  name
  console.log("url = ", url)
  const requestPost = {
    method: 'GET',
    headers : {
      'Authorization': token}
  }
  console.log("ici")
  return(fetch(url, requestPost)
  .then((reponse) => reponse.json())
  .then((reponse) => {
    console.log(reponse)
    return(reponse)
  })
  .catch((e) => console.log("error" + e)))
}

export async function getUnSub(name, sub) {
  let word = "sub"
  if (sub === "UnSubscribe")
    word = "unsub"
  let url = "https://oauth.reddit.com/api/subscribe?action=" + word + "&sr_name="+  name
  console.log("url = ", url)
  const requestPost = {
    method: 'POST',
    headers : {
      'Authorization': token}
  }
  return(fetch(url, requestPost)
  .then((reponse) => reponse.json())
  .then((reponse) => {
    console.log(reponse)
    return(reponse)
  })
  .catch((e) => console.log("error" + e)))
}

export async function getSettings() {
  const requestPost = {
      method: 'GET',
      headers : {
        'Authorization': token}
    }
    return(fetch('https://oauth.reddit.com/api/v1/me/prefs', requestPost)
    .then((reponse) => reponse.json())
    .then((reponse) => {
      return(reponse)
    })
    .catch((e) => console.log("error" + e)))
  }

export async function sendSettings(data) {
  console.log(data)
  const requestPost = {
      method: 'PATCH',
      headers : {
        'Authorization': token,
        'Content-type' : "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    }
    fetch('https://oauth.reddit.com/api/v1/me/prefs', requestPost)
    .then((reponse) => reponse.json())
    .then((reponse) => {
      console.log(reponse)
    })
    .catch((e) => console.log("Error: " + e))
  }