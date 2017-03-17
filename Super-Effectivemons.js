	{
		ruleset: ['OU'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			let types = new Set();
			for (let type in this.tools.data.TypeChart) {
				if (this.tools.getImmunity(type, template) && this.tools.getEffectiveness(type, template) > 0) types.add(type);
			}
			for (let prevo = template.prevo; prevo; prevo = prevo.prevo) {
				prevo = this.tools.getTemplate(prevo);
				for (let type in this.tools.data.TypeChart) {
					if (this.tools.getImmunity(type, prevo) && this.tools.getEffectiveness(type, prevo) > 0) types.add(type);
				}
			}
			for (let id in this.tools.data.Movedex) {
				let move = this.tools.getMove(id);
				if (types.has(move.type)) template.learnset[id] = ['6T'];
			}
			return this.validateSet(set, teamHas, template);
		},
	},
