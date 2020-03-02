const body = document.getElementById("body")

let words = ["EEEEE", "EEEEEEE"] // List of words
let grid = []

let selected = []
let last_bfs = []
//let first_bfs = []

document.addEventListener("DOMContentLoaded", function (event) {
  populate()

  document.querySelector(".content").addEventListener("click", (e) => {
    //console.log(selected)
      if(e.target.className !== undefined){ //|| e.target.className === "element selected" || e.target.className){
          if(selected.length == 0){ //First element in sequence?
             bfsNewSeq(getCords(e.target.id))
             //console.log(selected)
          }else if(selected.length > 0 && e.target.id == selected[selected.length -1][0]){ //Unselects from first element
                delLast()
                updateGrid()
          } else if (selected.length > 10){ // Clears if selected length is greater than 10
              clear()
              updateGrid()
          }
          /*else if(selected.length == 1 && last_bfs.includes(e.target.id)){ //Second element in sequence
            bfsSecond(getCords(e.target.id))
          }*/else if(last_bfs.includes(e.target.id)){
              //console.log("bfs from starting point")
              bfsLast(getCords(e.target.id))
          }
          /*else if(first_bfs.includes(e.target.id)){
              bfsFirst(getCords(e.target.id))
          }*/
            /*else if(selected.length > 0 && e.target.id == selected[selected.length - 1][0]){ //Unselects from last element
            delFirst()
            updateGrid()
          } */
          else{
            bfsNewSeq(getCords(e.target.id))
          }

          let result = selected.map(e => e[1]).join("")
          document.querySelector("#display_word").innerText = result

          if(words.includes(result)){
              console.log("found!")
          }
      }
  })
})

function populate(){
    let grid = [...Array(13)].map(e => Array(13).fill(0))
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    //letters = letters.map(e => e = "E")
    for(let i = 0; grid.length > i; i++){
        for(let j = 0; grid[0].length > j; j++){
            let newEle = document.createElement("div")
            grid[i][j] = letters[Math.floor(Math.random() * 26)]
            newEle.setAttribute("class", "element")
            newEle.innerText = grid[i][j]
            newEle.id = `${i}_${j}`
            document.querySelector("#easy-grid").appendChild(newEle)
        }
    }
}

function clear(){
    selected = []
    last_bfs = []
    first_bfs = []
}

function getCords(id){
    return [parseInt(id.match(/^\d+/)[0]), parseInt(id.match(/\d+$/)[0])]
}

function bfsNewSeq(xy){
    clear()
    selected.push([`${xy[0]}_${xy[1]}`, document.getElementById(`${xy[0]}_${xy[1]}`).innerText]) //Example output ["3_6", "C"]

    last_bfs.push(`${xy[0]+1}_${xy[1]}`)
    last_bfs.push(`${xy[0]-1}_${xy[1]}`)
    last_bfs.push(`${xy[0]}_${xy[1]+1}`)
    last_bfs.push(`${xy[0]}_${xy[1]-1}`)
    updateGrid()
}

/*function bfsSecond(xy){ 
    let id = [`${xy[0]}_${xy[1]}`]
    last_bfs = last_bfs.filter(e => e != id)
    selected.push([`${xy[0]}_${xy[1]}`, document.getElementById(id).innerText])
    //console.log(selected)
    if(!(selected.includes(`${xy[0]+1}_${xy[1]}`))){first_bfs.push(`${xy[0]+1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]-1}_${xy[1]}`))){first_bfs.push(`${xy[0]-1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]+1}`))){first_bfs.push(`${xy[0]}_${xy[1]+1}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]-1}`))){first_bfs.push(`${xy[0]}_${xy[1]-1}`)}
    updateGrid()
}*/

/*function bfsFirst(xy){
    let coords = selected.map(e=> e[0])
    if(coords.includes(`${xy[0]}_${xy[1]}`)){return}

    first_bfs = []
    let id = [`${xy[0]}_${xy[1]}`]
    selected.push([`${xy[0]}_${xy[1]}`, document.getElementById(id).innerText])
    if(!(selected.includes(`${xy[0]+1}_${xy[1]}`))){first_bfs.push(`${xy[0]+1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]-1}_${xy[1]}`))){first_bfs.push(`${xy[0]-1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]+1}`))){first_bfs.push(`${xy[0]}_${xy[1]+1}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]-1}`))){first_bfs.push(`${xy[0]}_${xy[1]-1}`)}
    updateGrid()
}*/

function bfsLast(xy){
    let coords = selected.map(e=> e[0])
    if(coords.includes(`${xy[0]}_${xy[1]}`)){return}

    last_bfs = []
    let id = [`${xy[0]}_${xy[1]}`]
    selected.push([`${xy[0]}_${xy[1]}`, document.getElementById(id).innerText])
    if(!(selected.includes(`${xy[0]+1}_${xy[1]}`))){last_bfs.push(`${xy[0]+1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]-1}_${xy[1]}`))){last_bfs.push(`${xy[0]-1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]+1}`))){last_bfs.push(`${xy[0]}_${xy[1]+1}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]-1}`))){last_bfs.push(`${xy[0]}_${xy[1]-1}`)}
    updateGrid()
}

function delLast(){
    console.log("hi")
    if(selected.length == 1){
        clear() 
        updateGrid() 
        return
    }
    selected.pop()
    let xy = getCords(selected[selected.length-1][0])
    last_bfs = []
    if(!(selected.includes(`${xy[0]+1}_${xy[1]}`))){last_bfs.push(`${xy[0]+1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]-1}_${xy[1]}`))){last_bfs.push(`${xy[0]-1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]+1}`))){last_bfs.push(`${xy[0]}_${xy[1]+1}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]-1}`))){last_bfs.push(`${xy[0]}_${xy[1]-1}`)}
    updateGrid()
}

/*function delFirst(){
    selected.pop()
    let xy = getCords(selected[selected.length - 1][0])
    first_bfs = []
    if(!(selected.includes(`${xy[0]+1}_${xy[1]}`))){first_bfs.push(`${xy[0]+1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]-1}_${xy[1]}`))){first_bfs.push(`${xy[0]-1}_${xy[1]}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]+1}`))){first_bfs.push(`${xy[0]}_${xy[1]+1}`)}
    if(!(selected.includes(`${xy[0]}_${xy[1]-1}`))){first_bfs.push(`${xy[0]}_${xy[1]-1}`)}
    updateGrid()
}*/

function updateGrid(){
    let grids = document.querySelector("#easy-grid")
    let selectedCoords = selected.map(e => e[0])
    for(let i = 0; Math.sqrt(grids.childNodes.length) -1 > i; i++){
        for(let j = 0; Math.sqrt(grids.childNodes.length) - 1 > j; j++){
            if(selectedCoords[selectedCoords.length - 1] == `${i}_${j}`){
                document.getElementById(`${i}_${j}`).setAttribute("class", "element del")
            }
            else if(selectedCoords.includes(`${i}_${j}`)){
                document.getElementById(`${i}_${j}`).setAttribute("class", "element selected")
            }else if(first_bfs.includes(`${i}_${j}`) || last_bfs.includes(`${i}_${j}`)){
                document.getElementById(`${i}_${j}`).setAttribute("class", "element valid")
            }
            else{
                document.getElementById(`${i}_${j}`).setAttribute("class", "element")
            }
        }
    }
}