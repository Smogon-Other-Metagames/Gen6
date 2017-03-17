	{
		ruleset: ['OU'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			let baseStats = Object.assign({}, template.baseStats);
			if (~(target.set.ivs.spa | target.set.ivs.spd | target.set.ivs.atk | target.set.ivs.def | target.set.ivs.hp) & 1) {
				baseStats.atk -= 15;
				baseStats.def += 10;
				baseStats.spa -= 15;
				baseStats.spd += 10;
				baseStats.spe += 10;
			} else if (~(target.set.ivs.spa | target.set.ivs.spd) & 1) {
				baseStats.atk += 20;
				baseStats.spa -= 10;
				baseStats.spe -= 10;
			} else if (~target.set.ivs.spa & 1) {
				baseStats.atk -= 10;
				baseStats.spa += 20;
				baseStats.spe -= 10;
			}
			return Object.assign({}, template, {baseStats: baseStats});
		},
		formeChange: function (template, dontRecalculateStats) {
			if (!dontRecalculateStats) {
				template = Object.assign({}, this.battle.getTemplate(template));
				template.baseStats = Object.assign({}, template.baseStats);
				if (~(this.set.ivs.spa | this.set.ivs.spd | this.set.ivs.atk | this.set.ivs.def | this.set.ivs.hp) & 1) {
					template.baseStats.atk -= 15;
					template.baseStats.def += 10;
					template.baseStats.spa -= 15;
					template.baseStats.spd += 10;
					template.baseStats.spe += 10;
				} else if (~(this.set.ivs.spa | this.set.ivs.spd) & 1) {
					template.baseStats.atk += 20;
					template.baseStats.spa -= 10;
					template.baseStats.spe -= 10;
				} else if (~this.set.ivs.spa & 1) {
					template.baseStats.atk -= 10;
					template.baseStats.spa += 20;
					template.baseStats.spe -= 10;
				}
			}
			return this._formeChange.call(this, template, dontRecalculateStats);
		},
		noBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				// XXX can't access prototype?
				pokemon._formeChange = pokemon.formeChange;
				pokemon.formeChange = this.getFormat().formeChange;
				pokemon.formeChange(pokemon.baseTemplate);
			}
		},
	},
