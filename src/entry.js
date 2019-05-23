// import "babel-polyfill"

import './css/index.css'
import './css/main.less'
import './css/init.scss'
{
  let jspangString = 'Hello Webpack1212'
  document.getElementById('title').innerHTML=jspangString; 
  // $('#title').html(jspangString)
  new Promise((resolve) => {
    resolve('醉里挑灯看剑')
  }).then(res => console.log(res))
}
// document.querySelector('#title').innerHTML = 'hello webpack12313123!'