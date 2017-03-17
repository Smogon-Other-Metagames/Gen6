	{
		ruleset: ['OU'],
		banlist: ['Aerodactyl-Mega', 'Altaria-Mega', 'Diggersby', 'Kyurem-Black', 'Metagross-Mega', 'Porygon-Z', 'Thundurus', "King's Rock", 'Razor Fang'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let excludedMoves = {'acupressure': 1, 'bellydrum': 1, 'chatter': 1, 'dark void': 1, 'geomancy': 1, 'lovelykiss': 1, 'shellsmash': 1, 'shiftgear': 1, 'sketch': 1};
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			let types = {
				'Hoopa': ['Psychic', 'Ghost', 'Dark'],
				'Shaymin': ['Grass', 'Flying'],
			}[template.baseSpecies] || template.types;
			for (let id in this.tools.data.Movedex) {
				if (excludedMoves[id]) continue;
				let move = this.tools.getMove(id);
				if (move.gen < 7 && types.includes(move.type)) template.learnset[id] = ['3T', '4T', '5T', '6T'];
			}
			for (let prevo = template; prevo.prevo; ) {
				prevo = prevo.prevo = Object.assign({}, this.tools.getTemplate(prevo.prevo));
				prevo.learnset = Object.assign({}, prevo.learnset);
				types = prevo.types;
				for (let id in this.tools.data.Movedex) {
					if (excludedMoves[id]) continue;
					let move = this.tools.getMove(id);
					if (move.gen < 7 && types.includes(move.type)) prevo.learnset[id] = ['3T', '4T', '5T', '6T'];
				}
			}
			return this.validateSet(set, teamHas, template);
		},
	},
