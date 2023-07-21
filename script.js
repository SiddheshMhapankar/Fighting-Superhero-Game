const simulatebtn=document.getElementById("simulatebtn");
const resetbtn=document.getElementById("reset");
const p1Name=document.getElementById("p1Name");
const p2Name=document.getElementById("p2Name");
const p1Health=document.getElementById("p1Health");
const p2Health=document.getElementById("p2Health");
const result=document.getElementById("result");
const punchAudio=document.getElementById("punch");
const fastpunchAudio=document.getElementById("fastpunch");
const healAudio=document.getElementById("heal");
const fasthealAudio=document.getElementById("fastheal");
const victoryAudio=document.getElementById("victory");
class Game {
  constructor(player1Name = 'pl1', player2Name = 'pl2') {
    // Flag that indicates if the game is over or not
    this.theEnd = false;
    this.player1 = {
      name: player1Name,
      health: 100
    };
    this.player2 = {
      name: player2Name,
      health: 100
    };
    p1Name.innerText=player1Name;
    p2Name.innerText=player2Name;
    this.start(this.player1,this.player2);
  }
  //Starts the game 
  start(player1,player2) {
      simulatebtn.onclick=()=>{
        this.simulate(player1,player2);
      }
      resetbtn.onclick=()=>{
        this.reset(player1,player2);
      }
      document.addEventListener("keydown",(e)=>{
        if(e.key==="q")
          this.pl1AttackPl2(player1,player2);
        else if(e.key==="p")
          this.pl2AttackPl1(player1,player2);
        if(e.key==="a")
          this.pl1Heal(player1,player2)
        else if(e.key==="l")
          this.pl2Heal(player1,player2)
        });
  }
  //Console log the winner of the battle
  declareWinner(player1,player2) {
    game.theEnd = true;
    let message="";
    if(player1.health<=0)
      message=`${player2.name} is winner`;
    else
      message=`${player1.name} is winner`;
    result.innerText=message
    victoryAudio.play();
  }  
  //If player 1 or player 2 health is below 0 Mark theEnd true, to stop the game
  checkTheEnd(player1,player2) {
    if(player1.health<=0||player2.health<=0||game.theEnd===true)
      return true;
    return false;
  }
  //Reset health of player 1 and player 2 to 100 Reset theEnd to false
  reset(player1,player2) {
    this.player1.health=100;
    this.player2.health=100;
    game.theEnd = false;
    p1Health.innerText=player1.health;
    p2Health.innerText=player2.health;
    result.innerText="";
  }
  strike(player,enemy){
    if(enemy.health>0&&player.health>0){
      const damage=Math.floor(Math.random()*10)+1;
      enemy.health-=damage;
    }
  }
  //Generate a random number between 1 and 10 using Math.random() Use that number to decrease health from player 2
  pl1AttackPl2(player1,player2) {
    if(this.checkTheEnd(player1,player2))
      this.declareWinner(player1,player2);
    else{
      this.strike(player1,player2);
      p2Health.innerText=player2.health;
      punchAudio.play();
    }
  }
  //Generate a random number between 1 and 10 using Math.random() Use that number to decrease health from player 1
  pl2AttackPl1(player1,player2) {
    if(this.checkTheEnd(player1,player2))
      this.declareWinner(player1,player2);
    else{
      this.strike(player2,player1);
      p1Health.innerText=player1.health;
      fastpunchAudio.play();
    }
  }
  heal(player,enemy){
    if(player.health>0&&player.health<=100&&enemy.health>0){
      const healing=Math.floor(Math.random()*5)+1;
      if(player.health+healing<=100){
        player.health+=healing;
      }
    }
  }
  //Generate a random number between 1 and 5 using Math.random() Use that number to increase health of player 1
  pl1Heal(player1,player2) {
    if(this.checkTheEnd(player1,player2))
      this.declareWinner(player1,player2);
    else{
      this.heal(player1,player2)
      p1Health.innerText=player1.health;
      healAudio.play();
    }
  }
  //Generate a random number between 1 and 5 using Math.random() Use that number to increase health of player 2
  pl2Heal(player1,player2) {
    if(this.checkTheEnd(player1,player2))
      this.declareWinner(player1,player2);
    else{
      this.heal(player2,player1)
      p2Health.innerText=player2.health;
      fasthealAudio.play();
    }
  }
  simulate(player1,player2){
    if(game.theEnd===true)
    this.reset(player1,player2);
    while(game.theEnd!=true)
    {
      this.pl1AttackPl2(player1,player2);
      this.pl2AttackPl1(player1,player2);
      this.pl1Heal(player1,player2)
      this.pl2Heal(player1,player2)
    }
  }
}
// Call the start function of the game
const game= new Game("IronMan","Thanos");