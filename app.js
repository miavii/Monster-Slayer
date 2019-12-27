new Vue({
    el: '#app',
    data: {
        isGameRunning: false,
        player: {
            name: 'Player',
            health: 100,
            minDamage: 3,
            maxDamage: 10
        },
        enemy: {
            name: 'Monster',
            health: 100,
            minDamage: 5,
            maxDamage: 15
        },
        action: ['attack', 'special', 'heal', 'run'],
        log: []
    },
    methods: {
        playerTurn: function(type){
            switch (type) {
                case 0 :
                    this.attack();
                    break;
                case 1 : 
                    this.special();
                    break;
                case 2 :
                    this.heal();
                    break;
                case 3 : 
                    this.run();
                    break;
                default : 
                    this.enemyTurn();
                    break;
            }
        },
        startTheGame: function(){
            this.isGameRunning = true;
            this.player.health = 100;
            this.enemy.health = 100;
            this.log = [{
                text: 'Game Start',
                turn: true}];
        },
        attack: function(){
            var damage = this.calculateAmount(this.player.minDamage, this.player.maxDamage);
            this.enemy.health -= damage;
            this.log.unshift({
                text: this.player.name+' attacked ' + this.enemy.name + ' for '+ damage +' damage',
                turn: true});
                
            this.checkResults();
            this.enemyTurn();
        },
        special: function(){
            var damage = this.calculateAmount(this.player.minDamage * 2, this.player.maxDamage * 2);
            this.enemy.health -= damage;
            this.log.unshift({
                text: this.player.name+' attacked ' + this.enemy.name + ' for '+ damage +' damage',
                turn: true});
            
            this.checkResults();
            this.enemyTurn();
        },
        heal: function(){ 
            if(this.player.health < 90){
                this.player.health += 10;
                this.log.unshift({
                    text: this.player.name+' heals for 10 health',
                    turn: true});
            } else {
                this.player.health = 100;
                this.log.unshift({
                    text: this.player.name+' heals to full health',
                    turn: true});
            }
            this.enemyTurn();
        },
        run: function(){
            var success = this.calculateAmount(0,100);
            console.log(success)
            if(success > 30){
                this.log.unshift({
                    text: this.player.name+' successfully ran away!!',
                    turn: true});
                this.isGameRunning = false;
            } else{
                this.log.unshift({
                    text: this.player.name + "'s escape was unsuccessful!",
                    turn: false});
                this.enemyTurn();
                }
        },
        enemyTurn: function() {
            var action = this.calculateAmount(1,6);
            if(action <6){
                damage = this.calculateAmount(this.enemy.minDamage, this.enemy.maxDamage);
                this.player.health -= damage;
                this.log.unshift({
                    text: this.enemy.name+' attacked ' + this.player.name + ' for '+ damage +' damage',
                    turn: false});
            } else {
                this.enemy.health += 9;
                this.log.unshift({
                    text: this.enemy.name+' heals for 9 health',
                    turn: false});
            }
            this.checkResults();
        },
        calculateAmount: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);;
        },
        checkResults: function() {
            if(this.enemy.health<=0){
                alert('You win!!!');
                this.isGameRunning = false;
                return;
            } else if (this.player.health<=0){
                alert('You lost...');
                this.isGameRunning = false;
                return;
            } else {return}
        }
    }
})

new Vue ({
    el: '#contacts',
    data: {

    },
    methods: {
        toggleView (i) {
            var details= document.getElementById("details-"+i)
            if ( details.classList.contains('hidden') ){
                details.classList.remove('hidden');
            } else {
                details.classList.add("hidden");
            }
        }
    }
})