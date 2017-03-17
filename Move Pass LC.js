	{
		ruleset: ['LC'],
		banlist: ['Fletchling'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			let learnset = {};
			let addLearnsetRecursively = evo => {
				evo = this.tools.getTemplate(evo);
				Object.assign(learnset, evo.learnset);
				evo.evos.forEach(addLearnsetRecursively);
			};
			addLearnsetRecursively(template);
			template.learnset = learnset;
			return this.validateSet(set, teamHas, template);
		},
	},
