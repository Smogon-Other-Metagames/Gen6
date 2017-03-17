	{
		ruleset: ['OU'],
		validateSet: function (set, teamHas) {
			let bannedAbilities = {'Levitate': 1, 'Pressure': 1, 'Shadow Tag': 1};
			let ability = this.tools.getAbility(set.ability);
			if (bannedAbilities[ability.name] || !this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			for (let speciesid in this.tools.data.Learnsets) {
				let pokemon = this.tools.data.Pokedex[speciesid];
				if (pokemon.num < 1 || pokemon.num > 720) continue;
				if (!Object.values(pokemon.abilities).includes(set.ability)) continue;
				if (pokemon.unreleasedHidden && set.ability === pokemon.abilities['H']) continue;
				Object.keys(this.tools.data.Learnsets[speciesid].learnset).forEach(move => template.learnset[move] = ['6T']);
			}
			return this.validateSet(set, teamHas, template);
		},
	},
