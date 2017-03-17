	{
		ruleset: ['OU'],
		banlist: ['Kyurem-Black', 'Sylveon', 'Belly Drum', 'Dark Void', 'Quiver Dance', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Tail Glow'],
		validateSet: function (set, teamHas) {
			this.validateSet(set);
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = {};
			let gens = new Set();
			gens.add(template.gen);
			for (let prevo = template.prevo; prevo; prevo = prevo.prevo) {
				prevo = this.tools.getTemplate(prevo);
				gens.add(prevo.gen);
			}
			delete template.prevo;
			for (let id in this.tools.data.Movedex) {
				let move = this.tools.getMove(id);
				if (gens.has(move.gen)) template.learnset[id] = ['6T'];
			}
			return this.validateSet(set, teamHas, template);
		},
	},
