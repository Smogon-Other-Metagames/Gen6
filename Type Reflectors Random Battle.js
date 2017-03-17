	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			for (let i = 0; i < this.sides.length; i++) {
				this.sides[i].pokemon[0].isReflector = true;
				this.sides[i].reflectedType = this.sides[i].pokemon[0].types[0];
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			if (pokemon.isReflector) return;
			let type = pokemon.side.reflectedType;
			if (pokemon.types.indexOf(type) > 0 || pokemon.types.length === 1 && pokemon.types[0] === type) return;
			if (pokemon.template.isMega && pokemon.types.join() !== this.getTemplate(pokemon.template.baseSpecies).types.join()) return;
			if (pokemon.types.length > 1 && pokemon.types[0] === type) {
				pokemon.setType(type);
			} else {
				pokemon.setType([pokemon.types[0], type]);
			}
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), null);
		},
		onAfterMega: function (pokemon) {
			if (pokemon.isReflector) return;
			let type = pokemon.side.reflectedType;
			if (pokemon.types.indexOf(type) > 0 || pokemon.types.length === 1 && pokemon.types[0] === type) return;
			if (pokemon.types.join() !== this.getTemplate(pokemon.template.baseSpecies).types.join()) return;
			if (pokemon.types.length > 1 && pokemon.types[0] === type) {
				pokemon.setType(type);
			} else {
				pokemon.setType([pokemon.types[0], type]);
			}
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), null);
		},
	},
