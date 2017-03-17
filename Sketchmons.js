	{
		ruleset: ['OU'],
		banlist: ['Diggersby', 'Pinsir-Mega', 'Chatter', 'Shell Smash', "King's Rock", 'Razor Fang'],
		validateSet: function (set, teamHas) {
			if (this.validateSet(set)) {
				for (let move of set.moves) {
					if (this.tools.getMove(move).isZ) continue;
					let template = this.tools.getTemplate(set.species);
					template = Object.assign({}, template);
					if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
					template.learnset = Object.assign({}, template.learnset);
					template.learnset[toId(move)] = ['6T'];
					if (!this.validateSet(set, {}, template)) {
						if (!teamHas.sketches) teamHas.sketches = {};
						if (!teamHas.sketches[move]) teamHas.sketches[move] = 1;
						else ++teamHas.sketches[move];
						return this.validateSet(set, teamHas, template);
					}
				}
			}
			return this.validateSet(set, teamHas);
		},
		onValidateTeam: function (team, format, teamHas) {
			if (teamHas.sketches) {
				let overSketched = Object.keys(teamHas.sketches).filter(move => teamHas.sketches[move] > 1);
				if (overSketched.length) return overSketched.map(move => "You are limited to 1 of " + this.getMove(move).name + " by Sketch Clause. (You have sketched " + this.getMove(move).name + " " + teamHas.sketches[move] + " times.)");
			}
		},
	},
