var BHell = (function (my) {

	/** 
	 * Sample Emitter by V.L.
	 */

	var BHell_Emitter_Sample = my.BHell_Emitter_Sample = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Sample.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Sample.prototype.constructor = BHell_Emitter_Sample;
	
    BHell_Emitter_Sample.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = this.params.sprite;
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		//this.bulletParams.speed = this.params.speed; 
		
		// initialize your own variables 
		this.angle = 0; 
		// or inherit prameters from the enemy class
		 if (params != null) {
            this.angle = params.angle || this.angle;
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Sample.prototype.shoot = function () {
		this.bulletParams.speed = 5; //give the bullet a speed. you can do this in sample.js as well 
		// create bullet by new my.BHell_Bullet(x, y, direction(0 is to the right), this.bulletParams(this includes speed, see sample.js), this.bulletList);
		var bullet = new my.BHell_Bullet(this.x, this.y, this.angle, this.bulletParams, this.bulletList);
		this.parent.addChild(bullet);
		this.bulletList.push(bullet);

		this.angle += Math.PI / 6; // change the angle by 30 degrees every time 
    }; 
	

    return my;
} (BHell || {}));


var BHell = (function (my) {

	/** 
	 * Finisher Enemy Class by V.L.
	 */ 

	var BHell_Enemy_Finisher = my.BHell_Enemy_Finisher = function() {
		this.initialize.apply(this, arguments);
	};

	BHell_Enemy_Finisher.prototype = Object.create(my.BHell_Enemy_Base.prototype);
	BHell_Enemy_Finisher.prototype.constructor = BHell_Enemy_Finisher;

	BHell_Enemy_Finisher.prototype.initialize = function(x, y, image, params, parent, enemyList) {
		
		// start the finisher stage
		my.player.finisher_start = true; 
		
		this.radius = 600;
        this.counterclockwise = false;
		
        params.hp = 10;
        params.speed = 2; // speed of boss moving 
        params.hitbox_w = 100; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false; // if true, you need 3 frames of animation for the boss
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 15; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sample for it to work 
        emitterParams.alwaysAim = true;
		
		this.dir = my.parse(params.dir, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height); 
        this.mover = new my.BHell_Mover_Finisher(this.dir, this.radius, this.counterclockwise); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sample(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    };
	
	BHell_Enemy_Finisher.prototype.destroy = function() {
		
		if (my.player.finisher_count != this.dir) {
			// console.log("wrong! ");
			my.player.finisher_correct = false; 
		} 
		my.player.finisher_count += 1; 
		// console.log(this.dir + 1);
		// console.log(my.player.finisher_count);
		
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
		this.enemyList.splice(this.enemyList.indexOf(this), 1);
	};

	BHell_Enemy_Finisher.prototype.isOutsideMap = function () {
        return false;
    };
	
	BHell_Enemy_Finisher.prototype.die = function() {
		$gameBHellResult.score += this.killScore;
		my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
		this.destroy(); 
	};


    return my;
} (BHell || {}));