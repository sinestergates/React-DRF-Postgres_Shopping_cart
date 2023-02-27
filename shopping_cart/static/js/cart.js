let rep = {"alligator":2, "snake":23, "lizard":'wq'};


document.onclick = event =>{
    if (event.target.classList.contains('mb-2')){

          var asd = document.querySelector('#form1').textContent
          var num = document.querySelector('#form3').textContent
          var se= fetch(`http://127.0.0.1:5000/api/stagecomponent?num=${num}asd=${asd}`).then(res => res.json())
          var ve = se.then(items => console.log(items[0]))
          rep['sdfdf]']=32
          //console.log(rep)
            console.log(ve)
    }


}