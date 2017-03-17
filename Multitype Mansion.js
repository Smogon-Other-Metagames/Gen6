	{
		ruleset: ['OU'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let item = this.tools.getItem(set.item);
			let template = this.tools.getTemplate(set.species);
			if (item.onPlate) {
				template = Object.assign({}, template);
				if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
				template.learnset = Object.assign({"judgment": ['6T']}, template.learnset);
			}
			return this.validateSet(set, teamHas, template);
		},
		onTakeItem: function (item, pokemon, source) {
			if (item.onPlate) return false;
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			var type = Tools.getItem(pokemon.item).onPlate;
			if (type && (type !== pokemon.types[0] || pokemon.types[1])) {
				pokemon.setType(type);
				this.add('-start', pokemon, 'typechange', type);
			}
		},
	},
