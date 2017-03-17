	{
		ruleset: ['Ubers'],
		banlist: ['Geomancy', 'Baton Pass > 1'],
		validateSet: function (set, teamHas) {
			if (!teamHas.typeTable) {
				let problems = this.validateSet(set, teamHas);
				let template = this.tools.getTemplate(set.species);
				teamHas.typeTable = template.types;
				return problems;
			}
			let problems = new this.constructor('ou').validateSet(set, teamHas);
			if (problems) return problems;
			let template = this.tools.getTemplate(set.species);
			if (!template.types.some(type => teamHas.typeTable.includes(type))) return ["Followers must share a type with the God."];
		},
		onBegin: function () {
			for (let i = 0; i < this.sides.length; i++) {
				this.sides[i].god = this.sides[i].pokemon[0];
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.side.pokemonLeft > 1 && pokemon.side.god === pokemon) {
				this.add('-message', pokemon.name + " has fallen! " + pokemon.side.name + "'s team has been Embargoed!");
			}
		},
		onSwitchIn: function (pokemon) {
			if (pokemon.side.god.hp === 0) {
				pokemon.addVolatile('embargo', pokemon);
				delete pokemon.volatiles['embargo'].duration;
			}
		},
	},
