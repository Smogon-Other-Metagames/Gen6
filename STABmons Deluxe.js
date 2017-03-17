	{
		ruleset: ['OU'],
		banlist: ["King's Rock", 'Razor Fang'],
		overrides: ['Aegislash', 'Deoxys-Defense', 'Deoxys-Speed', 'Greninja', 'Hoopa-Unbound', 'Landorus', 'Kyurem-White'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let excludedMoves = {'chatter': 1, 'sketch': 1};
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			let types = template.types;
			if (template.species === 'Shaymin') types = ['Grass', 'Flying'];
			if (template.baseSpecies === 'Hoopa') types = ['Psychic', 'Ghost', 'Dark'];
			for (let id in this.tools.data.Movedex) {
				if (excludedMoves[id]) continue;
				let move = this.tools.getMove(id);
				if (types.includes(move.type)) template.learnset[id] = ['3T', '4T', '5T', '6T'];
			}
			for (let prevo = template; prevo.prevo; ) {
				prevo = prevo.prevo = Object.assign({}, this.tools.getTemplate(prevo.prevo));
				prevo.learnset = Object.assign({}, prevo.learnset);
				types = prevo.types;
				for (let id in this.tools.data.Movedex) {
					if (excludedMoves[id]) continue;
					let move = this.tools.getMove(id);
					if (types.includes(move.type)) prevo.learnset[id] = ['3T', '4T', '5T', '6T'];
				}
			}
			return this.validateSet(set, teamHas, template);
		},
	},
