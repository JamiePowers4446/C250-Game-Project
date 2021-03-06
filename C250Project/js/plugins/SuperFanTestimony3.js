//=============================================================================
// Go_Everywhere Bullet Emitters for victoria(MODIFIED)
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Go_Everywhere2 = my.BHell_Emitter_Go_Everywhere2 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Go_Everywhere2.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Go_Everywhere2.prototype.constructor = BHell_Emitter_Go_Everywhere2;
	
    BHell_Emitter_Go_Everywhere2.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 0; 
        this.bulletParams.index = this.params.index;
		this.bulletParams.sprite = "$FinalFanBullets"; 
		this.bulletParams.direction = 8; 
		this.bulletParams.type = "sfv"; 
		this.bulletParams.a = 0.01; 
		this.bulletParams.b = 0; 
		
		this.angle = 0; 

		this.radius = 90; 
		this.max_radius = Graphics.width; 
		this.count = 8; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
    };

    BHell_Emitter_Go_Everywhere2.prototype.shoot = function () {
		
		if (this.radius < this.max_radius&&my.player.Timestop==true) {
			for (j = 0; j < this.count; j++) {
				
				this.angle += Math.PI/40; 
                this.bulletParams.b = this.angle; 
				bullet = new my.BHell_Marching_Bullet(this.radius * Math.cos(2 * Math.PI / this.count * j) + my.player.x, this.radius * Math.sin(2 * Math.PI / this.count * j) + my.player.y, 2 * Math.PI / this.count * j, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
            }	
        }	
		this.radius += 50; 
		if (my.player.Timestop==false) {
            this.radius = 90; 
            console.log(this.radius);   
        }
    };

    return my;
} (BHell || {}));
//=============================================================================
// SuperFanTestimony3 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
        var BHell_Enemy_SuperFanTestimony3_p1 = my.BHell_Enemy_SuperFanTestimony3_p1 = function() {
            this.initialize.apply(this, arguments);
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
        BHell_Enemy_SuperFanTestimony3_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p1;
        BHell_Enemy_SuperFanTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
            params.hp = 45;//change to adjust Line HP
            params.speed = 3.5; // change to adjust speed of boss moving 
            params.hitbox_w = 412; // change to adjust hitbox width
            params.hitbox_h = 82; // change to adjust hitbox heights
            params.animated = false;
            my.player.bombs = 0; 
            my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
            this.bombedWrong = false;
            this.frameCounter = 0;
            this.state = "started";
            this.initializeWall(parent);
            this.initializeEmitters(parent);
            this.initializeZaWarudo(parent);
            this.initializeWatcher(parent);
    
            my.player.can_bomb = false;
            
            this.p = 16; 
            this.can_die = false;
            this.mover = new my.BHell_Mover_Still((Graphics.width / 2)+6, 125, 0, this.hitboxW, this.hitboxH);
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeEmitters = function (parent) {
            var emitterParams = {};
            emitterParams.aim=false;
            emitterParams.alwaysAim=false;
            emitterParams.bullet = {};
            emitterParams.bullet.animated=false;
            emitterParams.bullet.sprite="$EyeBullets-horiz"
            emitterParams.bullet.direction=8;
            emitterParams.bullet.speed=5;
            emitterParams.static="true";
            var emitterTotal=8;
            for (let index = 0; index < emitterTotal; index+=2) {
                this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
                this.emitters[index].angle= (Math.PI*1.32);
                this.emitters[index].offsetX= -200;
                this.emitters[index].offsetY= 800-((index/2)*50);
                this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
                this.emitters[index+1].angle= (Math.PI*1.68);
                this.emitters[index+1].offsetX= 200;
                this.emitters[index+1].offsetY= 800-((index/2)*50);
            }
            var emitterParams = {};
            emitterParams.static="true";
            emitterParams.bullet = {};
            emitterParams.bullet.sprite="$FinalFanBullets"
            emitterParams.bullet.direction = 8;
            emitterParams.a = 0;
            emitterParams.b = 2*Math.PI;
            emitterParams.n = 20;
            emitterParams.bullet.speed = 4;
            emitterParams.bullettype = "SF3";
            this.emitters.push(new my.BHell_Emitter_Animism(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[8].offsetY= 200;
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.updateEmitters = function (parent) {
            if(this.frameCounter%30==0){
                this.emitters[8].shoot(true);
                this.emitters[8].a+=0.05;
                this.emitters[8].b+=0.05;
            }
            if(this.frameCounter%6==0){
                for (let index = 0; index < 8; index++) {
                    this.emitters[index].shoot(true);
                }
            }
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeWall= function () {
            // this.spawnNumber=5;
            // this.spawnNumber=10;
            // this.spawnCounter = 0;
            // this.lineNum=2;
            // this.xpos=0;
            this.spawnNumber=15;
            this.spawnCounter = 0;
            this.lineNum=1;
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.updateWall = function () {
            if (this.spawnNumber>=this.spawnCounter) {
                var image = {"characterName":"$JeevesSmallRed","direction":2,"pattern":0,"characterIndex":0};
                var params = {};
                params.animated = false;
                params.frame = 0;
                params.speed =4;
                params.hp = 8;
                params.posX = this.x+340-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
                params.posY=this.y+120-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));;
                params.bullet = {};
                params.bullet.sprite="$JeevesSmall"
                params.bullet.direction=4;
                params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
                my.controller.enemies.push(new my.BHell_Enemy_Brick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                // this.xpos=(this.xpos+1%5);
                // var image = {"characterName":"$JeevesSmall","direction":8,"pattern":0,"characterIndex":0};
                // var params = {};
                // params.animated = false;
                // params.frame = 0;
                // params.speed =3;
                // params.hp = 8;
                // params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
                // params.posY=this.y+120;
                // params.bullet = {};
                // params.bullet.sprite="$JeevesSmall"
                // params.bullet.direction=4;
                // params.Xposition=this.xpos;
                // params.wallSize=5;
                // params.movedirection=1;
                // params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
                // my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                // var image = {"characterName":"$JeevesSmall","direction":8,"pattern":0,"characterIndex":0};
                // var params = {};
                // params.animated = false;
                // params.frame = 0;
                // params.speed =3;
                // params.hp = 8;
                // params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
                // params.posY=this.y+70;
                // params.bullet = {};
                // params.bullet.sprite="$JeevesSmall"
                // params.bullet.direction=4;
                // params.Xposition=this.xpos;
                // params.wallSize=5;
                // params.movedirection=-1;
                // params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
                // my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                this.spawnCounter+=1;
                if(this.spawnCounter==1)
                {
                    my.controller.enemies[1].destroy();
                }
            }  
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeZaWarudo = function (parent) {
            this.firstpause =true;
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.updateZaWarudo = function() {
            if(this.frameCounter==180){
                if(this.firstpause==true){
                    AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});
                    this.firstpause=false;
                }
                else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
                my.player.Timestop=true;
                this.WspawnCounter = 0;
            }
            if(this.frameCounter==290){
                my.player.Timestop=false;
                my.player.immortal-true;
            }
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.die = function() {
			// kill the cats V.L.
			while (my.controller.enemies[1] != null) {
				my.controller.enemies[1].destroy();
			}
            this.state = "dying";
            this.frameCounter = 0;
            my.controller.destroyEnemyBullets();
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeWatcher = function (parent) {
            var emitterParams = {};
            emitterParams.angle=Math.PI/2;
            emitterParams.bullet = {};
            emitterParams.bullet.type = "static";
            emitterParams.bullet.sprite="$BigEyeBullets";
            emitterParams.bullet.direction=2;
            emitterParams.bullet.static="true"
            emitterParams.bullet.nopause = "true";
            emitterParams.bullet.hitboxshape ="circle";
            emitterParams.bullet.hitboxradius =16;
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            //this.emitters[1].offsetX=0;
            //this.emitters[1].offsetY=-80;
            this.count=0;
            this.num=1;
            this.a=Math.PI+0.46;
            this.b=-0.46;
        }
        BHell_Enemy_SuperFanTestimony3_p1.prototype.updateWatcher = function () { 
            if(this.frameCounter==1&&this.count<this.num){
                this.n=3
                for (var k = 0; k < this.n; k++) {
                    this.emitters[9].x=300+175*(k);
                    this.emitters[9].y=50;
                    //this.emitters[1].angle=this.a + (this.b - this.a)/ this.n  * (k + 0.5)-Math.PI/2;
                    console.log(this.a + (this.b - this.a)/ this.n  * (k + 0.5));
                    this.emitters[9].shoot(this.emitters,true);
                    console.log("pew");
                }
                this.count++;
            }
        };
        BHell_Enemy_SuperFanTestimony3_p1.prototype.destroy = function() {
            //adding these to the correct line allow it to transition to a different phase
            //the 3 here is the map number change this to whatever map number u want to transition there on victory
            while (my.controller.enemies[1] != null) {
                my.controller.enemies[1].destroy();
            }	
            my.BHell_Enemy_Base.prototype.destroy.call(this);
        };	
        //main update loop
        BHell_Enemy_SuperFanTestimony3_p1.prototype.update = function () {
            
            // Update line color V.L. 11/08/2020
                if (this.flash == true) {
                        
                    if (this.prev_hp == this.hp) {
                        if (this.bombedWrong == true) {
                            this.setColorTone([0, -160, -160, 1]);
                        } else if(this.holdFlash <= 0){
                            this.setColorTone([0, 0, 0, 1]);
                        }
                    } else {
                        this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
                    }
                    if (this.holdFlash > 0){
                        this.setColorTone([0, 0, -160, 1]);
                    }
                    
                }
                
                if (this.holdFlash > 0) {
                    this.holdFlash--;
                }
    
                this.prev_hp = this.hp; 
                
                my.BHell_Sprite.prototype.update.call(this);
                if (my.player.bombed == true&& this.state !== "bombed") {
                    my.controller.destroyEnemyBullets(); 
                    this.timer = 0; 
                    this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
                    this.state = "bombed";
                }
                if (this.state !== "dying") {
                    this.move();
                }
            switch (this.state) {
                case "started":
                    if (this.mover.inPosition === true) {
                        this.state = "active";
                        this.frameCounter = 0;
                    }
                    break;
                case "active": // Shoot.
                    if(this.frameCounter%3===0){
                        this.updateWall(this.frameCounter); 
                    }  
                    this.updateEmitters();
                    this.updateZaWarudo();
                    this.updateWatcher();
                    if(this.frameCounter==50){
                        this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 125, 0, this.hitboxW+250, this.hitboxH);
                    }
                    break;
                case "dying": // die.
                    this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                if (this.timer > 70) {
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
                    break;
                case "bombed":  
                    this.timer = (this.timer + 1) % 1200;
                    this.shoot(false);
                    
                    if (this.timer > 70) {
                        // Clear screen after count down V.L. 10/20/2020
                        my.controller.generators = [];
                        my.controller.activeGenerators = [];
                        
                        this.destroy();
                    }
                    else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                        my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                    }
                break; 
            }; 
            // Update the emitter's position.
            this.emitters.forEach(e => {e.update()});
            // Update the time counter and reset it every 20 seconds.
            this.frameCounter ++;
            if(this.frameCounter>=450){this.frameCounter=0;}
        }
        return my;
} (BHell || {}));
// =============================================================================
// SuperFanTestimony1 Pattern 2 Test
// =============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p2 = my.BHell_Enemy_SuperFanTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p2;
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 448; //change to adjust hitbox width
        params.hitbox_h = 82; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
        this.initializeDollaV(parent);
        this.initializeDollaH(parent);
        this.initializeZaWarudo(parent);
        this.initializeWatcher(parent);
        
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125+30, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeDollaV = function (parent) {
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite = "$VictoriaBullets1";
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 5;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet.shape="rectangle";
        emitterParams.bullet.hitboxheight=20;
        emitterParams.bullet.hitboxwidth=20;
        this.totalWidth =20;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-(i*30);
            this.emitters[i].offsetY = -100
        }
        emitterParams.angle = 3*Math.PI/2;
        for(var i =this.totalWidth;i<(this.totalWidth*2);i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-((i%this.totalWidth)*30);
            this.emitters[i].offsetY = 400
        }
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateDollaV = function() {
        this.shenanigns==false;
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =8;i<this.totalWidth-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(90+(4*wave))) {//change to adjust block spawn rate
                for(var i =4;i<this.totalWidth-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =12;i<this.totalWidth-4;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(120+(4*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-16;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =16;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		//----------------------------------------------------------------------
		for(var wave =0;wave<40;wave++){
            if (this.frameCounter==(270+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =(this.totalWidth)+12;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<30;wave++){
            if (this.frameCounter==(320+(4*wave))) {//change to adjust block spawn rate
                for(var i =8;i<(this.totalWidth)-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
            }
		}
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeDollaH = function (parent) {
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 7;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalHeight =(this.totalWidth*2)+16;
        this.totalHeight2= this.totalHeight+16;
        for(var i =this.totalWidth*2;i<this.totalHeight;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = -500;
            this.emitters[i].offsetY = 70+((i%this.totalWidth)*20);
        }
        emitterParams.angle = Math.PI;
        for(var i =this.totalHeight;i<this.totalHeight2;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 500;
            this.emitters[i].offsetY = 70+((i%this.totalHeight)*20);
        }
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateDollaH = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(150+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(150+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
		}
        //----------------------------------------------------------------------
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(440+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2);i<this.totalHeight-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(440+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(495+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight;i++){
                    this.emitters[i].bulletParams.speed=4.5;
                    this.emitters[i].shoot(this.emitters,true); 
                    this.emitters[i].bulletParams.speed=7;           
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(495+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight+8;i<this.totalHeight2;i++){
                    this.emitters[i].bulletParams.speed=4.5;
                    this.emitters[i].shoot(this.emitters,true); 
                    this.emitters[i].bulletParams.speed=7;           
                };
                if(wave==3){this.shenanigns=true;}
            };
        }
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;} 
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeZaWarudo = function (parent) {
        var emitterParams={};
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;;
        emitterParams.n = 20;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.rotating=true;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=100;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[this.totalHeight2].offsetX=300;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[this.totalHeight2+1].offsetX=-300;
        var emitterparams = {};
		emitterparams.period = 1; 
		emitterparams.aim = true;
		emitterparams.alwaysAim = true;
		emitterparams.bullet = {};
        emitterparams.bullet.index = 0;
		this.emitters.push(new my.BHell_Emitter_Go_Everywhere2(this.x, this.y, emitterparams, parent, my.enemyBullets));
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateZaWarudo = function() {
        if(this.frameCounter==270){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.WspawnCounter = 0;
        }
        if(this.frameCounter==400){
            my.player.Timestop=false;
            my.player.immortal-true;
        }
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeWatcher = function (parent) {
		var emitterParams = {};
		emitterParams.angle=Math.PI/2;
		emitterParams.bullet = {};
        emitterParams.bullet.type = "static";
		emitterParams.bullet.sprite="$BigEyeBullets";
		emitterParams.bullet.direction=2;
		emitterParams.bullet.static="true"
		emitterParams.bullet.nopause = "true";
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =16;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
		//this.emitters[1].offsetX=0;
		//this.emitters[1].offsetY=-80;
		this.count=0;
		this.num=1;
		this.a=Math.PI-0.3;
		this.b=0.3;
    }
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateWatcher = function () { 
		if(this.frameCounter%1==0&&this.count<this.num){
			this.n=5
			for (var k = 0; k < this.n; k++) {
				this.emitters[this.totalHeight2+3].x=Math.cos(this.a + (this.b - this.a)/ this.n  * (k + 0.5))*380+Graphics.width/2;
				this.emitters[this.totalHeight2+3].y=Math.sin(this.a + (this.b - this.a)/ this.n  * (k + 0.5))*-380+Graphics.height/2+140;
				//this.emitters[1].angle=this.a + (this.b - this.a)/ this.n  * (k + 0.5)-Math.PI/2;;
                this.emitters[this.totalHeight2+3].shoot(this.emitters,true);
                console.log("pew");
			}
			this.count++;
		}
	};
    BHell_Enemy_SuperFanTestimony3_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		my.controller.destroyEnemyBullets();
	};
    BHell_Enemy_SuperFanTestimony3_p2.prototype.update = function () {
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
			my.BHell_Sprite.prototype.update.call(this);
			
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
				this.p = 8; 
				this.emitters[2].bulletParams.speed = 6; 
				this.emitters[3].bulletParams.speed = 6;
			}
			if (my.player.bombed == true) {
				this.destroy(); 
			}
			if (this.state !== "dying") {
                this.move();
            }
		switch (this.state) {
			case "started":
				if (this.mover.inPosition === true) {
					this.state = "active";
				}
				break;
			case "active": // Shoot.
                this.updateDollaV(); 
                this.updateDollaH(); 
                this.updateZaWarudo();
                this.updateWatcher();
                if(this.frameCounter%10 == 0)
                {
                    this.emitters[this.totalHeight2+2].shoot(this.emitters,true);
                }
				break;
			case "dying": // die.
				this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                if (this.timer > 70) {
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = ((this.frameCounter) % 1200)+1;
	};
    return my;
} (BHell || {}));
//=============================================================================
// SuperFanTestimony3 Pattern 3 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p3 = my.BHell_Enemy_SuperFanTestimony3_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p3.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p3;
	BHell_Enemy_SuperFanTestimony3_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 20;//change to adjust Line HP
        params.speed = 3.5; // change to adjust speed of boss moving 
        params.hitbox_w = 106; // change to adjust hitbox width
        params.hitbox_h = 82; // change to adjust hitbox heights
		params.animated = false;
        my.player.bombs = 0; 
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeWall(parent);
        this.initializeEmitters(parent);
        this.initializeZaWarudo(parent);
        this.initializeWatcher(parent);
        this.initializeCircle(parent);

		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = false;
		
		this.p = 16; 
		this.can_die = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW+200, this.hitboxH);
        
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.initializeEmitters = function (parent) {
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet = {};
        emitterParams.bullet.animated=false;
        emitterParams.bullet.sprite="$EyeBullets-horiz"
        emitterParams.bullet.direction=8;
        emitterParams.bullet.speed=-5;
        emitterParams.static="true";
        var emitterTotal=10;
        for (let index = 0; index < emitterTotal; index+=2) {
            this.emitters.push(new my.BHell_Emitter_Angle(Graphics.width / 2, 125, emitterParams, parent, my.enemyBullets));
            this.emitters[index].angle= (Math.PI*1.32);
            this.emitters[index].offsetX= 190;
            this.emitters[index].offsetY= -100-((index/2)*40);
            this.emitters.push(new my.BHell_Emitter_Angle(Graphics.width / 2, 125, emitterParams, parent, my.enemyBullets));
            this.emitters[index+1].angle= (Math.PI*1.68);
            this.emitters[index+1].offsetX=-190;
            this.emitters[index+1].offsetY= -100-((index/2)*40);
        }
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%10==0){
            for (let index = 0; index < 10; index++) {
                this.emitters[index].shoot(true);
            }
        }
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.initializeWall= function () {
        // this.spawnNumber=15;
        // this.spawnCounter = 0;
        // this.lineNum=2;
        // this.xpos=0;
        this.spawnNumber=6;
        this.spawnCounter = 0;
        this.lineNum=2;
        this.xpos=0;
	};
	BHell_Enemy_SuperFanTestimony3_p3.prototype.updateWall = function () {
        // if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
        //     this.xpos=(this.xpos+1%5);
        //     var image = {"characterName":"$JeevesSmall","direction":8,"pattern":0,"characterIndex":0};
        //     var params = {};
        //     params.animated = false;
        //     params.frame = 0;
        //     params.speed =3;
        //     params.hp = 8;
        //     params.posX = this.x+350-(50*((this.spawnCounter-1)%(this.spawnNumber)));
        //     params.posY=this.y+120;
        //     params.bullet = {};
        //     params.bullet.sprite="$JeevesSmall"
        //     params.bullet.direction=4;
        //     params.Xposition=this.xpos;
        //     params.wallSize=5;
        //     params.movedirection=1;
        //     params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
        //     my.controller.enemies.push(new my.BHell_Enemy_Brick(Graphics.width / 2, 80, image, params, this.parent, my.controller.enemies));
        //     this.spawnCounter+=1;
        //     if(this.spawnCounter==1)
        //     {
        //         my.controller.enemies[1].destroy();
        //     }
        // }
        if (this.spawnNumber>=this.spawnCounter) {
            this.xpos=(this.xpos+1%5);
            var image = {"characterName":"$JeevesSmallRed","direction":8,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 8;
            params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
            params.posY=this.y+120;
            params.bullet = {};
            params.bullet.sprite="$JeevesSmall"
            params.bullet.direction=4;
            params.Xposition=this.xpos;
            params.wallSize=5;
            params.movedirection=1;
            params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            var image = {"characterName":"$JeevesSmallRed","direction":8,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 8;
            params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
            params.posY=this.y+70;
            params.bullet = {};
            params.bullet.sprite="$JeevesSmall"
            params.bullet.direction=4;
            params.Xposition=this.xpos;
            params.wallSize=5;
            params.movedirection=-1;
            params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        } 
	};
    BHell_Enemy_SuperFanTestimony3_p3.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$FinalFanBullets"
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 8;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 5;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=115;
        emitterParams.bullet.dif=15;
        emitterParams.bullettype = "SF3";
        emitterParams.bullet.type = "p3";
        this.emitters.push(new my.BHell_Emitter_Animism(this.x, this.y, emitterParams, parent, my.enemyBullets));
        //this.firstpause =true;
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.updateZaWarudo = function() {
        if(this.frameCounter==180){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.WspawnCounter = 0;
        }
        if(this.frameCounter%15 == 0&&my.player.Timestop==true&&this.frameCounter<320)
        {                
            if(this.emitters[10].bulletParams.num<4){
                this.emitters[10].x=my.player.x;
                this.emitters[10].y=my.player.y;
                this.emitters[10].shoot(this.emitters,true);
            }
        }
        console.log(this.frameCounter);
        if(this.frameCounter==340){//290
            my.player.Timestop=false;
            my.player.immortal=true;
        }
        // if(this.frameCounter==340){//290
        //     my.player.Timestop=false;
        //     my.player.immortal=true;
        // }
        // if(this.frameCounter==180){
        //     if(this.firstpause==true){
        //         AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
        //         this.firstpause=false;
        //     }
        //     else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
        //     my.player.Timestop=true;
        //     this.WspawnCounter = 0;
        // }
        // if(this.frameCounter%3 == 0&&my.player.Timestop==true&&this.frameCounter<450)
        // {            
        // }
        // if(this.frameCounter==290){
        //     my.player.Timestop=false;
        //     my.player.immorta
        // }
    };
	BHell_Enemy_SuperFanTestimony3_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		my.controller.destroyEnemyBullets();
    };	
	BHell_Enemy_SuperFanTestimony3_p3.prototype.destroy = function() {
        //adding these to the correct line allow it to transition to a different phase
        //the 3 here is the map number change this to whatever map number u want to transition there on victory
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.initializeWatcher = function (parent) {
        var emitterParams = {};
        emitterParams.angle=Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.type = "static";
        emitterParams.bullet.sprite="$BigEyeBullets";
        emitterParams.bullet.direction=2;
        emitterParams.bullet.static="true"
        emitterParams.bullet.nopause = "true";
        emitterParams.bullet.hitboxshape ="circle";
        emitterParams.bullet.hitboxradius =16;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        //this.emitters[1].offsetX=0;
        //this.emitters[1].offsetY=-80;
        this.count=0;
        this.num=1;
        this.a=Math.PI+0.46;
        this.b=-0.46;
    }
    BHell_Enemy_SuperFanTestimony3_p3.prototype.updateWatcher = function () { 
        if(this.frameCounter==1&&this.count<this.num){
            this.n=2
            for (var k = 0; k < this.n; k++) {
                this.emitters[11].x=330+300*(k);
                this.emitters[11].y=50;
                //this.emitters[1].angle=this.a + (this.b - this.a)/ this.n  * (k + 0.5)-Math.PI/2;
                console.log(this.a + (this.b - this.a)/ this.n  * (k + 0.5));
                this.emitters[11].shoot(this.emitters,true);
                console.log("pew");
            }
            this.count++;
        }
    };
    BHell_Enemy_SuperFanTestimony3_p3.prototype.initializeCircle = function (parent) {
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$FanBullets"
        emitterParams.bullet.direction = 8;
        emitterParams.a = 0;
        emitterParams.b = Math.PI;
        emitterParams.n = 8;
        this.emitters.push(new my.BHell_Emitter_Spray(Graphics.width / 2, 125, emitterParams, parent, my.enemyBullets));
    }
    BHell_Enemy_SuperFanTestimony3_p3.prototype.updateCircle = function () { 
        if(this.frameCounter%40==0&&my.player.Timestop==false){
            this.emitters[12].shoot(true);
        }
    };
	//main update loop
	BHell_Enemy_SuperFanTestimony3_p3.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
			my.BHell_Sprite.prototype.update.call(this);
            if (my.player.bombed == true&& this.state !== "bombed") {
				my.controller.destroyEnemyBullets(); 
				this.timer = 0; 
				this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
				this.state = "bombed";
			}
			if (this.state !== "dying"&&my.player.Timestop==false) {
                this.move();
            }
		switch (this.state) {
			case "started":
				if (this.mover.inPosition === true) {
					this.state = "active";
                    this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
                if(this.frameCounter%3===0){
                    this.updateWall(this.frameCounter); 
                }  
                this.updateEmitters();
                this.updateZaWarudo();
                this.updateWatcher();
                this.updateCircle();
                
				break;
			case "dying": // die.
				this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                if (this.timer > 70) {
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
                break;
			case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                
                if (this.timer > 70) {
                    // Clear screen after count down V.L. 10/20/2020
                    my.controller.generators = [];
                    my.controller.activeGenerators = [];
                    
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
            break; 
		}; 
		// Update the emitter's position.
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter ++;
        if(this.frameCounter>=500){this.frameCounter=0;}
	}
    return my;
} (BHell || {}));







//=============================================================================
// SuperFanTestimony1 Pattern 2
//=============================================================================
/*
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p2 = my.BHell_Enemy_SuperFanTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p2;
	BHell_Enemy_SuperFanTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 45;//change to adjust Line HP
        params.speed = 3.5; // change to adjust speed of boss moving 
        params.hitbox_w = 410; // change to adjust hitbox width
        params.hitbox_h = 80; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeBrick(parent);
        this.initializeEmitters(parent);
        this.initializeSwipe(parent);

		my.player.can_bomb = false; 
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still((Graphics.width / 2)+6, 125, 0, this.hitboxW, this.hitboxH);
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeEmitters = function (parent) {
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet={};
        emitterParams.bullet.speed=5;
        var emitterTotal=10;
        for (let index = 0; index < emitterTotal; index+=2) {
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index].angle= (Math.PI*1.32);
            this.emitters[index].offsetX= 500;
            this.emitters[index].offsetY= 400-((index/2)*40);
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index+1].angle= (Math.PI*1.68);
            this.emitters[index+1].offsetX= -500;
            this.emitters[index+1].offsetY= 400-((index/2)*40);
        }
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%10==0){
            for (let index = 0; index < 10; index++) {
                this.emitters[index].shoot(true);
            }
        }
    };
	BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeBrick = function (parent) {
        this.spawnNumber=6;
        this.spawnCounter = 0;
        this.lineNum=2;
        this.wallSize = (this.spawnNumber/this.lineNum)-1;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_SuperFanTestimony3_p2.prototype.updateBrick = function (frameCounter) {
        while (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmallRed","direction":2,"pattern":2,"characterIndex":2};
            var params = {};
            params.animated = false;
            params.frame = 2;
            params.speed =4;
            params.hp = 999;
            params.wallSize=this.wallSize;
            params.Xposition =  ((this.spawnCounter-1)%(this.spawnNumber/this.lineNum));
            params.posX = this.x+(this.wallSize*25)-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+150-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            params.bullet = {};
            my.controller.enemies.push(new my.BHell_Enemy_BrickFollow(this.x, this.y, image, params, this.parent, my.controller.enemies,frameCounter));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
            my.controller.enemies[1].destroy();
            }
        }  
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeSwipe = function (parent) {
		this.p = 2; 
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 4;
        emitterParams.bullet.direction = 2;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[10].angle=Math.PI/2;
        this.emitters[10].alwaysAim = false;
        this.emitters[10].offsetX = -150;
        this.emitters[11].angle=Math.PI/2;
        this.emitters[11].alwaysAim = false;
        this.emitters[11].offsetX= 150;
        this.angl1= -(Math.PI/20);
        this.angl2= (Math.PI/20);
        this.flip=false;
    };

    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateSwipe = function() {
        if (this.frameCounter % 10 == 0){
            this.emitters[10].shoot(true);
            this.emitters[11].shoot(true);
            if(this.emitters[10].angle>=Math.PI||this.emitters[11].angle<=0)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1= -(this.angl1);
                this.flip = false;
            }
            this.emitters[10].angle-=this.angl1;
            this.emitters[11].angle-=this.angl1;
        } 
    };
	BHell_Enemy_SuperFanTestimony3_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};	
	BHell_Enemy_SuperFanTestimony3_p2.prototype.destroy = function() {
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
    };	
	//main update loop
	BHell_Enemy_SuperFanTestimony3_p2.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.prev_hp == this.hp) {
				if (this.bombedWrong == true) {
					this.setColorTone([255, 0, 0, 1]);
				} else {
					this.setColorTone([0, 0, 0, 1]);
				}
			} else {
				this.setColorTone([255, 255, 0, 1]);
			}
			
			this.prev_hp = this.hp; 
		
		my.BHell_Sprite.prototype.update.call(this);

			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
			}
			if (my.player.bombed == true) {
				this.destroy(); 
			}
			if (this.state !== "dying") {
                this.move();
            }
		switch (this.state) {
			case "started":
				if (this.mover.inPosition === true) {
					this.state = "active";
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
                if(this.frameCounter%3===0){
                    this.updateBrick(this.frameCounter);  
                }  
                this.updateEmitters();
                this.updateSwipe();
				break;
			case "dying": // die.
				this.destroy();
                break;
			case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                
                if (this.timer > 70) {
                    // Clear screen after count down V.L. 10/20/2020
                    my.controller.generators = [];
                    my.controller.activeGenerators = [];
                    
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
            break; 
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1200;
	}
    return my;
} (BHell || {})); 
*/ 
//=============================================================================
// SuperFanTestimony1 Pattern 2
//=============================================================================
/*
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p1 = my.BHell_Enemy_SuperFanTestimony3_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p1;
	BHell_Enemy_SuperFanTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 45;//change to adjust Line HP
        params.speed = 3.5; // change to adjust speed of boss moving 
        params.hitbox_w = 360; // change to adjust hitbox width
        params.hitbox_h = 72; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeWall(parent);
        this.initializeEmitters(parent);
        this.initializeZaWarudo(parent);

		my.player.can_bomb = true;
        my.player.currentLine = 1;
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still((Graphics.width / 2)+6, 125, 0, this.hitboxW, this.hitboxH);
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeEmitters = function (parent) {
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction=6;
        emitterParams.bullet.speed=5;
        var emitterTotal=10;
        for (let index = 0; index < emitterTotal; index+=2) {
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index].angle= (Math.PI*1.32);
            this.emitters[index].offsetX= 500;
            this.emitters[index].offsetY= 400-((index/2)*40);
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index+1].angle= (Math.PI*1.68);
            this.emitters[index+1].offsetX= -500;
            this.emitters[index+1].offsetY= 400-((index/2)*40);
        }
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 20;
        emitterParams.bullet.speed = 4;
        emitterParams.bullettype = "SF3";
        this.emitters.push(new my.BHell_Emitter_Animism(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%30==0){
            this.emitters[10].shoot(true);
            this.emitters[10].a+=0.05;
            this.emitters[10].b+=0.05;
        }
        if(this.frameCounter%6==0){
            for (let index = 0; index < 10; index++) {
                //this.emitters[index].shoot(true);
            }
        }
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeWall= function () {
        // this.spawnNumber=5;
        // this.spawnNumber=10;
        // this.spawnCounter = 0;
        // this.lineNum=2;
        // this.xpos=0;
        this.spawnNumber=18;
        this.spawnCounter = 0;
        this.lineNum=2;
	};
	BHell_Enemy_SuperFanTestimony3_p1.prototype.updateWall = function () {
        if (this.spawnNumber>=this.spawnCounter) {
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 8;
            params.posX = this.x+200-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+120-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));;
            params.bullet = {};
            params.bullet.sprite="$JeevesSmall"
            params.bullet.direction=4;
            params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_Brick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            // this.xpos=(this.xpos+1%5);
            // var image = {"characterName":"$JeevesSmall","direction":8,"pattern":0,"characterIndex":0};
            // var params = {};
            // params.animated = false;
            // params.frame = 0;
            // params.speed =3;
            // params.hp = 8;
            // params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
            // params.posY=this.y+120;
            // params.bullet = {};
            // params.bullet.sprite="$JeevesSmall"
            // params.bullet.direction=4;
            // params.Xposition=this.xpos;
            // params.wallSize=5;
            // params.movedirection=1;
            // params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            // my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            // var image = {"characterName":"$JeevesSmall","direction":8,"pattern":0,"characterIndex":0};
            // var params = {};
            // params.animated = false;
            // params.frame = 0;
            // params.speed =3;
            // params.hp = 8;
            // params.posX = this.x+100-(50*((this.spawnCounter-1)%(this.spawnNumber)));
            // params.posY=this.y+70;
            // params.bullet = {};
            // params.bullet.sprite="$JeevesSmall"
            // params.bullet.direction=4;
            // params.Xposition=this.xpos;
            // params.wallSize=5;
            // params.movedirection=-1;
            // params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            // my.controller.enemies.push(new my.BHell_Enemy_LBBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        }  
	};
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==180){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.WspawnCounter = 0;
        }
        if(this.frameCounter%3 == 0&&my.player.Timestop==true&&this.frameCounter<450)
        {            
        }
        if(this.frameCounter==290){
            my.player.Timestop=false;
            my.player.immorta
        }
    };
	BHell_Enemy_SuperFanTestimony3_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
    };	
	BHell_Enemy_SuperFanTestimony3_p1.prototype.destroy = function() {
        //adding these to the correct line allow it to transition to a different phase
        //the 3 here is the map number change this to whatever map number u want to transition there on victory
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
        my.player.PhaseOver = true;
        //my.player.nextMap = Number(37);
        my.player.nextMap = Number(52);
    };	
	//main update loop
	BHell_Enemy_SuperFanTestimony3_p1.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
			my.BHell_Sprite.prototype.update.call(this);
            if (my.player.bombed == true&& this.state !== "bombed") {
				my.controller.destroyEnemyBullets(); 
				this.timer = 0; 
				this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
				this.state = "bombed";
			}
			if (this.state !== "dying") {
                this.move();
            }
		switch (this.state) {
			case "started":
				if (this.mover.inPosition === true) {
					this.state = "active";
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
                if(this.frameCounter%3===0){
                    this.updateWall(this.frameCounter); 
                }  
                this.updateEmitters();
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
                break;
			case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                
                if (this.timer > 70) {
                    // Clear screen after count down V.L. 10/20/2020
                    my.controller.generators = [];
                    my.controller.activeGenerators = [];
                    
                    this.destroy();
                }
                else if (this.timer % 10 === 0) {  // Explosion on the line effect 
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
            break; 
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter ++;
        if(this.frameCounter>=450){this.frameCounter=0;}
	}
    return my;
} (BHell || {}));*/